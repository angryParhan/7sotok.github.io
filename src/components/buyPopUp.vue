<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click.self="$emit('cancel')">
        <div class="modal-container">
          <h2 class="message">{{ confirmMessage }}</h2>
          <img src="../assets/images/svg/addToBasket.svg" alt="" class="successImg">
          <div class="buttons__block">
            <p class="btn btn_cancel" @click="$emit('cancel')">{{ buttonCancelText }}</p>
            <p class="btn btn_confirm" @click="$emit('confirm')">{{ buttonSuccess }}</p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "modalWindow",
    props: {
      confirmMessage: {
        type: String,
        default: 'Дякуємо, товар додано у корзину'
      },
      buttonCancelText: {
        type: String,
        default: 'Продовжити вибір товарів'
      },
      buttonSuccess: {
        type: String,
        default: 'Оформити замовлення'
      }
    }
  }
</script>

<style scoped lang="scss">
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s ease;
  }
  .modal-wrapper {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-container {
    text-align: center;
    position: relative;
    vertical-align: bottom;
    width: 40%;
    height: 280px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }
  .buttons__block {
    position: absolute;
    bottom: 12%;
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  .message {
    font-family: "Open Sans", Helvetica, arial, sans-serif;
    font-size: 20px;
    text-align: center;
    margin-top: 5%;
    color: #42b983;
  }
  .btn {
    margin: 0;
    cursor: pointer;
    background: white;
    border: 1px solid #6cc164;
    padding: 10px;

  }
  .btn_cancel {
    border: none;
    outline: none;
    color: #22283D;
    font-size: 12px;
    position: relative;
    line-height: 15px;
    vertical-align: middle;

    &:before {
      content: '';
      position: absolute;
      left: -10px;

      top: 8px;
      background-image: url("../assets/images/svg/back.svg");
      background-repeat: no-repeat;
      display: block;
      height: 15px;
      width: 15px;
    }

  }
  .btn_confirm {
    border-color: green;
    color: green;
  }

  .successImg {
    height: 150px;
    width: 150px;
    margin-top: 10px;


  }
  @media all and (max-width: 599px) {
    .modal-container {
      width: 95%;
      height: 250px;
    }
    .message {
      font-size: 17px;
    }
    .btn {
      padding: 6px;
      font-size: 10px;
    }

    .btn_cancel {
      &:before {
        top: 6px;
        left: -11px;
      }
    }
  }
  .modal-enter {
    opacity: 0;
  }
  .modal-leave-active {
    opacity: 0;
  }
  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
