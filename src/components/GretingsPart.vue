<template>
  <div class="hello">
    <navbar></navbar>
  </div>
</template>

<script>
import navbar from '../components/Navbar'


export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    navbar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


</style>
