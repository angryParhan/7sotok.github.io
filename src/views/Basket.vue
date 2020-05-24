<template>
  <section class="container">
    <p v-if="basketItems.length === 0">Корзина пуста</p>
    <div class="basket-table" v-else>

      <table class="table table-head">
        <tr class="table-title-part">
          <th class="table-title">
            Назва товару
          </th>
          <th class="table-quantity">
            Кількість (кг)
          </th>
          <th class="table-price">
            Ціна (грн/кг)
          </th>
          <th class="table-empty"></th>
        </tr>
      </table>
      <table class="table table-head">
        <tr v-for="(item, i) in basketItems" :key="i">
          <td class="title">
            {{ item.title }}
          </td>
          <td class="quantity">
            <span class="minus-quantity quantity-btn" @click="minusAction(item.id)">-</span>
            {{ item.quantity }}
            <span class="plus-quantity quantity-btn" @click="plusAction(item.id)">+</span>
          </td>
          <td class="price">
            {{ item.price }}
          </td>
          <td class="delete-button">
            <svg @click="deleteItem(item.id)" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash" class="delete-item svg-inline--fa fa-trash fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#A8B6C7" d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path></svg>
          </td>
        </tr>
      </table>
      <div class="total-price-wrapper">
        <p class="total-price">Разом: {{ totalPrice }} грн</p>
      </div>
    </div>


    <input type="text" v-model="currentCity">

    <ul class="search-block">
      <li v-for="(item, i) of filteredCity" :key="i" >
        {{ item.Description }}
      </li>
    </ul>

  </section>
</template>

<script>
import ApiNovaPochta from 'yz-react-deliveri-newpochta'

  export default {
    name: "Basket",
    data () {
      return {
        totalPrice: 0,
        NavaPoshtaItems: [],
        currentCity: ''
      }
    },
    created () {
      this.totalPriceCount()
      this.getDataFromNPApi()
    },
    computed: {
      basketItems () {
        return this.$store.getters.getBusketItems
      },
      filteredCity () {
        return this.NavaPoshtaItems.filter(city => {
          return city.Description.toLowerCase().indexOf(this.currentCity.toLowerCase()) !== -1
        })
      }
    },
    watch: {
      basketItems () {
        console.log('bum')
        this.totalPriceCount()
      }
    },
    methods: {
      getDataFromNPApi () {
        const apiKey = 'e2466eeb335cb4638e194df59b42dc88'
        const cb = (res) => {
          this.NavaPoshtaItems = res.data
          console.log(this.NavaPoshtaItens)
        }

        const cb1 = (res) => {
          console.log('city', res)
        }

        const prop = {"CityRef": "6331d0a6-a953-11e9-b73a-005056b24375"}

        const np = new ApiNovaPochta
        np.getCities(cb, apiKey)
        np.getWarehouses(cb1, apiKey, prop);
      },
      deleteItem (id) {
        this.$store.commit('removeElFromBasket', id)
      },
      minusAction (id) {
        this.$store.commit('minusQuantity', id)
        this.totalPriceCount()
      },
      plusAction (id) {
        this.$store.commit('plusQuantity', id)
        this.totalPriceCount()

      },
      totalPriceCount () {
        let price = 0
        for (let item of this.basketItems) {
          price += item.price * item.quantity
          console.log('Price', price, 'itemPrice', item.price, 'dd', item.quantity)
        }
        this.totalPrice = price

      }
    }
  }
</script>

<style scoped lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@700&display=swap');

  .search-block {
    height: 100px;
    overflow-y: auto;
  }

  .container {
    padding-top: 30px;
    max-width: 1170px;
    margin: 0 auto;
    font-family: "Open Sans", Helvetica, arial, sans-serif;
  }

  .delete-item {
    height: 16px;
    width: 16px;
    &:hover path {
      fill: red;
      cursor: pointer;
    }
  }

  .basket-table {
    max-width: 900px;
    margin: 0 auto;

    .table {
      width: 100%;

      th, td {
        padding: 20px;
      }

      tr:nth-child(2n) {
        background-color: #F6F8FE;
      }
      tr:hover:not(.table-title-part) {
        background-color: #EAEDF5;
      }

      .table-title-part {
        background: #6cc164;
        color: #ffffff;
      }

      .table-title, .title {
        text-align: left;
        width: 40%;
      }

      .table-quantity, .quantity, .table-price, .price {
        width: 25%;
      }

      .quantity, .price {
        text-align: center;
      }

      .quantity-btn {
        cursor: pointer;
        user-select: none;
        padding: 10px;
        background: rgba(0, 0, 0, 0.05);
        &:hover {
          background: rgba(0, 0, 0, 0.1);
        }
      }

    }
  }
  .total-price-wrapper {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
  .total-price {
    border-top: 2px solid #22283D;
    width: 30%;
    padding-top: 10px;
    font-weight: bold;
  }

  @media all and (max-width: 599px) {
    .quantity {
      width: 40% !important;
    }
    .quantity-btn {
      padding: 8px !important;
    }

    .total-price {
      width: 45% !important;
    }

    .container {
      padding-top: 20px;
    }
  }

  @media all and (max-width: 340px) {
    .quantity-btn {
      padding: 4px!important;
    }
  }

</style>
