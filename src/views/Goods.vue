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
        @confirm="goToBasket"
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
      },
      goToBasket () {
        this.$router.push('/basket')
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
    padding-top: 20px;

    &__seeds-wrapper {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 30px 25px;
    }

    &__item-card {
      height: 300px;
      border: 1px solid #22283D;

      &:hover {
        transform: scale(1.03);
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        transition: transform 0.5s ease;
      }

    }


  }


  @media all and (max-width: 599px) {
    .goods-block {
      &__seeds-wrapper {
        grid-template-columns: 1fr;
      }
    }
    .container {
      padding: 10px;
    }
  }


</style>
