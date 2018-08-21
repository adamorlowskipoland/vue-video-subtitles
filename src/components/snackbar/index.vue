<template>
  <transition name="bounce">
    <div v-if="show"
         class="snackbar">
      {{ msg }}
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      msg: {
        type: String,
        default: '',
      },
      duration: {
        type: Number,
        default: 8000,
      },
      show: {
        type: Boolean,
        default: false,
      },
    },
    watch: {
      show() {
        this.closeSnachbar();
      },
    },
    methods: {
      closeSnachbar() {
        setTimeout(() => {
          this.$emit('closeSnackbar');
        }, this.duration);
      },
    },
  };
</script>

<style lang="scss">
  .snackbar {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(20, 20, 20, 0.8);
    padding: 15px 30px;
    border-radius: 3px;
    box-shadow: 0 3px 20px rgba(0, 0, 0, 0.4);
    font-size: 18px;
    color: #ff2800;
  }
</style>
