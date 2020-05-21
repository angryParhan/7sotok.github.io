<template>
  <section>
    <header class="header">
      <nav class="nav">
        <div class="nav__item-first">
          <img src="../assets/images/png/logo.png" alt="logo" class="nav__logo" @click="logoRedirect">
          <div class="logo_items">
            <ul class="items-wrapper">
              <li class="active">Головна</li>
              <li>Про нас</li>
              <li>Товари</li>
              <li>Оплата і доставка</li>
              <li class="last">Контакти</li>
            </ul>
          </div>
        </div>
        <div class="nav__item-second">
          <p class="callback-phone">+38 (050) 190-93-37 <span class="phone__description">Замовити дзвінок</span></p>
          <img src="../assets/images/svg/phone-icon.svg" alt="" class="navbar__mobile__callback">
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
      <Animated enter="slideInRight" leave="slideOutRight" duration="600">
        <div class="nav__right-block-slide" v-if="XSmenu">
          <img src="../assets/images/svg/close-btn.svg" class="close-btn" alt="" @click="closeMenu">
          <ul>
            <li>Головна</li>
            <li>Про нас</li>
            <li>Товари</li>
            <li>Оплата і доставка</li>
            <li>Контакти</li>
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
        XSmenuDone: false
      }
    },
    methods: {
      logoRedirect () {

      },
      showXSmenu () {
        this.XSmenuDone = true
        this.XSmenu = true
      },
      closeMenu () {
        this.XSmenu = false
        setTimeout(() => {
          this.XSmenuDone = false
        }, 400)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital@0;1&display=swap');

  $logoHeight: 82px;
  $logoWidth: 158px;
  $baseGreen: #3a9978;

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

    .active {
      color: $baseGreen;
    }

    .nav__item-second {
      margin-top: 24px;
    }

    .callback-phone {
      position: relative;
      cursor: pointer;

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

  @media all and (max-width: 599px)  {
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
      padding: 35px;
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

  }




</style>
