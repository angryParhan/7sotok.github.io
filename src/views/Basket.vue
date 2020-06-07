<template>
  <section class="container">
    <p v-if="basketItems.length === 0">Корзина пуста</p>
    <template v-else>
      <div class="basket-table" >

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
              <router-link :to="'/product/' + item.id" class="link">{{ item.title }}</router-link>
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

      <div class="buy-form">
        <div class="form-item input-item">
          <input class="name-input" :class="{ used: personalData.name.length }" type="text"v-model="personalData.name" @blur="checkName">
          <label>ПІБ</label>
          <span class="error-handler name-error" v-if="nameError === true">Введіть ПІБ</span>
        </div>
        <div class="form-item input-item">
          <input :class="{ used: personalData.phone.length }" type="text" v-model="personalData.phone" v-mask="'+38 (###) ###-##-##'" @blur="checkPhone">
          <label>Телефон</label>
          <span class="error-handler phone-error" v-if="phoneError === true">Введіть коректний номер телефону</span>
        </div>
        <div class="form-item input-item" v-click-outside="hideDropDawn">
          <input type="search" :class="{ used: currentCity.length }" v-model="currentCity" @focus="showDropdawn = true" @blur="checkCity">
          <label>Місто/село</label>
          <div class="dropdown-items" v-if="showDropdawn">
            <ul class="search-block">
              <li v-for="(item, i) of sortedCity" :key="i" class="cityItem" @click="selectAction(item)" >
                {{ item.Description }}
              </li>
            </ul>
          </div>
          <span class="error-handler city-error" v-if="cityError === true">Виберіть місто із списку</span>
        </div>
        <div class="select-wrapper">
          <select v-model="personalData.postOffice" class="selectPostOffice" :disabled="NovaPoshtaPostOffices.length < 1" :class="{'disabled-color': NovaPoshtaPostOffices.length < 1}" >
            <option disabled >Віділення Нової пошти</option>
            <option v-for="(item, i) in NovaPoshtaPostOffices" :key="i">{{ item.Description }}</option>
          </select>
          <span class="error-handler postOffice-error" v-if="postOfficeError === true">Виберіть віділення Нової пошти із списку</span>
        </div>





        <div class="goods-btn-wrapper">
          <button class="goods-btn" @click="sendEmailHandler">Купити</button>
        </div>


      </div>
    </template>


    <buyPopUp
        v-if="successPopUp"
        @cancel="goToHome"
        @confirm="goToGoods"
        confirmMessage="Дякуємо за покупку, ми вам зателефонуємо!"
        buttonCancelText="Перейти на головну"
        buttonSuccess="Продовжити покупки"
    />

  </section>
</template>

<script>
import ApiNovaPochta from 'yz-react-deliveri-newpochta'
import ClickOutside from 'vue-click-outside'
import axios from 'axios'
import querystring from 'query-string'
import buyPopUp from '../components/buyPopUp'



  export default {
    name: "Basket",
    components: {
      buyPopUp
    },
    data () {
      return {
        successPopUp: false,
        totalPrice: 0,
        NavaPoshtaItems: [],
        currentCity: '',
        showDropdawn: false,
        NovaPoshtaPostOffices: [],
        personalData: {
          name: '',
          phone: '',
          city: '',
          postOffice: 'Віділення Нової пошти'
        },
        nameError: null,
        phoneError: null,
        cityError: null,
        postOfficeError: null,
        temp: false
      }
    },
    directives: {
      ClickOutside
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
        this.totalPriceCount()
      },
      currentCity () {
        if (this.NovaPoshtaPostOffices.length > 0) {
          this.NovaPoshtaPostOffices = []
          this.personalData.postOffice = 'Віділення Нової пошти'
        }
      }
    },
    methods: {
      goToGoods () {
        this.$router.push('/goods')
      },
      goToHome () {
        this.$router.push('/')
      },
      getDataFromNPApi () {
        const apiKey = 'e2466eeb335cb4638e194df59b42dc88'
        const cb = (res) => {
          this.NavaPoshtaItems = res.data
        }

        const np = new ApiNovaPochta
        np.getCities(cb, apiKey)

      },
      getPostOffices (hash) {
        const apiKey = 'e2466eeb335cb4638e194df59b42dc88'
        const cb = (res) => {
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
        }
        this.totalPrice = price

      },
      selectAction (city) {
        this.cityError = false
        this.currentCity = city.Description
        this.personalData.city = city.Description
        this.getPostOffices(city.Ref)
        this.showDropdawn = false
      },
      hideDropDawn () {
        this.showDropdawn = false
      },
      async sendEmailHandler () {
        this.checkName()
        this.checkPhone()
        this.checkCity()
        this.checkPostOffice()

        if (this.nameError === true || this.phoneError === true || this.cityError === true || this.postOfficeError === true) {
          return
        }


        const dataForMail = {
          ...this.personalData,
          basket: '',
          totalPrice: this.totalPrice
        }

        for(let item of this.basketItems) {
          dataForMail.basket += `${item.title}, кількість кг: ${item.quantity}, ціна за один кг: ${item.price} <br>`
        }

        this.successPopUp = true
        try {
          await this.sendEmail(dataForMail)
        } catch (e) {
          console.log(e)
        }
        this.$store.commit('cleanBasket')
      },
      sendEmail (data) {
        return axios.post('http://7-sotok.com.ua/server/mail.php', querystring.stringify(data))
        .then(res => {
          if(res.result === 'succes') {
            console.log('message sent!')
          }
        })
      },
      checkName () {
        if(this.personalData.name.length < 1) {
          this.nameError = true
        } else {
          this.nameError = false
        }
      },
      checkPhone () {
        if (this.personalData.phone.length !== 19 || this.personalData.phone[5] !== '0')  {
          this.phoneError = true
        } else {
          this.phoneError = false
        }
      },
      checkCity () {
        const idx = this.NavaPoshtaItems.findIndex(c => c.Description.toLowerCase() === this.currentCity.toLowerCase())
        if (idx === -1) {
          this.cityError = true
        } else {
          if (this.NovaPoshtaPostOffices.length === 0) {
            this.getPostOffices(this.NavaPoshtaItems[idx].Ref)
          }
          this.cityError = false
        }
      },
      checkPostOffice () {
        if (this.personalData.postOffice === 'Віділення Нової пошти' || '') {
          this.postOfficeError = true
        } else {
          this.postOfficeError = false
        }
      }
    },

  }
</script>

<style scoped lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@700&display=swap');

  .link {
    color: #0288D1;
  }

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

    .error-handler {
      color: #FB6868;
      font-size: 12px;
      float: left;
      padding-top: 3px;
    }

    .postOffice-error {
      padding-left: 12px;
    }
  }




  @media all and (max-width: 599px) {
    .quantity {
      width: 43% !important;
    }
    .quantity-btn {
      padding: 5px !important;
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
    .buy-form {
      padding: 0 25px;
    }
    .error-handler {
      font-size: 11px;
    }
  }

  @media all and (max-width: 340px) {
    .quantity-btn {
      padding: 4px!important;
    }

    .error-handler {
      font-size: 10px;
    }
  }

</style>
