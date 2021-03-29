<template>

  <Drawer/>
  <Viewer v-if="quick" :id="id" @closed="close" />

  <main>
    <div ref="grid" id="grid">
      <template v-for="(d, k) in derpis" :key="d.id">
        <Derpi :derpi="d" :id="k" @quick="quickView"></Derpi>
      </template>
    </div>

    <div v-if="loading" id="load">
      <img src="../assets/vectors/puff.svg" alt="">
    </div>
  </main>

  <div id="search">
    <label for="query"><i class="icon-search"></i></label>
    <input type="text" id="query" @keyup="handleKeys" v-model="searchData.query">
    <button @click="search">Go!</button>
  </div>

</template>

<style scoped lang="sass">
$search-h: 40px

main
  margin-bottom: $search-h * 1.5

  #grid
    width: 100%
    display: grid
    grid-template-columns: repeat(auto-fit, minmax(100px, 200px))
    grid-auto-rows: 200px
    gap: 1rem
    padding: 1rem
    align-items: center
    justify-content: center

  #load
    width: 100%

#search
  position: fixed
  bottom: 0
  left: 0
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  height: $search-h
  backdrop-filter: blur(5px)
  background-color: rgba(#000, .1)
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import DerpisSource from '@/state/derpis';
import SearchSource from '@/state/search';
import load from '@/shared/load';
import Derpi from '@/components/Derpi.vue';
import Viewer from '@/views/Viewer.vue';
import Drawer from '@/components/Drawer.vue';
import settings from 'electron-settings';

export default defineComponent({
  name: 'Home',
  components: { Drawer, Viewer, Derpi },
  data() {
    return {
      derpis: DerpisSource.derpis,
      searchData: {
        query: '',
      },

      lastKnownScroll: 0,
      ticking: false,
      loading: false,

      quick: false,
      id: 0,
    };
  },
  methods: {
    async search() {
      SearchSource.query = this.searchData.query;
      DerpisSource.clear();
      await load();
      this.derpis = DerpisSource.derpis;
    },

    async loadMore() {
      this.loading = true;
      SearchSource.page += 1;
      await load();
      this.loading = false;
    },

    quickView(id: number) {
      console.log(id);
      this.id = id;
      this.quick = true;
    },

    close() {
      this.quick = false;
    },

    handleScroll() {
      this.lastKnownScroll = window.scrollY;

      if (!this.loading) {
        window.requestAnimationFrame(() => {
          if (window.innerHeight - (this.$refs.grid as HTMLElement).getBoundingClientRect().bottom > -10) {
            this.loadMore();
          }
        });
      }
    },

    handleKeys(e: KeyboardEvent) {
      if (e.key === 'Enter') this.search();
    },
  },
  async created() {
    await load();
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  mounted() {
    SearchSource.key = settings.getSync('token') as string;
  },
});
</script>
