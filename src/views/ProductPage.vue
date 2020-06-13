<template>
  <section>
    <template v-if="!currentProduct">
      <p class="error-block">Продукт не знайдено(</p>
    </template>
    <template v-else>
      <div class="product container">
        <h1 class="product__title">{{ currentProduct.title }}</h1>

        <div class="product__short-description">
          <div class="desc-item img-block">
            <img :src="currentProduct.img" alt="">
          </div>
          <div class="desc-item desc-block">
            <div class="price-block help-block">
              <p class="price">{{ currentProduct.price }} грн/кг</p>
              <p @click="buyAction" class="buy-btn">Купити</p>
            </div>
            <div class="shipping-info help-block">
              <h2>Доставка</h2>
              <p class="mb-1">Доставимо по всій Україні Новою поштою</p>
              <p>Відправимо вже сьогодні!</p>
            </div>
            <div class="pay-info help-block">
              <h2>Оплата</h2>
              <p>Готівкова, Google Pay, Онлайн карткою, Оплата через Masterpass, Безготівковими для юридичних осіб, Безготівковими для фізичних осіб</p>
            </div>
          </div>
        </div>
        <div class="product__full-description">
          <h2 class="title">Опис</h2>
          <p v-for="(item, i) in currentProduct.fullDescription" :key="i" class="description-part">{{ item }}</p>
          <p v-if="currentProduct.harvest"><span class="title-section">Врожайність: </span> {{ currentProduct.harvest }} </p>
          <div class="seed-wrapper">
            <p class="title-section mt-12">Норма висіву(1 га/ 1 сотка):</p>
            <ul>
              <li v-for="(item, i) in currentProduct.seed" :key="i" class="seed-item">- {{ item }}</li>
            </ul>
          </div>

        </div>

        <div class="more-products">
          <h2 class="more-products__title">Також вас можуть зацікавити</h2>
          <swiper class="swiper" :options="swiperOption">
            <swiper-slide class="slider-item" v-for="(item, i) in moreProducts" :key="i">
              <div class="img-wrapper" @click="changeProduct(item.id)">
                <img :src="item.img" alt="" class="slider-img">
              </div>
              <h3 class="slider-item__title">{{ cutTitleForMobile(item.title) }}</h3>
              <h2 class="price-slider">{{ item.price }} грн/кг</h2>
              <div class="btn-wrapper">
                <p class="btn btn-more" @click="changeProduct(item.id)">Детальніше</p>
                <p class="btn btn-buy" @click="buyAction(item.id, true)">Купити</p>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </template>

  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

  export default {
    name: "ProductPage",
    props: ['id'],
    components: {
      Swiper,
      SwiperSlide
    },
    data () {
      return {
        swiperOption: {
          slidesPerView: 5,
          spaceBetween: 10,

          autoplay: {
            delay: 2500,
            disableOnInteraction: false
          },
          breakpoints: {
            1024: {
              slidesPerView: 4,
              spaceBetween: 40
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            320: {
              slidesPerView: 2,
              spaceBetween: 10
            }
          }
        },
        currentProductId: ''
      }
    },
    created () {
      this.currentProductId = this.id
    },
    mounted () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    },
    computed: {
      currentProduct () {
        const Id = this.currentProductId
        return this.$store.getters.getProductById(Id)
      },
      moreProducts () {
        return this.$store.getters.getShopItems
      }
    },
    methods: {
      async buyAction (id, fromSlider = false) {
        let basketItem
        if (fromSlider) {
          basketItem = {...this.moreProducts.find(c => c.id === id)}
        } else {
          basketItem = {...this.currentProduct}
        }

        await this.$store.commit('addEllToBasket', basketItem)
        this.$gtag.event('click-buy-button', {
          'event_category': 'add-product-to-basket',
          'event_label': '+ product',
          'value': basketItem
        })
        this.$router.push('/basket')
      },
      changeProduct (id) {
        console.log('sdv')
        this.currentProductId = id
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        })
      },
      cutTitleForMobile (text) {
        if (text.length > 17 && this.mobileCheck()) {
          text = text.substr(0, 17) + '...'
        }
        return text
      },
      mobileCheck () {
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check
      }
    }
  }
</script>

<style scoped lang="scss">

  .error-block {
    padding-top: 40px;
    text-align: center;
    font-size: 25px;
    color: #22283D;
    font-weight: bold;
  }

  .mb-1 {
    margin-bottom: 10px;
  }

  .mt-12 {
    margin-top: 12px;
  }

  .container {
    font-family: Arial,Segoe UI,Roboto,Helvetica,sans-serif;
    max-width: 1170px;
    padding: 20px 15px;
    margin: 0 auto;
  }
  .product {
    color: #22283D;
    &__title {
      font-size: 32px;
      line-height: 43px;
      color: #22283D;
      margin-bottom: 15px;
    }

    &__short-description {
      display: grid;
      grid-template-columns: 5fr 4fr;

      .img-block {
        margin-bottom: 20px;
        img {
          width: 90%;
        }
      }

      .desc-block {


        .help-block {
          margin-bottom: 24px;
          border: 1px solid #e9e9e9;
          border-radius: 4px;
          padding-bottom: 16px;

          h2 {
            border-bottom: 1px solid #e9e9e9;
            padding: 10px 16px;
            font-weight: 600;
            margin-bottom: 16px;
          }

          p {
            padding: 0 16px;
          }
        }

        .price-block {
          display: flex;
          padding-top: 16px;
          .price {
            font-size: 32px;
          }

          .buy-btn {
            color: #ffffff;
            background-color: #3bb78f;
            background-image: linear-gradient(315deg, #3bb78f 0%, #0bab64 74%);
            padding: 10px 15px;
            cursor: pointer;
            border-radius: 2px;
            margin-left: 12px;
          }
        }

      }
    }

    &__full-description {
      border: 1px solid #e9e9e9;
      border-radius: 4px;
      padding: 16px;
      color: #333;
      font-size: 14px;

      .title {
        font-size: 24px;
        font-weight: 500;
        margin-bottom: 20px;
      }

      .description-part {
        margin-bottom: 12px;
        font-style: italic;
      }

      .title-section {
        font-weight: bold;
      }



      .seed-item {
        padding-left: 20px;
        padding-top: 3px;
      }
    }
  }

  .more-products {
    margin-top: 20px;
    &__title {
      color: #22283D;
      font-size: 22px;
    }
  }

  .swiper {
    margin-top: 5px;
    height: 270px;
    padding: 10px;
  }

  .slider-item {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);

    &__title {
      font-size: 13px;
      text-align: center;
      margin-top: 5px;
    }

    .btn-wrapper {
      display: flex;
      justify-content: space-around;

      .btn {
        padding: 10px;
        cursor: pointer;
        margin-bottom: 15px;
        border-radius: 2px;
        font-size: 13px;
        margin-top: 13px;
      }

      .btn-more {
        background: rgba(0, 0, 0, 0.03);
        &:hover {
          background: rgba(0, 0, 0, 0.07);
        }
      }

      .btn-buy {
        color: #ffffff;
        background-color: #3bb78f;
        background-image: linear-gradient(315deg, #3bb78f 0%, #0bab64 74%);
        padding: 10px 15px;
      }

    }

    .price-slider {
      padding-top: 5px;
      text-align: center;
    }
  }

  .img-wrapper {
    cursor: pointer;
    .slider-img {
      width: 100%;
      height: 150px;
    }
  }


  @media all and (max-width: 599px) {
    .product {
      &__title {
        font-size: 22px;
        font-weight: 600;
      }
      &__short-description {
        grid-template-columns: 1fr;

        .img-block {
          img {
            width: 100%;
          }

        }
      }
    }

    .btn-wrapper {

      .btn {
        padding: 7px;
        cursor: pointer;
        margin-bottom: 15px;
        border-radius: 2px;
        font-size: 13px;
        margin-top: 13px;
      }

      .btn-more {
        padding: 10px 6px !important;

      }

      .btn-buy {
        padding: 10px 9px !important;
      }
    }
  }


</style>
