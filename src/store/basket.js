const STORAGE_KEY = 'Basket-storage'

export default {
  state: {
    basketItems: []
  },
  mutations: {
    setState (state) {
      state.basketItems = JSON.parse(localStorage.getItem(STORAGE_KEY) || [])
    },
    addEllToBasket (state, payload) {
      const idx = state.basketItems.findIndex(c => c.id === payload.id)
      if (idx !== -1) {
        state.basketItems[idx].quantity++
      } else {
        payload.quantity = 1
        state.basketItems.push(payload)
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.basketItems))
    },
    removeElFromBasket (state, payload) {
      const idx = state.basketItems.findIndex(c => c.id === payload)
      state.basketItems.splice(idx, 1)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.basketItems))

    },
    plusQuantity (state, payload) {
      const idx = state.basketItems.findIndex(c => c.id === payload)
      state.basketItems[idx].quantity++
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.basketItems))

    },
    minusQuantity (state, payload) {
      const idx = state.basketItems.findIndex(c => c.id === payload)
      if (state.basketItems[idx].quantity > 1) {
        state.basketItems[idx].quantity--
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.basketItems))
      }
    },
    cleanBasket (state) {
      state.basketItems = []
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.basketItems))
    }

  },
  getters: {
    getBusketItems (state) {
      return state.basketItems
    }
  }
}
