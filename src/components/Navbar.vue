<template>
  <section>
    <header class="header">
      <nav class="nav">
        <div class="nav__item-first">
          <img src="../assets/images/png/logo.png" alt="logo" class="nav__logo" @click="logoRedirect">
          <div class="logo_items">
            <ul class="items-wrapper">
              <router-link to="/" tag="li" :class="{active: activeTab === 'Home'}">Головна</router-link>
              <router-link to="/about" tag="li" :class="{active: activeTab === 'About'}">Про нас</router-link>
              <router-link to="/goods" tag="li" :class="{active: activeTab === 'Goods'}">Товари</router-link>
              <router-link to="/contacts" tag="li" class="last" :class="{active: activeTab === 'Contacts'}">Контакти</router-link>
            </ul>
          </div>
        </div>
        <div class="nav__item-second">
          <div class="basket-wrapper" @click="sendBasketEventToAnalitics">
            <router-link to="/basket" tag="picture" :class="{'basket-active' : busketItems}" :data-basketItems="busketItems" >
              <img src="../assets/images/svg/basket.svg" alt="" class="basket active" >
            </router-link>
          </div>
          <a href="tel:+380501909337" class="callback-phone" @click="sendDataToGoogleAnalitics">+38 (050) 190-93-37 <span class="phone__description">Зателефонувати</span></a>
          <a href="tel:+380501909337" @click="sendDataToGoogleAnalitics"><img src="../assets/images/svg/phone-icon.svg" alt="" class="navbar__mobile__callback"></a>
          <img src="../assets/images/svg/navBar-mobile.svg" alt="" class="navbar__mobile" @click="showXSmenu">
        </div>
      </nav>
      <transition name="fade">
        <div
              class="nav__right-block-slide-wrapper"
              @click.self="closeMenu"
              v-if="XSmenuDone"
        />
      </transition>
      <Animated enter="slideInRight" leave="slideOutRight" duration="300">
        <div class="nav__right-block-slide" v-if="XSmenu">
          <img src="../assets/images/svg/close-btn.svg" class="close-btn" alt="" @click="closeMenu">
          <ul>
            <router-link to="/" tag="li" :class="{active: activeTab === 'Home'}">Головна</router-link>
            <router-link to="/about" tag="li" :class="{active: activeTab === 'About'}">Про нас</router-link>
            <router-link to="/goods" tag="li" :class="{active: activeTab === 'Goods'}">Товари</router-link>
            <router-link to="/contacts" tag="li" :class="{active: activeTab === 'Contacts'}">Контакти</router-link>
          </ul>
        </div>
      </Animated>
    </header>
  </section>
</template>

<script>
  export default {
    name: "Navbar",
    data () {
      return {
        XSmenu: false,
        XSmenuDone: false,
        basketActive: false,
        activeTab: ''
      }
    },
    mounted () {
      this.activeTab = this.$router.currentRoute.name

    },
    computed: {
      busketItems () {
        return this.$store.getters.getBusketItems.length
      }
    },
    watch: {
      $route (to){
        this.activeTab = to.name
        if (this.XSmenu) {
          setTimeout(() => {
            this.closeMenu()
          }, 100)
        }
      }
    },
    methods: {
      sendBasketEventToAnalitics () {
        this.$gtag.event('click-navbar-basket-icon', {
          'event_category': 'basket-icon',
          'event_label': 'click',
          'value': 'basket icon triggered!'
        })
      },
      sendDataToGoogleAnalitics () {
        this.$gtag.event('call-back', {
          'event_category': 'call-action',
          'event_label': 'call',
          'value': 'phone call triggered!'
        })
      },
      logoRedirect () {
        if (this.$router.currentRoute.name !== 'Home') {
          this.$router.push({ name: 'Home'})
        }
      },
      showXSmenu () {
        this.XSmenuDone = true
        this.XSmenu = true
      },
      closeMenu () {
        this.XSmenu = false
        setTimeout(() => {
          this.XSmenuDone = false
        }, 100)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital@0;1&display=swap');

  $logoHeight: 82px;
  $logoWidth: 158px;
  $baseGreen: #3a9978;

  header {
    position: fixed;
    top: 0;
    background: #ffffff;
    width: 100%;
    z-index: 2;
  }

  .active {
    color: $baseGreen;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }



  .navbar__mobile {
    display: none;
  }
  .navbar__mobile__callback {
    display: none;
  }
  .nav {
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    padding: 30px;

    font-family: 'IBM Plex Sans', sans-serif;

    &__item-first {
      display: flex;

      .logo_items ul {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 100%;
        width: 100%;
      }
    }

    &__logo {
      height: $logoHeight;
      width: $logoWidth;
      margin-right: 10%;
      cursor: pointer;
    }

    .items-wrapper li {
      cursor: pointer;
      position: relative;



      &::before {
        content: '';
        width: 20px;
        height: 2px;
        position: absolute;
        background: $baseGreen;
        top: -7px;
        display: none;
      }

      &:hover {
        color: $baseGreen;
        transition: color 50ms ease;
      }

      &:hover:before {
        display: block;
      }
    }


    .items-wrapper li:not(.last) {
      margin-right: 70px;
    }

    .items-wrapper li {
      white-space: nowrap;
    }



    .nav__item-second {
      margin-top: 24px;
      position: relative;
    }

    .callback-phone {
      position: relative;
      cursor: pointer;
      text-decoration: none;
      color: #22283D;

      &:before {
        content: '';
        width: 16px;
        height: 16px;
        background-image: url("../assets/images/svg/phone-icon.svg");
        display: block;
        position: absolute;
        left: -30px;
      }

      @keyframes drag {
        10%  {
          transform: rotate(-12deg);
        }
        20% {
          transform: rotate(12deg);
        }
        30% {
          transform: rotate(-12deg);
        }
        40% {
          transform: rotate(12deg);
        }
        50% {
          transform: rotate(-12deg);
        }
        60% {
           transform: rotate(12deg);
         }
        70% {
          transform: rotate(-12deg);
        }
        80% {
          transform: rotate(12deg);
        }
        90% {
          transform: rotate(-12deg);
        }
        100% {
          transform: rotate(12deg);
        }
      }

      &:hover:before {
        -webkit-animation-name: drag;
        -webkit-animation-duration: 800ms;
        -webkit-animation-iteration-count: infinite;
        -webkit-animation-timing-function: linear;
      }

      .phone__description {
        position: absolute;
        color: $baseGreen;
        right: 0;
        bottom: -20px;
        font: {
          size: 13px;
        }
      }
    }

  }



  @media all and (max-width: 1150px)  {

    .logo_items {
      display: none;
    }

  }

  @media all and (max-width: 599px) {
    .callback-phone {
      display: none;
    }
    .nav {
      padding: 15px;
      padding-right: 25px;

      &__logo {
        height: 62px;
        width: 97px;
      }
    }

    .callback-phone {
      font-size: 13px;
    }
    .phone__description {
      font-size: 11px !important;
    }

    .navbar__mobile {
      cursor: pointer;
      display: inline-block;
      width: 16px;
      height: 16px;
      transform: scale(2);

    }

    .nav__item-second {
      position: relative;
    }

    .navbar__mobile__callback {
      position: absolute;
      height: 16px;
      width: 16px;
      transform: scale(1.2);
      display: block;
      left: -50px;
      top: -1px;
      cursor: pointer;
    }


    .nav__right-block-slide-wrapper {
      background-color: rgba(25, 25, 25, .5);
      position: fixed;
      width: 100vw;
      height: 100vh;
      z-index: 1;
      top: 0;
      left: 0;
    }

    .nav__right-block-slide {
      z-index: 2;
      position: fixed;
      top: 0;
      right: 0;
      background-color: #fff;
      height: 100vh;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.38);
      width: 60%;
    }

    .nav__right-block-slide li  {
      padding: 12%;
      text-align: left;
      margin-bottom: 10%;
      font-weight: bold;
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 20px;
      cursor: pointer;
      box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);

    }

    .nav__right-block-slide ul {

    }

    .close-btn {
      cursor: pointer;
      width: 30px;
      height: 30px;
      margin-top: 10px;
      margin-left: 10px;
    }

    .basket-wrapper {
      left: -115px !important;
      top: -7px !important;
    }

  }

  $basketSize: 30px;


  .basket-wrapper {
    position: absolute;
    left: -105px;
    top: 2px;
  }
  .basket {
    width: $basketSize;
    height: $basketSize;
    cursor: pointer;
    position: relative;

  }

  .basket-active {
    position: relative;


    &:before {
      box-sizing: border-box;
      content:  attr(data-basketItems) ;
      display: block;
      position: absolute;
      font-size: 12px;
      color: white;
      background: red;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      top: -31px;
      left: -17px;
      text-align: center;
      padding-top: 4px;

    }

    $circleDiametr: 50px;

    &:after {
      content: '';
      display: block;
      position: absolute;
      font-size: 12px;
      color: #22283D;
      width: $circleDiametr;
      height: $circleDiametr;
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.2);
      top: -23px;
      left: -9px;
      z-index: -1;
    }
  }


</style>
