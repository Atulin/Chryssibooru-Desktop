<template>
  <div id="drawer" :class="{ open: open }">
    <button id="close" @click="open = !open"><i class="icon-bars"></i></button>

    <label>
      Token
      <input type="password" v-model="token" @input="saveToken">
    </label>

    <label>
      Booru
      <select v-model="base" @change="saveBase">
        <option value="https://derpibooru.org">Derpibooru</option>
        <option value="https://ponybooru.org/">Ponybooru</option>
      </select>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import settings from 'electron-settings';
import SearchSource from '@/state/search';

export default defineComponent({
  name: 'Drawer',
  data() {
    return {
      open: false,
      token: SearchSource.key,
      base: SearchSource.baseUrl,
    };
  },
  methods: {
    saveToken() {
      settings.setSync('token', this.token);
      SearchSource.key = this.token;
    },
    saveBase() {
      settings.setSync('base', this.base);
      SearchSource.baseUrl = this.base;
    },
  },
});
</script>

<style scoped lang="scss">
$width: 20rem;

#drawer {
  position: fixed;
  left: -$width;
  top: 0;
  display: flex;
  flex-direction: column;
  width: $width;
  height: 100%;
  z-index: 1000;
  background-color: var(--background-75);
  box-shadow: 0 0 1rem 0 black;
  backdrop-filter: blur(5px);
  transition: left 100ms ease-in-out;
  &.open {
    left: 0;
  }

  #close {
    position: absolute;
    left: 100%;
    padding: .25rem;
    border: none;
    color: var(--foreground);
    font-size: 2rem;
    background-color: var(--background-75);
    box-shadow: 0 0 1rem 0 black;
    backdrop-filter: blur(5px);
    cursor: pointer;
    &:focus {
      outline: none;
    }
  }

}
</style>
