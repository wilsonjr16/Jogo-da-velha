export default {

    tabuleiro: ['','','','','','','','',''],
    simbolos: {
                opcoes: ['X','O'],
                index_atual: 0,
                change(){
                    this.index_atual = ( this.index_atual === 0 ? 1:0 );
                }
            },
    perdeu: false,
    venceu: false,
    sequencia_vencedora: [
                        [0,1,2],
                        [3,4,5],
                        [6,7,8],
                        [0,3,6],
                        [1,4,7],
                        [2,5,8],
                        [0,4,8],
                        [2,4,6]
                    ],


    make_play(position) {
        if (this.perdeu || this.tabuleiro[position] !== '') return false;

        const simboloAtual = this.simbolos.opcoes[this.simbolos.index_atual];
        this.tabuleiro[position] = simboloAtual;

        const index = this.check_sequencia_vencedora(simboloAtual);
        if (this.fimdejogo()){
            this.perdedor();
        }
        if (index >= 0) {
            this.ganhador();
        }
        else {
            this.simbolos.change();
        }

        return true;
    },

    check_sequencia_vencedora(simbolo) {
        for (let i in this.sequencia_vencedora) {
            if (this.tabuleiro[ this.sequencia_vencedora[i][0] ] == simbolo  &&
                this.tabuleiro[ this.sequencia_vencedora[i][1] ] == simbolo &&
                this.tabuleiro[ this.sequencia_vencedora[i][2] ] == simbolo) {
                return i;
            }
        }
        return -1;
    },

    perdedor() {
        this.perdeu = true;
    },

    fimdejogo() {
        return !this.tabuleiro.includes('');
    },

    ganhador() {
      this.venceu = true;
    },

    start() {
        this.tabuleiro.fill('');
        this.perdeu = false;
        this.venceu = false;
        this.simbolos.index_atual = 0;   
    },

    restart() {

        if(window.confirm('Tem certeza que deseja reiniciar?')) this.start();
    },
};