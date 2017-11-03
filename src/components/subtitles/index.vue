<template>
  <div class="subtitles">
    {{ currentText }}
  </div>
</template>
<script>
  export default {
    props: {
      subtitles: {
        type: Array,
      },
      time: {
        type: Number,
      },
    },
    computed: {
      givenSubtitles() {
        return this.subtitles;
      },
      currentData() {
        return this.findCurrentData()[0];
      },
      givenTime() {
        return this.time;
      },
      currentText() {
        return this.currentData ? this.currentData.text : '';
      },
    },
    methods: {
      findCurrentData() {
        return this.givenSubtitles.filter((line) => {
          if (this.inBetween(this.givenTime, line)) {
            return line;
          }
          return false;
        });
      },
      inBetween(time, { start, end }) {
        return time >= start && time <= end;
      },
    },
  };
</script>
