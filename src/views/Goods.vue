<template>
  <section>
    <div class="goods-block container">
      <div class="goods-block__seeds-wrapper">
        <div
            class="goods-block__item-card"
            v-for="(item, i) in filteredShopItems"
            :key="i"

        >
          <router-link :to="'/product/' + item.id" tag="picture">
            <img :src="item.img" alt="" class="product-title-img">
          </router-link>

          <router-link tag="p" :to="'/product/' + item.id" class="title">{{ item.title }}</router-link>
          <p class="description"><span>Призначення:</span> {{ item.description }}</p>

          <div class="btn-price-wrapper">
            <p class="price"><span class="helper"></span>Ціна: {{ item.price }} грн/кг</p>
            <div class="btns">
              <router-link :to="'/product/' + item.id" tag="p" class="btn btn-more">Детальніше</router-link>
              <p class="btn buy-btn" @click="buyAction(item)">Купити</p>
            </div>
          </div>

        </div>
        <div v-if="filteredShopItems.length === 0" class="sub-categories">Вибачте, товарів данної категорії немає у наявності<br><router-link to="/categories?mode=main_categories">усі категорії</router-link></div>

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
        buyPopUpShow: false,
        sortValue: 'all'
      }
    },
    computed: {
      shopItems () {
        return this.$store.getters.getShopItems
      },
      filteredShopItems () {
        return this.sortValue === 'all' ? this.shopItems : this.shopItems.filter(el => el.categories.includes(this.sortValue))
      }
    },
    created () {
      console.log(this.$route.query.sort_value)
      if (this.$route.query.sort_value) {
        this.sortValue = this.$route.query.sort_value
      }
    },
    methods: {
      buyAction (item) {
        const busketItem = {...item}
        this.$store.commit('addEllToBasket', busketItem)
        this.buyPopUpShow = true
        this.$gtag.event('click-buy-button', {
          'event_category': 'add-product-to-basket',
          'event_label': '+ product',
          'value': busketItem
        })
      },
      goToBasket () {
        this.$router.push('/basket')
      }
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

  .goods-block {
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 400;
    color: #22283D;
    padding-top: 60px;
    margin-bottom: 100px;

    &__seeds-wrapper {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 70px 115px;
    }

    &__item-card {
      box-shadow: 0 6px 6px -3px rgba(0,0,0,.2),0 10px 14px 1px rgba(0,0,0,.14),0 4px 18px 3px rgba(0,0,0,.12)!important;
      border-radius: 4px;


      &:hover {
        transform: scale(1.03);
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        transition: transform 0.5s ease;
      }

    }

    .product-title-img {
      cursor: pointer;
      border-radius: inherit;
      height: 230px;
      width: 100%;
      margin-bottom: 10px;
    }

    .btn-price-wrapper {
      display: flex;
      justify-content: space-between;
    }

    .price {
      flex: 2;
    }

    .btns {
      flex: 3;
      display: flex;
      justify-content: space-around;
    }

    .btn {
      padding: 10px;
      cursor: pointer;
      margin-bottom: 15px;
      border-radius: 2px;
      font-size: 13px;
      margin-top: 20px;
    }

    .buy-btn {
      color: #ffffff;
      background-color: #3bb78f;
      background-image: linear-gradient(315deg, #3bb78f 0%, #0bab64 74%);
      padding: 10px 15px;
    }

    .btn-more {

      background: rgba(0, 0, 0, 0.03);

      &:hover {
        background: rgba(0, 0, 0, 0.07);
      }
    }

    .price {
      align-self: center;
      font-weight: bold;
      line-height: 14px;
      padding-left: 10px;
      padding-top: 4px;
    }

    .helper {
      height: 100%;
    }

    .title {
      cursor: pointer;
      margin-bottom: 20px;
      font-size: 18px;
      font-weight: bold;
      padding-left: 10px;
      &:hover {
        color: #0288D1;
        text-decoration: underline;
      }
    }

    .description {

      padding-left: 10px;
      font-size: 14px;
      span {
        font-size: 16px;
        font-weight: bold;
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
      padding: 40px 25px;
    }
  }


</style>
