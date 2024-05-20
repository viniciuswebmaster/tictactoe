import Score from './score.js';
import Board from './board.js';
import Message from './message.js';
import PlayAgain from './playAgain.js';

export default {
  template: `
    <div class="game">
      <Score :player1="scores.O" :player2="scores.X" />
      <Board :tiles="tiles" @make-move="handleMove" />
      <Message :text="message" />
      <PlayAgain v-if="gameOver" @play-again="resetGame" />
    </div>
  `,
  components: {
    Score,
    Board,
    Message,
    PlayAgain,
  },
  data() {
    return {
      tiles: Array(9).fill(null),
      currentPlayer: Math.random() < 0.5 ? 'O' : 'X',
      scores: { O: 0, X: 0 },
      message: '',
      gameOver: false,
    };
  },
  methods: {
    handleMove(index) {
      if (this.tiles[index] !== null || this.gameOver) return;
      this.tiles[index] = this.currentPlayer; // Atualizar diretamente o array
      if (this.checkWin()) {
        this.message = `Player ${this.currentPlayer} wins!`;
        this.scores[this.currentPlayer]++;
        this.gameOver = true;
      } else if (this.tiles.every(tile => tile !== null)) {
        this.message = "It’s a draw";
        this.gameOver = true;
      } else {
        this.currentPlayer = this.currentPlayer === 'O' ? 'X' : 'O';
        this.message = `It’s player ${this.currentPlayer}'s turn`;
      }
    },
    checkWin() {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6],           // Diagonals
      ];
      return winPatterns.some(pattern =>
        pattern.every(index => this.tiles[index] === this.currentPlayer)
      );
    },
    resetGame() {
      this.tiles = Array(9).fill(null);
      this.currentPlayer = Math.random() < 0.5 ? 'O' : 'X';
      this.message = `It’s player ${this.currentPlayer}'s turn`;
      this.gameOver = false;
    },
  },
  created() {
    this.message = `It’s player ${this.currentPlayer}'s turn`;
  },
};