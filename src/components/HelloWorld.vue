<template>
  <div class="hello">
    <div class="row text-center">
      <div class="columns small-6">
        <div>
          <p>
            start
          </p>
        </div>
      </div>
      <div class="columns small-6">
        <div>
          <p>
            end
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>

<style lang="scss">
  div {
    /*background: lightskyblue;*/
    p {
      background: lightskyblue;
      color: tomato;
    }
  }
</style>
