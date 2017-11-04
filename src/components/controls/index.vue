<template>
    <div class="controls">
      <div class="controls__progress">
        <slot></slot>
      </div>
      <button @click="togglePlay()"
              class="player__button toggle">
        {{ playIcon }}
      </button>
      <input type="range"
             class="controls__volume"
             min="0" max="1"
             step="0.05"
             value="1"
             @change="updateVolume()"
             @mousemove="updateVolume()">
      <button @click="openFullScreen()">[ ]</button>
    </div>
</template>
<script>
  export default {
    props: {
      playIcon: String,
    },
    methods: {
      openFullScreen() {
        this.$emit('openFullScreen');
      },
      togglePlay() {
        this.$emit('togglePlay');
      },
      updateVolume() {
        this.$emit('updateVolume');
      },
    },
  };
</script>
<style src="./style.scss" lang="scss"></style>
