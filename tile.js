export default {
  props: ['marker', 'index'],
  template: `
    <button class="tile" @click="$emit('make-move', index)">
      {{ marker }}
    </button>
  `,
}