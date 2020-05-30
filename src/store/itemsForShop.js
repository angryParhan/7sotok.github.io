
// `f${(~~(Math.random()*1e8)).toString(16)}`


export default {
  state: {

    shopItems: [
      {
        id: 'f331a425',
        title: 'НАСІННЯ КОНЮШИНИ БІЛОЇ',
        description: 'декорація ландшафту, вирощування на зелений корм та сіно.',
        price: 299,
        img: require('../assets/images/jpeg/kleverbeluj.jpg')
      },
      {
        id: 'f5d40aca',
        title: 'НАСІНЯ ЛЮЦЕРНИ',
        description: 'рослина для сидерації, вирощування на зелений корм та сіно.',
        price: 85,
        img: require('../assets/images/jpeg/lucerna.jpg')

      },
      {
        id: 'f3b642cf',
        title: 'НАСІННЯ ВИКИ ЯРОЇ',
        description: 'вирощування на сіно та зелений корм.',
        price: 20,
        img: require('../assets/images/jpeg/vukajarova.jpg')

      },
      {
        id: 'f4b8b6b2',
        title: 'НАСІННЯ КОНЮШИНИ ЧЕРВОНОЇ',
        description: 'рослина для медоносності та ґрунту, вирощування на сіно та зелений корм.',
        price: 75,
        img: require('../assets/images/jpeg/kleverkrasnuj.jpg')

      },
      {
        id: 'f4e196f9',
        title: 'НАСІННЯ РАЙГРАСУ ГАЗОННОГО',
        description: 'рослина для газону, сидерації, зеленого корму',
        price: 65,
        img: require('../assets/images/jpeg/rajgras.jpg')
      },
      {
        id: 'f4f103g9',
        title: 'НАСІННЯ ГІРЧИЦІ ЖОВТОЇ',
        description: 'рослина для боротьби із бур’янами та удобрювання ґрунту, вирощування на зелений корм та сіно.',
        price: 20,
        img: require('../assets/images/jpeg/girczucia.jpg')
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
