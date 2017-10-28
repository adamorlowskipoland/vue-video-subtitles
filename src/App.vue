<template>
  <div id="app">
    <video-player :video="video"></video-player>
  </div>
</template>
<script>
  import VideoPlayer from '@/components/video-player';

  export default {
    name: 'app',
    components: {
      VideoPlayer,
    },
    data() {
      return {
        video: {
          src: 'http://r.dcs.redcdn.pl/http/o2/atendesoftware/portal/video/atendesoftware/atendesoftware2.mp4',
          subs: 'http://n-5-8.dcs.redcdn.pl/file/o2/atendesoftware/portal/video/atendesoftware/atendesoftware_2a.txt',
        },
      };
    },
  };
</script>
<style src="./app.scss" lang="scss"></style>
