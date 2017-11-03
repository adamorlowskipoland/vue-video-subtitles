<template>
    <div class="player__controls">
      <div class="progress">
        <div class="progress__filled"></div>
      </div>
      <button class="player__button toggle"
              title="Toggle Play/Pause">
        ►
      </button>
      <input type="range"
             name="volume"
             class="player__slider"
             min="0" max="1"
             step="0.05"
             value="1"
             title="Volume">
      <button @click="openFullScreen()">[ ]</button>
    </div>
</template>
<script>
  export default {
    methods: {
      openFullScreen() {
        this.$emit('openFullScreen');
      },
    },
  };
</script>
