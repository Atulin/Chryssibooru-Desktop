<template>
  <div class="home">
    <button @click="load">Load</button>
    <div v-for="(d, k) in derpis" :key="d.id">
      <span>{{ d.url }} : {{d.id}}</span>
      <router-link :to="{ name: 'Viewer', params: { id: k } }">View</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DerpisSource, { Derpi } from '@/state/derpis';
import axios from 'axios';

export default defineComponent({
  name: 'Home',
  data() {
    return {
      derpis: DerpisSource.derpis,
    };
  },
  methods: {

    load() {
      axios.get('https://derpibooru.org/api/v1/json/search/images?q=safe')
        .then((res) => {
          // eslint-disable-next-line max-len
          DerpisSource.derpis.push(...res.data.images.map((img: any) => new Derpi(Number(img.id), img.representations.full)));
        })
        .catch(console.error);
    },
  },
});
</script>
