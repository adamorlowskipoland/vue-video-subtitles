<template>
  <div class="video-player">
    <div class="row text-center">
      <div class="columns small-12">
        <div class="video-player__wrapper">
          <video @timeupdate="setCurrentData"
                 ref="video"
                 class="video-player__video"
                 controls>
            <source src="http://r.dcs.redcdn.pl/http/o2/atendesoftware/portal/video/atendesoftware/atendesoftware2.mp4"
                    type="video/mp4"/>
          </video>
          <span class="text-center video-player__text">
                {{ currentText }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  //  import Subtitles from '@/data/sub-test.json';
  export default {
    name: 'VideoPlayer',
    data() {
      return {
        subtitles: [],
        currentTime: null,
        currentData: {},
        currentText: '',
      };
    },
    created() {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://n-5-8.dcs.redcdn.pl/file/o2/atendesoftware/portal/video/atendesoftware/atendesoftware_2a.txt');
      xhr.onload = function () {
        this.subtitles = this.responseText;
      };
      xhr.send();
    },
    methods: {
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
//        this.currentText = this.currentData ? this.currentData.text : '';
      },
    },
  };
</script>
<style src="./style.scss" lang="scss"></style>
