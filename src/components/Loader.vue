<template>
  <transition name="page" mode="out-in">
    <div v-if="loader().show" class="loader-wrapper">
      <div class="loader-bg"></div>
      <div class="loader"></div>
    </div>
  </transition>
</template>

<script>
  export default {
    methods: {
      loader () {
        return this.$store.getters.loader
      }
    }
  }
</script>

<style scoped>
  .loader-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .loader-bg {
    background-color: black;
    opacity: 0.5;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
    position: absolute;
    top: calc(50% - 60px);
    left: calc(50% - 60px);
    border-top: 10px solid blue;
    border-right: 10px solid green;
    border-bottom: 10px solid red;
    border-left: 10px solid pink;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .page-enter-active {
    animation: fade-in 200ms ease-out forwards;
  }

  .page-leave-active {
    animation: fade-out 200ms ease-out forwards;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
</style>