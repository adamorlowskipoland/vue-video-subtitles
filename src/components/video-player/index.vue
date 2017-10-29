<template>
  <div class="video-player">
    <div class="row text-center">
      <div class="columns small-12">
        <div class="video-player__wrapper">
          <video @timeupdate="setCurrentData"
                 ref="video"
                 class="video-player__video"
                 controls>
            <source :src="video.src"
                    type="video/mp4"/>
          </video>
          <span class="text-center video-player__text">
                {{ currentText }}
          </span>
        </div>
        <pre class="pre">
          {{ subtitles }}
        </pre>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'VideoPlayer',
    props: {
      video: {
        src: String,
        subs: String,
      },
    },
    data() {
      return {
        subtitles: [],
        currentTime: null,
        currentData: {},
        currentText: '',
      };
    },
    created() {
      this.$http.post(this.video.subs)
        .then((data) => {
          this.splitSubtitles(data.bodyText);
        });
    },
    methods: {
      splitSubtitles(subtitles) {
        this.subtitles = subtitles.split('\n');
        this.deleteSubtitlesLastElemIfEmpty();
        this.subtitles = this.subtitles.map(line => line.split(/.\d{3}\s/));
        console.log(this.subtitles);
      },
      deleteSubtitlesLastElemIfEmpty() {
        const subtitlesLastElem = this.subtitles[this.subtitles.length - 1];
        return subtitlesLastElem.length < 1 ? this.subtitles.pop() : false;
      },
      setCurrentData() {
        this.currentTime = event.target.currentTime.toFixed(3);
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
      findCurrentData() {
        return this.subtitles.find((line) => {
          if (this.inBetween(this.currentTime, line)) {
            return line;
          }
          return false;
        });
      },
      inBetween(x, { start, end }) {
        return x >= start && x <= end;
      },
      displayLine() {
        this.currentText = this.currentData ? this.currentData.text : '';
      },
    },
  };
</script>
<style src="./style.scss" lang="scss"></style>
