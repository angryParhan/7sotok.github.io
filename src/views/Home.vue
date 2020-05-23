<template>
  <div class="home">
    <gretings-part msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import GretingsPart from '@/components/HomePage.vue'

export default {
  name: 'Home',
  components: {
    GretingsPart
  }
}
</script>
