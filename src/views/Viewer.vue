<template>
  <div class="viewer">{{ derpi.url }}</div>
  <img :src="derpi.url" alt="">
</template>

<script lang=ts>
import { defineComponent } from 'vue';
import DerpisSource, { Derpi } from '@/state/derpis';
import router from '@/router';

export default defineComponent({
  name: 'Viewer',

  props: {
    id: Number,
  },

  data() {
    return {};
  },

  computed: {
    derpi(): Derpi {
      return DerpisSource.getDerpi(this.id ?? 0) ?? new Derpi(0, '');
    },
  },

  methods: {
    handleKey(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') router.push({ name: 'Viewer', params: { id: (this.id ?? 0) - 1 } });
      if (e.key === 'ArrowRight') router.push({ name: 'Viewer', params: { id: (this.id ?? 0) + 1 } });
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
