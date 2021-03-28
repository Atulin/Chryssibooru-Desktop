<template>
  <div class="viewer">{{ derpi.url }}</div>
  <img :src="derpi.url" alt="">
</template>

<script lang=ts>
import { defineComponent } from 'vue';
import DerpisSource, { Derpi } from '@/state/derpis';

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
});
</script>

<style scoped>

</style>
