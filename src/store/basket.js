export default {
  state: {
    basketItems: []
  },
  mutations: {
    addEllToBasket (state, payload) {
      payload.price = 20
      state.basketItems.push(payload)
    }
  },
  getters: {
    getBusketItems (state) {
      return state.basketItems
    }
  }
}
