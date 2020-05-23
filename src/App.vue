<template>
  <div id="app">
    <navbar />
    <transition
        name="fade"
        mode="out-in"
    >
      <router-view/>
    </transition>
  </div>
</template>

<style lang="scss">

</style>


<script>
import navbar from './components/Navbar'

  export default {
    name: 'App',

    components: {
      navbar
    }
  }
</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.1s;
    transition-property: opacity;
    transition-timing-function: ease;
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
</style>

