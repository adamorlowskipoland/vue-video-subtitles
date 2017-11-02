<template>
  <div id="app">
    <div class="video-player">
      <div class="row">
        <div class="columns small-12">
          <div class="video-player__wrapper">
            <video @timeupdate="setCurrentTime"
                   ref="video"
                   class="video-player__video"
                   controls>
              <source :src="video.src"
                      type="video/mp4"/>
            </video>
            <subtitles :subtitles="subtitles"
                       :time="currentTime"
                       class="text-center video-player__text">
            </subtitles>
          </div>
        </div>
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
        subtitles: Array,
        currentTime: Number,
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
        this.subtitles = this.subtitles.map(subtitle => Object.assign({
          start: this.convertTimeToSeconds(subtitle[0]),
          end: this.convertTimeToSeconds(subtitle[1]),
          text: subtitle[2],
        }));
      },
      convertTimeToSeconds(timeString) {
        const splitedTime = timeString.split(':');
        // eslint-disable-next-line
        return (Number(splitedTime[0]) * 360) + (Number(splitedTime[1]) * 60) + Number(splitedTime[2]);
      },
      setCurrentTime() {
        this.currentTime = event.target.currentTime.toFixed(3);
      },
    },
  };
</script>
<style src="./app.scss" lang="scss"></style>
