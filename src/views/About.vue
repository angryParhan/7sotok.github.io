<template>
  <section class="about">
    <div class="about__title-block">
      <div class="title-block_item img-block">
        <img src="../assets/images/png/aboutUs.png" alt="" class="title-block_item-img">
      </div>
      <div class="title-block_item">
        <div class="about__description">
          <h2>Про компанію</h2>
          <div class="text-description">Компанія 7 соток успішно існує на ринку продажу насіння різноманітних рослин для газону, фермерства, пасічництва та не тільки вже більше року. За цей час ми отримали сотні відгуків від наших щасливих клієнтів та багатьох постійних покупців. Як і весь інший бізнес ми жорстко зіткнулись із карантинними обмеженнями та були змушені переміститись у інтернет-простір, тому ми створили цей сайт, щоб мати змогу продавати якісне насіння по всій Україні.</div>
        </div>
        <div class="about__description">
          <h2>Якість</h2>
          <div class="text-description">Більшість наших товарів постачається із Нідерландів, проте є і вітчизняні виробники. Ми ретельно перевіряємо якість кожного товару та продаємо лише кращі зразки, якими і самі користуємося. Увесь асортимент перевірений не лише нами, а й часом, таким чином залишаються лише кращі товари.</div>
        </div>
        <div class="about__description">
          <h2>Довіра</h2>
          <div class="text-description">Наша компанія розуміє наскільки важливою сьогодні є довіра до компанії, тож ми завжди готові надати консультацію для кожного клієнта перед покупкою щодо конкретного товару за телефоном на сайті або ж на нашій сторінці у Facebook.</div>
        </div>
      </div>
    </div>
    <div class="feedback container">
      <h2 class="feedback__title">Відгуки</h2>
      <div class="feedback__slider">
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide v-for="(item, i) in feedBacksArr" :key="i">
            <div class="feedback-item">
              <img :src="item.avatar" alt="">
              <h3>{{ item.name }}</h3>
              <p>{{ item.text }}</p>
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>

    </div>
  </section>
</template>


<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'

  export default {
    name: "About",
    components: {
      Swiper,
      SwiperSlide
    },
    data () {
      return {
        swiperOption: {
          effect: 'coverflow',
          grabCursor: true,
          centeredSlides: true,
          slidesPerView: 'auto',
          initialSlide: 1,
          coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows : true
          },
          pagination: {
            el: '.swiper-pagination'
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          // autoplay: {
          //   delay: 2500,
          //   disableOnInteraction: false
          // }
        }
      }
    },
    computed: {
      feedBacksArr () {
        return this.$store.getters.getFeedBacks
      }
    }
  }
</script>

<style scoped lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,300&display=swap');



  .container {
    max-width: 1170px;
    margin: 0 auto;
  }

  .about {
    background: #fdfdfe;
    font-family: 'Roboto Condensed', sans-serif;
    .img-block {
      text-align: center;
    }

    &__description {
      font-size: 15px;
      border: 1px solid #C2CFE0;
      line-height: 16px;
      border-radius: 5px;
      color: #22283D;
      margin-bottom: 20px;
      width: 80%;

      h2 {
        border-bottom: 1px solid #C2CFE0;
        padding: 12px;
        font-weight: bold;
      }
      .text-description {
        padding: 12px;
        color: gray;

      }
    }
  }
  .title-block_item-img {
    text-align: center;
    width: 100%;
    height: auto;
  }

  .title-block_item {
    padding: 20px;
  }

  .about__title-block {
    display: grid;
    grid-template-columns: 4fr 5fr;
  }

  .feedback {

    &__title {
      text-align: center;
      color: #6cc164;
      font-size: 27px;
      font-weight: bold;
      margin-bottom: 5px;
    }

    &__slider {
      margin-bottom: 80px;
    }

    .swiper {
      height: 100%;
      width: 100%;
      padding: 20px 0;

      .swiper-slide {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 400px;
        height: 320px;
        text-align: center;
        font-weight: bold;
        font-size: 25px;
        background: transparent;
        color: #22283D;
        background: #6cc164;
        border-radius: 5px;
      }

      .feedback-item {
        height: 100%;
        width: 100%;
        img {
          margin-top: 20px;
          width: 110px;
          height: 110px;
          border-radius: 50%;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        }

        h3 {
          margin-top: 20px;
          color: #EAEDF5;
        }

        p {
          font-size: 15px;
          font-weight: normal;
          margin-top: 15px;
          color: #ffffff;
          padding: 0 30px;
          font-style: italic;
        }
      }

      .swiper-pagination {
        /deep/ .swiper-pagination-bullet.swiper-pagination-bullet-active {
          background-color: #6cc164;
        }

        margin-top: 40px;
      }

      .swiper-pagination-bullets {
        bottom: 0 !important;
      }

      .swiper-button-prev {
        color: #6cc164;
        left: 0;
      }

      .swiper-button-next {
        color: #6cc164;
        right: 0;
      }
    }

    .swiper-btn {
      color: #6cc164 !important;
    }

  }

  @media all and (max-width: 599px) {
    .about__title-block {
      grid-template-columns: 1fr;
    }

    .img-block {
      text-align: left;
    }
    .about__description {
      width: 100%;
    }

    .swiper-slide {
      width: 300px !important;
    }
  }
</style>
