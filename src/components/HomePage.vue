<template>
  <section class="home-page">
    <div class="home-page__wrapper">
      <div class="home-page__item home-page__title">
        <div class="title-wrapper">
          <h1 class="title">Насіння різноманітних рослин для газону фермерства та пасічництва.</h1>
          <span class="delivery">Доставка Новою Поштою по всій Україні.</span>
          <div class="goods-btn-wrapper">
            <router-link to="/goods" tag="p" class="goods-btn">Перейти до покупок</router-link>
          </div>
        </div>

      </div>
      <div class="home-page__item home-page__bg">

      </div>
    </div>
  </section>
</template>

<script>



export default {
  name: 'HelloWorld',
  methods: {
  },

  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
 @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@700&display=swap');

  .home-page {
    font-family: 'IBM Plex Sans', sans-serif;

    &__wrapper {
      display: grid;
      grid-template-columns: 5fr 6fr;
      height: calc(100vh - 142px);
    }

    &__item {
      height: 100%;
    }

    &__title {
      position: relative;
    }
    .title-wrapper {
      position: absolute;
      top: 30%;
      padding-left: 37px;

      .title {
        font: {
          weight: bold;
          size: 25px;
        };
        line-height: 33px;
        margin-bottom: 10px;
      }

      .delivery {
        color: #323232;
        letter-spacing: 2px;
        font-size: 12px;
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

      }

    }

    &__bg {
      background-image: url("../assets/images/jpeg/home-pageBg-3.jpg");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center right;
    }
  }

  @media all and (max-width: 599px) {
    .home-page {
      .title-wrapper {
        padding-left: 0;
      }

      &__bg {
        background-size: 90% 105%;
      }

      &__wrapper {
        height: calc(100vh - 92px);
        grid-template-columns: 1fr;

        .title-wrapper {
          top: 12%;


          .title {
            font-size: 21px;
            text-align: left;
            padding-left: 37px;
          }

          .delivery {
            padding-left: 37px;
          }

          .goods-btn-wrapper {
            margin-top: 8%;
            text-align: center;
          }
          .goods-btn {
            display: inline-block;
            margin: 0;
          }
        }
      }

    }


  }


</style>
