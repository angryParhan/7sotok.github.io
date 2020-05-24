
// `f${(~~(Math.random()*1e8)).toString(16)}`

export default {
  state: {
    shopItems: [
      {
        id: 'f331a425',
        title: 'Семена клевера белого',
        description: 'Назначение:декорация ландшафта, выращивание на зеленый корм, сено.',
        price: 299
      },
      {
        id: 'f5d40aca',
        title: 'Семена люцерны',
        description: 'Назначение: подходит для сидерации и зеленого корма.',
        price: 85
      },
      {
        id: 'f3b642cf',
        title: 'Семена выки яровой',
        description: 'Назначение: выращивание для сена и зеленого корма.',
        price: 70
      },
      {
        id: 'f4b8b6b2',
        title: 'Семена выки яровой',
        description: 'Назначение: выращивание для сена и зеленого корма.',
        price: 90
      },
      {
        id: 'f4e196f9',
        title: 'Семена выки яровой',
        description: 'Назначение: выращивание для сена и зеленого корма.',
        price: 100
      }
    ]
  },
  mutations: {

  },
  getters: {
    getShopItems (state) {
      return state.shopItems
    }
  }
}
