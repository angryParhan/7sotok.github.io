<template>
  <section>
    <div class="goods-block container">
      <div class="goods-block__seeds-wrapper">
        <div
            class="goods-block__item-card"
            v-for="(item, i) in shopItems"
            :key="i"

        >
          <p class="title">id: {{ item.id }}</p>
          <p>{{ item.title }}</p>
          <p>{{ item.description }}</p>
          <p>Price: {{ item.price }}</p>
          <button>Детальніше</button>
          <button @click="buyAction(item)">Купити</button>
        </div>
      </div>
    </div>
    <buyPopUp
        v-if="buyPopUpShow"
        @cancel="buyPopUpShow = false"
    />

  </section>
</template>

<script>
import buyPopUp from '../components/buyPopUp'
  export default {
    name: "goods",
    components: {
      buyPopUp
    },
    data () {
      return {
        buyPopUpShow: false
      }
    },
    mounted () {
      console.log('items', this.shopItems)
    },
    computed: {
      shopItems () {
        return this.$store.getters.getShopItems
      }
    },
    methods: {
      buyAction (item) {
        const busketItem = {...item}
        this.$store.commit('addEllToBasket', busketItem)
        this.buyPopUpShow = true
        console.log('Busket', this.$store.getters.getBusketItems)

      }
    }
  }
</script>

<style scoped lang="scss">

  .container {
    max-width: 1170px;
    margin: 0 auto;
  }

  .goods-block {

    &__seeds-wrapper {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 20px 20px;
    }

    &__item-card {
      height: 300px;
      border: 1px solid #22283D;


    }


  }


  @media all and (max-width: 599px) {
    .goods-block {
      &__seeds-wrapper {
        grid-template-columns: 1fr;
      }
    }
  }


</style>
