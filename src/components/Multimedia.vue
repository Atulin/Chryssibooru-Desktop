<template>
    <div v-if="derpi.processed" class="media">

      <img v-if="derpi.mime_type.includes('image')"
           :src="derpi.representations.large"
           :alt="derpi.name">

      <div class="video" v-if="derpi.mime_type.includes('video')">

        <video ref="video"
               :src="derpi.representations.large"
               :autoplay="autoplay"
               @timeupdate="progress" @ended="ended" @click="playPause"></video>

        <div class="controls">
          <button class="play" @click="playPause">
            <i :class="autoplay ? 'icon-pause' : 'icon-play'"></i>
          </button>
          <label class="volume">
            <button @click="mute"><i :class="volumeIcon"></i></button>
            <input ref="volume" type="range" min="0" max="1" step="0.01" @input="setVolume" @change="saveVolume">
          </label>
          <label class="seek">
            <input ref="seekbar" type="range" min="0" max="1" step="0.01" @input="seek">
          </label>
        </div>

      </div>
    </div>
    <div class="media text" v-else>Not processed yet</div>
</template>

<style scoped lang="scss">
.media {
  width: 100%;
  height: 100%;
  object-fit: contain;

  &.text {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img, .video {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 0 1rem black);
  }

  .video {

    video {
      width: 100%;
      height: 100%;
      flex: 1;
      object-fit: contain;
    }

    .controls {
      position: absolute;
      bottom: 0;
      left: 0;
      padding: .5rem;
      z-index: 9999;
      width: 100%;
      display: grid;
      gap: .5rem;
      grid-template:
        "play middle volume" auto
        "play bottom bottom" auto / auto 1fr auto;
      backdrop-filter: blur(5px);
      background-color: rgba(#000, .5);
      opacity: 0;
      transition: opacity 100ms ease-in-out;
      &:hover {
        opacity: 1;
      }

      .play {
        grid-area: play;
        height: 3rem;
        width: 3rem;
        border-radius: 1.5rem;
        border: 1px solid var(--accent-25);
        color: var(--accent-50);
        background-color: var(--background);
        cursor: pointer;

        &:hover {
          border-color: var(--accent-50);
          color: var(--accent);
        }
      }
      .volume {
        grid-area: volume;
        button {
          width: 2rem;
          border: none;
          background-color: transparent;
          color: var(--accent-50);
          cursor: pointer;
          &:hover {
            color: var(--accent);
          }
        }
        input {
          height: 3px;
        }
      }
      .seek {
        grid-area: bottom;
        width: 100%;
        input {
          width: 100%;
          height: 3px;
        }
      }
    }
  }
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { DerpiImage } from '@/types/derpi-types';
import settings from 'electron-settings';

export default defineComponent({
  name: 'Multimedia',
  props: {
    derpi: {
      type: Object as () => DerpiImage,
      value: null,
      required: true,
    },
    id: Number,
  },
  data() {
    return {
      autoplay: true,
      volume: 0.5,
      oldVolume: 0,
    };
  },
  computed: {
    volumeIcon() {
      if (this.volume <= 0) return 'icon-volume-mute2';
      if (this.volume <= 0.25) return 'icon-volume-mute';
      if (this.volume <= 0.50) return 'icon-volume-low';
      if (this.volume <= 0.75) return 'icon-volume-medium';
      return 'icon-volume-high';
    },
  },
  methods: {
    setVolume(e: Event) {
      const { value } = e.target as HTMLInputElement;
      this.volume = Number(value);
      (this.$refs.video as HTMLVideoElement).volume = Number(value);
    },
    saveVolume(e: Event) {
      const { value } = e.target as HTMLInputElement;
      settings.setSync('volume', Number(value));
    },
    mute() {
      if (this.volume === 0) {
        this.volume = this.oldVolume;
      } else {
        this.oldVolume = this.volume;
        this.volume = 0;
      }
      (this.$refs.video as HTMLVideoElement).volume = this.volume;
      (this.$refs.volume as HTMLInputElement).value = (this.volume).toString();
    },
    playPause() {
      const target = this.$refs.video as HTMLVideoElement;
      if (target.paused) {
        this.autoplay = true;
        target.play();
      } else {
        this.autoplay = false;
        target.pause();
      }
      settings.setSync('autoplay', this.autoplay);
    },
    ended() {
      this.autoplay = false;
    },
    seek(e: Event) {
      const { value } = e.target as HTMLInputElement;
      const video = this.$refs.video as HTMLVideoElement;
      video.currentTime = video.duration * Number(value);
    },
    progress(e: Event) {
      const video = e.target as HTMLVideoElement;
      (this.$refs.seekbar as HTMLInputElement).value = (video.currentTime / video.duration).toString();
    },
  },
  mounted() {
    if (this.$refs.video) {
      const volume = Number(settings.getSync('volume') ?? '0.5');
      (this.$refs.video as HTMLVideoElement).volume = volume;
      (this.$refs.volume as HTMLInputElement).value = volume.toString();
      this.volume = volume;

      this.autoplay = Boolean(settings.getSync('autoplay')) ?? true;
    }
  },
});
</script>
