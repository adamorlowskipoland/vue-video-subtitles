<template>
  <div class="subtitles">
    <div class="subtitles__wrapper">
          <span class="text-center subtitles__text">
                {{ currentText }}
          </span>
    </div>
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
    data() {
      return {
        givenSubtitles: Array,
        currentData: Object,
        currentText: 'wyświetla',
      };
    },
    mounted() {
      this.givenSubtitles = this.subtitles;
      if (this.currentData) {
        if (!this.inBetween(this.currentTime, this.currentData)) {
          this.currentData = this.findCurrentData();
          this.displayLine();
        }
      } else {
        this.currentData = this.findCurrentData();
        this.displayLine();
      }
    },
    methods: {
      findCurrentData() {
        console.log(this.givenSubtitles);
        return this.givenSubtitles.find((line) => {
          if (this.inBetween(this.time, line)) {
            return line;
          }
          return false;
        });
      },
      inBetween(time, { start, end }) {
        return time >= start && time <= end;
      },
      displayLine() {
        this.currentText = this.currentData ? this.currentData.text : '';
      },
    },
  };
</script>
<style src="./style.scss" lang="scss"></style>
