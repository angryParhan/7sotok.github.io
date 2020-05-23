export default {
  state: {
    shopItems: [
      {
        id: `f${(~~(Math.random()*1e8)).toString(16)}`,
        title: 'Семена клевера белого',
        description: 'Назначение:декорация ландшафта, выращивание на зеленый корм, сено.',
        price: 299
      },
      {
        id: `f${(~~(Math.random()*1e8)).toString(16)}`,
        title: 'Семена люцерны',
        description: 'Назначение: подходит для сидерации и зеленого корма.',
        price: 85
      },
      {
        id: `f${(~~(Math.random()*1e8)).toString(16)}`,
        title: 'Семена выки яровой',
        description: 'Назначение: выращивание для сена и зеленого корма.',
        price: 70
      },
      {
        id: `f${(~~(Math.random()*1e8)).toString(16)}`,
        title: 'Семена выки яровой',
        description: 'Назначение: выращивание для сена и зеленого корма.',
        price: 90
      },
      {
        id: `f${(~~(Math.random()*1e8)).toString(16)}`,
        title: 'Семена выки яровой',
        description: 'Назначение: выращивание для сена и зеленого корма.',
        price: 100
      },
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
