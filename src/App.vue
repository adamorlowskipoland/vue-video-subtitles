<template>
  <div id="app">
    <div class="player">
      <div ref="player"
           class="player__wrapper">
        <video ref="video"
               @timeupdate="handleProgress"
               @pause="updatePlayBtn"
               @play="updatePlayBtn"
               class="player__video">
          <source :src="video.src"
                  type="video/mp4"/>
        </video>
        <controls @openFullScreen="openFullScreen"
                  @togglePlay="togglePlay"
                  @updateVolume="updateVolume"
                  @scrubTime="scrubTime"
                  :playIcon="playIcon"
                  class="player__controls">
          <div ref="progressBar"
               class="controls__progress--filled"></div>
        </controls>
        <subtitles :subtitles="subtitles"
                   :time="currentTime"
                   class="player__text">
        </subtitles>
      </div>
    </div>
  </div>
</template>
<script>
  import Controls from '@/components/controls';
  import Subtitles from '@/components/subtitles';

  export default {
    components: {
      Controls,
      Subtitles,
    },
    data() {
      return {
        video: {
          src: 'http://r.dcs.redcdn.pl/http/o2/atendesoftware/portal/video/atendesoftware/atendesoftware2.mp4',
          subs: 'http://n-5-8.dcs.redcdn.pl/file/o2/atendesoftware/portal/video/atendesoftware/atendesoftware_2a.txt',
        },
        subtitles: [],
        currentTime: 0,
        playIcon: '►',
      };
    },
    created() {
      this.$http.get(this.video.subs)
        .then((data) => {
          this.splitSubtitles(data.bodyText);
        });
    },
    methods: {
      openFullScreen() {
        // eslint-disable-next-line
        if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
          this.exitFullscreen();
        } else {
          this.launchIntoFullscreen(this.$refs.player);
        }
      },
      togglePlay() {
        const method = this.$refs.video.paused ? 'play' : 'pause';
        this.$refs.video[method]();
      },
      updatePlayBtn() {
        this.playIcon = this.$refs.video.paused ? '►' : '||';
      },
      updateVolume(val) {
        this.$refs.video.volume = val;
      },
      handleProgress(event) {
        const percent = (this.$refs.video.currentTime / this.$refs.video.duration) * 100;
        this.$refs.progressBar.style.flexBasis = `${percent}%`;
        this.setCurrentTime(event);
      },
      scrubTime(clickedPlace) {
        const scrubTime = clickedPlace * this.$refs.video.duration;
        this.$refs.video.currentTime = scrubTime;
      },
      launchIntoFullscreen(element) {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
        }
      },
      exitFullscreen() {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      },
      splitSubtitles(subtitles) {
        this.subtitles = subtitles.split('\n');
        this.deleteSubtitlesLastElemIfEmpty();
        this.separateTimesFromTextInSubtitles();
        this.setSubtitlesIntoObjects();
      },
      deleteSubtitlesLastElemIfEmpty() {
        const subtitlesLastElem = this.subtitles[this.subtitles.length - 1];
        return subtitlesLastElem.length < 1 ? this.subtitles.pop() : false;
      },
      separateTimesFromTextInSubtitles() {
        this.subtitles = this.subtitles.map(line => line.split(/\.\d{3}\s/));
      },
      setSubtitlesIntoObjects() {
        this.subtitles = this.subtitles.map(subtitle => ({
          start: this.convertTimeToSeconds(subtitle[0]),
          end: this.convertTimeToSeconds(subtitle[1]),
          text: subtitle[2],
        }));
      },
      convertTimeToSeconds(timeString) {
        const splitedTime = timeString.split(':');
        // eslint-disable-next-line
        return (parseInt(splitedTime[0], 10) * 360) + (parseInt(splitedTime[1], 10) * 60) + parseInt(splitedTime[2], 10);
      },
      setCurrentTime(event) {
        this.currentTime = Number(event.target.currentTime.toFixed(3));
      },
    },
  };
</script>
<style src="./app.scss" lang="scss"></style>
