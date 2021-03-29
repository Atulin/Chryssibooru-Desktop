<template>
  <div class="viewer">{{ derpi.name }}</div>
  <img :src="derpi.representations.full" alt="">
</template>

<script lang=ts>
import { defineComponent } from 'vue';
import DerpisSource from '@/state/derpis';
import router from '@/router';
import { DerpiImage } from '@/types/derpi-types';
import load from '@/shared/load';
import SearchSource from '@/state/search';

export default defineComponent({
  name: 'Viewer',

  props: {
    id: Number,
  },

  data() {
    return {};
  },

  computed: {
    derpi(): DerpiImage {
      return DerpisSource.getDerpi(this.id ?? 0);
    },
  },

  methods: {
    handleKey(e: KeyboardEvent) {
      switch (e.key) {
        case 'ArrowLeft':
          this.changeImage((this.id ?? 0) - 1);
          break;
        case 'ArrowRight':
          this.changeImage((this.id ?? 0) + 1);
          break;
        default:
          break;
      }
    },

    changeImage(idx: number): void {
      if (DerpisSource.derpis.size - idx <= 5) {
        console.log('Loading more...');
        SearchSource.page += 1;
        load();
      }
      router.push({ name: 'Viewer', params: { id: idx } });
    },
  },

  created() {
    document.addEventListener('keyup', this.handleKey);
  },

  beforeUnmount() {
    document.removeEventListener('keyup', this.handleKey);
  },
});
</script>

<style scoped>

</style>
