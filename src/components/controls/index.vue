<template>
    <div @mouseup="toggleMouseUp"
         class="controls">
      <div ref="controls"
           @click="scrubTime"
           @mousemove="scrubTime"
           @mousedown="toggleMouseDown"
           class="controls__progress">
        <slot></slot>
      </div>
      <button @click="togglePlay()"
              class="player__button toggle">
        {{ playIcon }}
      </button>
      <span>Volume</span>
      <input type="range"
             class="controls__volume"
             min="0" max="1"
             step="0.05"
             value="1"
             @change="updateVolume()"
             @mousemove="updateVolume()">
      <button @click="openFullScreen()">[ Full ]</button>
    </div>
</template>
<script>
  /* eslint-disable semi */

  export default {
    props: {
      playIcon: String,
    },
    data() {
      return {
        mouseDown: false,
      };
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
      scrubTime() {
        const controlsWidth = this.$refs.controls.offsetWidth;
        if (event.type === 'mousemove') {
          if (this.mouseDown) {
            this.$emit('scrubTime', controlsWidth);
          }
        } else {
          this.$emit('scrubTime', controlsWidth);
        }
      },
      toggleMouseDown() {
        this.mouseDown = true;
      },
      toggleMouseUp() {
        this.mouseDown = false;
      },
    },
  };
</script>
<style src="./style.scss" lang="scss"></style>
