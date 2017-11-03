<template>
  <div id="app">
    <div class="player">
      <div ref="player"
           class="player__wrapper">
        <video ref="video"
               @timeupdate="setCurrentTime"
               class="player__video" controls>
          <source :src="video.src"
                  type="video/mp4"/>
        </video>
        <controls @openFullScreen="openFullScreen()"></controls>
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
        this.subtitles = this.subtitles.map(subtitle => Object({
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
