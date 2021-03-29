<template>
  <div id="viewer">
    <nav class="head">
      <span class="num">{{ mutId + 1 }}/{{ size }}</span>
      <button class="close" @click="close">X</button>
    </nav>

    <Multimedia class="media" :derpi="derpi"/>
  </div>
</template>

<script lang=ts>
import { defineComponent } from 'vue';
import DerpisSource from '@/state/derpis';
import { DerpiImage } from '@/types/derpi-types';
import load from '@/shared/load';
import SearchSource from '@/state/search';
import { clamp } from '@/helpers';
import Multimedia from '@/components/Multimedia.vue';

export default defineComponent({
  name: 'Viewer',
  components: { Multimedia },
  props: {
    id: Number,
  },

  data() {
    return {
      mutId: this.id,
    };
  },

  computed: {
    derpi(): DerpiImage {
      return DerpisSource.getDerpi(this.mutId ?? 0);
    },
    size(): number {
      return DerpisSource.derpis.size;
    },
  },

  methods: {
    async handleKey(e: KeyboardEvent): Promise<boolean> {
      switch (e.key) {
        case 'ArrowLeft':
          await this.changeImage((this.mutId ?? 0) - 1);
          break;
        case 'ArrowRight':
          await this.changeImage((this.mutId ?? 0) + 1);
          break;
        default:
          e.preventDefault();
          return false;
      }
      return true;
    },

    async changeImage(idx: number): Promise<void> {
      const id = clamp(idx, 0, DerpisSource.derpis.size);

      if (DerpisSource.derpis.size - id <= 5) {
        console.log('Loading more...');
        SearchSource.page += 1;
        await load();
      }
      this.mutId = id;
    },

    close() {
      this.$emit('closed');
    },
  },

  created() {
    document.addEventListener('keydown', this.handleKey, false);
  },

  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKey, false);
  },
});
</script>

<style scoped lang="scss">
#viewer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: grid;
  grid-template:
    "head head head " 1fr
    "left img  right" 90%
    "left bottom  right" 1fr / 1fr 90% 1fr;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  background-color: rgba(#000, .75);

  .head {
    grid-area: head;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    padding: 1rem;
  }

  .media {
    grid-area: img;
  }
}
</style>
