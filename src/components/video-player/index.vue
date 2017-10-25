<template>
  <div class="video-payer">
    <div class="row align-middle">
      <div class="columns small-12 medium-10 medium-offset-1 large-8 large-offset-2">
        <div>
          <video @timeupdate="showCurrentTime"
                 ref="video"
                 class="video-player__video"
                 src="http://r.dcs.redcdn.pl/http/o2/atendesoftware/portal/video/atendesoftware/atendesoftware2.mp4"
                 type="video/mp4"
                 controls>
          </video>
          <p class="text-center">
            {{ msg }}
          </p>
          <pre>
            {{ Subtitles }}
          </pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Subtitles from '@/data/sub-test.json';

  export default {
    name: 'VideoPlayer',
    data() {
      return {
        msg: 'This is Video Player component',
        Subtitles,
        video: null,
        currentTime: null,
      };
    },
    ready() {
      this.video = this.$refs.video;
    },
    methods: {
      showCurrentTime() {
        this.currentTime = event.target.currentTime;
        console.log(event.target.currentTime);
        console.log(this.Subtitles[0].start);
      },
    },
  };
</script>
<style src="./style.scss" lang="scss"></style>
