<template>
  <div id="container">
    <transition name="page" mode="out-in">
      <router-view></router-view>
    </transition>
    <Loader></Loader>
  </div>
</template>

<script>
  import Loader from './components/Loader.vue'
  import { APP_START } from './store/constants'

  export default {
    created () {
      this.$store.dispatch(APP_START)
    },
    components: {
      Loader
    }
  }
</script>

<style scoped>
  body {
    padding: 30px;
  }

  .page-enter-active {
    animation: slide-in 200ms ease-out forwards;
  }

  .page-leave-active {
    animation: slide-out 200ms ease-out forwards;
  }

  @keyframes slide-in {
    from {
      transform: translateY(-30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slide-out {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(-30px);
      opacity: 0;
    }
  }
</style>
