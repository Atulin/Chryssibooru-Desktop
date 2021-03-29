<template>
  <router-link :to="{ name: 'Viewer', params: { id: id } }">
    <img v-if="derpi.processed" :src="thumb" :alt="derpi.name">
    <div v-else>Not processed yet</div>
    <Score :up="derpi.upvotes" :down="derpi.downvotes" :score="derpi.score" :faves="derpi.faves" />
  </router-link>
</template>

<style scoped lang="sass">
a
  position: relative
  width: 100%
  height: 100%
  box-shadow: 0 1px 5px 0 black
  transform: scale(1)
  transition: transform 100ms ease-in-out
  color: var(--foreground)
  &:hover
    transform: scale(1.1)

    .score
      opacity: 1

  img
    width: 100%
    height: 100%
    object-fit: cover
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { DerpiImage } from '@/types/derpi-types';
import Score from '@/components/Score.vue';

export default defineComponent({
  name: 'Derpi',
  components: { Score },
  props: {
    derpi: {
      type: Object as () => DerpiImage,
      value: null,
      required: true,
    },
    id: Number,
  },
  computed: {
    thumb(): string {
      return this.derpi.mime_type.includes('video')
        ? `${this.derpi.representations.thumb.split('.').slice(0, -1).join('.')}.gif`
        : this.derpi.representations.thumb;
    },
  },
});
</script>
