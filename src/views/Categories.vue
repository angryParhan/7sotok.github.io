<template>
  <section class="container categories">
    <div
        v-for="(item, i) in categoriesItems"
        :key="i"
        class="categories__items"
        :style="{ backgroundImage: `url(${item.img})` }"
    >
      <h2>{{ item.title }}</h2>
    </div>
  </section>
</template>

<script>
  export default {
    name: "Categories",
    data () {
      return {

      }
    },
    computed: {
      categoriesItems () {
        return this.$store.getters.getCategories
      }
    },
    mounted () {
      console.log('cat', this.categoriesItems)
    }

  }
</script>

<style scoped lang="scss">

@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital@0;1&display=swap');



  .container {
    max-width: 1270px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .categories {
    padding-top: 50px;
    display: grid;
    grid-template-columns: repeat(4, 280px);
    grid-gap: 20px;
    font-family: 'IBM Plex Sans', sans-serif;

    &__items {
      height: 280px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
      background-repeat: no-repeat;

      &:before {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.65);
        position: absolute;
      }

      &:hover:before {
        background-color: transparent !important;
        transition: background-color 0.3s ease-in-out;

      }

      &:hover h2 {
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
      }

      h2 {
        color: white;
        position: relative;
        z-index: 1;
        font-weight: bold;
        font-size: 25px;
      }


    }
  }

  @media all and (max-width: 1200px) {
    .categories {
      grid-template-columns: repeat(3, 280px);
      justify-content: center;

    }
  }

  @media all and (max-width: 880px) {
    .categories {
      grid-template-columns: repeat(2, 280px);
      justify-content: center;

    }
  }

  @media all and (max-width: 599px) {
    .categories {
      grid-template-columns: repeat(1, 280px);
      justify-content: center;

    }
  }

</style>
