import React, { Component } from 'react';
import { Dimensions, Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import velha from './velha';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabuleiro: velha.tabuleiro,
      perdeu: velha.perdeu,
      venceu: velha.venceu,
    }
  }

  componentDidMount() {
    velha.start();
  }

  makePlay(index) {
    velha.make_play(index);

    this.setState({
      tabuleiro: velha.tabuleiro,
      perdeu: velha.perdeu,
      venceu: velha.venceu,
    });
  }

  restart() {
    velha.start();
    this.setState({
      tabuleiro: velha.tabuleiro,
      perdeu: velha.perdeu,
      venceu: velha.venceu,
    });
  }
  

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.name}>Jogo da Velha</Text>
        <View style={styles.containerTable}>
          {
            this.state.tabuleiro.map((value, id) => {
              return (
                <TouchableOpacity 
                  key={id} 
                  style={styles.piece}
                  onPress={() => this.makePlay(id)}
                >
                  <Text style={styles.pieceText}>{value}</Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
        {
            this.state.venceu && (
              <Text style={styles.over}>{velha.simbolos.opcoes[velha.simbolos.index_atual]} ganhou</Text>
            )
        }
        {
          (this.state.perdeu || this.state.venceu) && (

            <View styles={styles.btn}>
              <TouchableOpacity 
                style={{width: 120, height: 50, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center',alignSelf: 'center',}}
                onPress={() => this.restart()}
              >
                <Text style={{color: '#fff', fontSize: 20,}}>Reiniciar</Text>
              </TouchableOpacity>
            </View>
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  name: {
    fontSize: 35,
    marginTop: 40,
    marginBottom: 20,
    alignSelf: 'center'
  },

  containerTable: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    borderWidth: 1,
    width: Dimensions.get('window').width/1.1,
  },

  piece: {
    width: Dimensions.get('window').width/3.323,
    height: Dimensions.get('window').width/3.33,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },

  pieceText: {
    fontSize: 50,
    color: 'red',
  },

  over: {
    fontSize: 25,
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 15,
    alignSelf: 'center',
  },

  btn: {
    flexDirection: 'row',
    justifyContent: 'center', 
    marginTop: 20,
  },
});