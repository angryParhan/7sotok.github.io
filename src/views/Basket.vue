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


    <h2 class="form-title">Оформлення замовлення</h2>

    <form action="../../server/mail.php" method="post" >
      <div class="buy-form">

        <div class="form-item input-item">
          <input class="name-input" :class="{ used: personalData.name.length }" type="text" name="name" v-model="personalData.name" required>
          <label>ПІБ</label>
        </div>
        <div class="form-item input-item">
          <input :class="{ used: personalData.phone.length }" type="text" name="phone" v-model="personalData.phone" v-mask="'+38 (###) ###-##-##'" required>
          <label>Телефон</label>
        </div>
        <div class="form-item input-item" v-click-outside="hideDropDawn">
          <input type="search" name="delivery" :class="{ used: currentCity.length }" v-model="currentCity" @focus="showDropdawn = true"  required >
          <label>Місто/село</label>
          <div class="dropdown-items" v-if="showDropdawn">
            <ul class="search-block">
              <li v-for="(item, i) of sortedCity" :key="i" class="cityItem" @click="selectAction(item)" >
                {{ item.Description }}
              </li>
            </ul>
          </div>
        </div>
        <select name="postOffice" class="selectPostOffice" :disabled="NovaPoshtaPostOffices.length < 1" :class="{'disabled-color': NovaPoshtaPostOffices.length < 1}" required>
          <option disabled :selected="NovaPoshtaPostOffices.length === 0">Віділення Нової пошти</option>
          <option v-for="(item, i) in NovaPoshtaPostOffices" :key="i">{{ item.Description }}</option>
        </select>

        <input type="text" name="basket" :value="basketItems" hidden>
        <input type="text" name="totalPrice" :value="totalPrice" hidden>

        <div class="goods-btn-wrapper">
          <button type="submit" class="goods-btn">Купити</button>
        </div>


      </div>
    </form>




  </section>
</template>

<script>
import ApiNovaPochta from 'yz-react-deliveri-newpochta'
import ClickOutside from 'vue-click-outside'



  export default {
    name: "Basket",
    data () {
      return {
        totalPrice: 0,
        NavaPoshtaItems: [],
        currentCity: '',
        showDropdawn: false,
        NovaPoshtaPostOffices: [],
        personalData: {
          name: '',
          phone: '',
          city: '',
          postOffice: ''
        }
      }
    },
    directives: {
      ClickOutside,

    },
    created () {
      this.totalPriceCount()
      this.getDataFromNPApi()
    },
    mounted () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    },
    computed: {
      basketItems () {
        return this.$store.getters.getBusketItems
      },
      filteredCity () {
        return this.NavaPoshtaItems.filter(city => {
          return city.Description.toLowerCase().indexOf(this.currentCity.trim().toLowerCase()) !== -1
        })
      },
      sortedCity () {
        if (this.currentCity.trim().length > 1) {
          return this.filteredCity.sort((a, b) => a.Description.length > b.Description.length ? 1 : -1)
        } else {
          return this.filteredCity
        }

      }
    },
    watch: {
      basketItems () {
        console.log('bum')
        this.totalPriceCount()
      },
      currentCity () {
        if (this.NovaPoshtaPostOffices.length > 0) {
          this.NovaPoshtaPostOffices = []
        }
      }
    },
    methods: {
      getDataFromNPApi () {
        const apiKey = 'e2466eeb335cb4638e194df59b42dc88'
        const cb = (res) => {
          this.NavaPoshtaItems = res.data
          console.log(this.NavaPoshtaItems)
        }

        const np = new ApiNovaPochta
        np.getCities(cb, apiKey)

      },
      getPostOffices (hash) {
        const apiKey = 'e2466eeb335cb4638e194df59b42dc88'
        const cb = (res) => {
          console.log('city', res)
          this.NovaPoshtaPostOffices = res.data
        }

        const prop = {"CityRef": hash}
        const np = new ApiNovaPochta

        np.getWarehouses(cb, apiKey, prop);
      },
      deleteItem (id) {
        this.$store.commit('removeElFromBasket', id)
        this.$gtag.event('remove-item-from-basket', {
          'event_category': 'basket-products-table',
          'event_label': '- item',
          'value': id
        })
      },
      minusAction (id) {
        this.$store.commit('minusQuantity', id)
        this.totalPriceCount()
        this.$gtag.event('click-minus-quantity', {
          'event_category': 'basket-products-table',
          'event_label': '-1 Quantity',
          'value': id
        })
      },
      plusAction (id) {
        this.$store.commit('plusQuantity', id)
        this.totalPriceCount()
        this.$gtag.event('click-plus-quantity', {
          'event_category': 'basket-products-table',
          'event_label': '+1 Quantity',
          'value': id
        })

      },
      totalPriceCount () {
        let price = 0
        for (let item of this.basketItems) {
          price += item.price * item.quantity
          console.log('Price', price, 'itemPrice', item.price, 'dd', item.quantity)
        }
        this.totalPrice = price

      },
      selectAction (city) {

        this.currentCity = city.Description
        this.personalData.city = city.Description
        this.getPostOffices(city.Ref)
        console.log(this.personalData)
        this.showDropdawn = false
      },
      hideDropDawn () {
        this.showDropdawn = false

      }
    },

  }
</script>

<style scoped lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@700&display=swap');

  input {
    border: none;
    outline: none;
    &:active {
      outline: none;
    }
  }

  .search-block {
    max-height: 150px;
    overflow-y: auto;
    text-align: left;

  }

  .cityItem {
    padding: 10px;
    cursor: pointer;
    &:hover {
      background: #EAEDF5;
    }
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

  .form-title {
    text-align: left;
    margin: 60px 0;
    color: #22283D;
    font-size: 26px;
    font-weight: bold;
  }

  .buy-form {

    height: 800px;

    input {
      padding-bottom: 5px;
      padding-left: 5px;
      color: #22283D;
    }

    max-width: 700px;
    padding: 0 50px;
    margin: 50px auto;
    text-align: center;
    & input, & select {
      background: transparent;
      width: 100%;
    }



    .form-item {
      margin-bottom: 45px;
      position: relative;
      z-index: 1;
      padding-left: 12px;
    }

    .input-item input {
      font-size: 18px;
      padding: 8px;
      -webkit-appearance: none;
      display: block;
      background: transparent;
      color: black;
      width: 98%;
      border: none;
      border-radius: 0;
      border-bottom: 1px solid #6cc164;
      line-height: 10px;
    }

    .input-item label{
      color: #999;
      font-size: 18px;
      font-weight: normal;
      position: absolute;
      pointer-events: none;
      left: 10px;
      top: 10px;
      transition: all 0.2s ease-out;
    }

    input:focus ~ label, input.used ~ label {
      top: -15px;
      transform: scale(.85);
      left: 8px;
      color: #6cc164;
    }


    .name-title {
      position: absolute;
      left: 0;
      z-index: 0;
    }

    .name-item:focus .name-title {
      top: -20px !important;
      transition: top 0.2s ease-in-out;
    }

    .dropdown-items {
      position: absolute;
      background: #ffffff;
      width: 96%;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .selectPostOffice {
      border: none;
      -webkit-box-shadow: 0px 9px 0px -8px rgba(108,193,100,0.85);
      -moz-box-shadow: 0px 9px 0px -8px rgba(108,193,100,0.85);
      box-shadow: 0px 9px 0px -8px rgba(108,193,100,0.85);
      outline: none;
      color: #22283D;
      padding: 10px;
    }

    .disabled-color {
      color: gray;
    }

    .goods-btn-wrapper {
      margin-top: 40px;
      display: flex;
      justify-content: center;
    }

    .goods-btn {
      width: 150px;
      border-radius: 20px;
      padding: 13px;
      text-align: center;
      cursor: pointer;
      margin-top: 23px;
      font-size: 12px;
      background-color: #3bb78f;
      background-image: linear-gradient(315deg, #3bb78f 0%, #0bab64 74%);
      color: #ffffff;
      border: none;
      outline: none;

      &:active {
        border: none;
        outline: none;
      }
    }
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
    .form-title {
      text-align: center;
    }
  }

  @media all and (max-width: 340px) {
    .quantity-btn {
      padding: 4px!important;
    }
  }

</style>
