<template>
  <section>
    <header class="header">
      <nav class="nav">
        <div class="nav__item-first">
          <img src="../assets/images/png/logo.png" alt="logo" class="nav__logo">
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
        </div>
      </nav>
    </header>
  </section>
</template>

<script>
  export default {
    name: "Navbar"
  }
</script>

<style scoped lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital@0;1&display=swap');

  $logoHeight: 82px;
  $logoWidth: 158px;
  $baseGreen: #6cc164;
  .nav {
    display: flex;
    justify-content: space-between;
    padding: 30px;

    font-family: 'IBM Plex Sans', sans-serif;

    &__item-first {
      display: flex;
      width: 70%;

      .logo_items ul {
        display: flex;
        align-items: center;
        height: 100%;
      }
    }

    &__logo {
      height: $logoHeight;
      width: $logoWidth;
      margin-right: 10%;
    }

    .items-wrapper li {
      cursor: pointer;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        width: 4px;
        height: 20px;
        color: green;
        display: block;
      }
      &:hover {
        color: $baseGreen;
        border-color: $baseGreen;
        transition: border-bottom-color 1s;
      }


    }

    .items-wrapper li:not(.last) {
      margin-right: 70px;
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

      .phone__description {
        position: absolute;
        color: $baseGreen;
        right: 0;
        bottom: -20px;
        font: {
          size: 13px;
        };
      }
    }

  }
</style>
