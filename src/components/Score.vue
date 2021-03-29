<template>
  <div class="score">

    <span class="up">
      <i class="icon-arrow-up"></i>{{ up }}
    </span>

    <span class="total">
      {{ score }}
    </span>

    <span class="down">
      {{ down }}<i class="icon-arrow-down"></i>
    </span>

    <span class="fave">
      {{ faves }}<i class="icon-star"></i>
    </span>

  </div>
</template>

<style scoped lang="sass">
$margin: .25rem
$shadow: rgba(#000, .25)

.score
  position: absolute
  bottom: 0
  left: 0
  width: 100%
  padding: .25rem
  display: grid
  grid-template-columns: repeat(4, 1fr)
  justify-content: space-around
  align-items: center
  backdrop-filter: blur(3px)
  background-color: rgba(#000, .6)
  opacity: 0
  transition: opacity 100ms ease-in-out

  >span
    font-size: 14px
    text-shadow: -1px -1px 0 $shadow, 1px -1px 0 $shadow, -1px 1px 0 $shadow, 1px 1px 0 $shadow
    i
      font-size: 10px

  .up
    color: #0bcd0b
    i
      margin-right: $margin
  .total
    color: white
  .down
    color: #ff3636
    i
      margin-left: $margin
  .fave
    color: #e7c508
    i
      margin-left: $margin
</style>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Score',
  props: {
    up: Number,
    down: Number,
    score: Number,
    faves: Number,
  },
});
</script>
