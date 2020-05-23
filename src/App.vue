<template>
  <div id="app">
    <navbar />
    <router-view/>
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

