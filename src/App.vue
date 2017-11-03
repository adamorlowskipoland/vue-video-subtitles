<template>
  <div id="app">
    <div class="video-player">
      <div class="video-player__wrapper">
        <video @timeupdate="setCurrentTime"
               controls>
          <source :src="video.src"
                  type="video/mp4"/>
        </video>
        <subtitles :subtitles="subtitles"
                   :time="currentTime"
                   class="video-player__text">
        </subtitles>
      </div>
    </div>
  </div>
</template>
<script>
  import Subtitles from '@/components/subtitles';

  export default {
    components: {
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
