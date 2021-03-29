<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
</template>

<style lang="scss">
*, *:before, *:after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

:root {
  --background: #242424;
  --foreground: #d9ded6;
  --accent: #00ff66;
  --accent-50: #{rgba(#00ff66, .5)};
  --accent-25: #{rgba(#00ff66, .25)};
}

html, body {
  background-color: var(--background);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: var(--background);
  color: var(--foreground);
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

@font-face {
  font-family: 'icomoon';
  src: url('./assets/fonts/icomoon.woff?fp30oh') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

[class^="icon-"], [class*=" icon-"] {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: 'icomoon' !important;
  speak: never;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-pause:before {
  content: "\e906";
}
.icon-play:before {
  content: "\e907";
}
.icon-search:before {
  content: "\e900";
}
.icon-bars:before {
  content: "\e901";
}
.icon-navicon:before {
  content: "\e901";
}
.icon-reorder:before {
  content: "\e901";
}
.icon-filter:before {
  content: "\e902";
}
.icon-star:before {
  content: "\e903";
}
.icon-arrow-down:before {
  content: "\e904";
}
.icon-arrow-up:before {
  content: "\e905";
}
.icon-volume-high:before {
  content: "\ea26";
}
.icon-volume-medium:before {
  content: "\ea27";
}
.icon-volume-low:before {
  content: "\ea28";
}
.icon-volume-mute:before {
  content: "\ea29";
}
.icon-volume-mute2:before {
  content: "\ea2a";
}
</style>
