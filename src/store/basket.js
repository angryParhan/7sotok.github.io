export default {
  state: {
    basketItems: [
      {
        id: 'f331a425',
        title: 'Семена клевера белого',
        description: 'Назначение:декорация ландшафта, выращивание на зеленый корм, сено.',
        price: 299,
        quantity: 10
      },
      {
        id: 'f334a425',
        title: 'Семена клевера белого',
        description: 'Назначение:декорация ландшафта, выращивание на зеленый корм, сено.',
        price: 19,
        quantity: 2
      }
    ]
  },
  mutations: {
    addEllToBasket (state, payload) {
      const idx = state.basketItems.findIndex(c => c.id === payload.id)
      if (idx !== -1) {
        state.basketItems[idx].quantity++
      } else {
        payload.quantity = 1
        state.basketItems.push(payload)
      }
    },
    removeElFromBasket (state, payload) {
      const idx = state.basketItems.findIndex(c => c.id === payload)
      state.basketItems.splice(idx, 1)

      console.log(idx, state.basketItems)
    }
  },
  getters: {
    getBusketItems (state) {
      return state.basketItems
    }
  }
}
