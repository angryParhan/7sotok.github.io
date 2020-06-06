import Vue from 'vue'
import Vuex from 'vuex'
import basket from './basket'
import shopItems from './itemsForShop'
import feedbacks from './feedbacks'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    basket,
    shopItems,
    feedbacks
  }
})
