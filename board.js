import Tile from './tile.js';

export default {
  props: ['tiles'],
  template: `
    <div class="board">
      <Tile v-for="(tile, index) in tiles" :key="index" :marker="tile" :index="index" @make-move="makeMove(index)" />
    </div>
  `,
  components: {
    Tile,
  },
  methods: {
    makeMove(index) {
      this.$emit('make-move', index);
    },
  }
}