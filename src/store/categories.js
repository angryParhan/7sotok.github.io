export default {
  state: {
    currentCategory: 'all_seeds',
    categories: [
      {
        title: 'Все насіння',
        value: 'all_seeds',
        img: require('../assets/images/jpeg/vegetables.jpeg')
      },
      {
        title: 'Насіння овочів',
        value: 'vegetables_seeds',
        img: require('../assets/images/jpeg/vegetables.jpeg')
      },
      {
        title: 'Насіння фруктів',
        value: 'fruits_seeds',
        img: require('../assets/images/jpeg/vegetables.jpeg')
      },
      {
        title: 'Насіння грибів',
        value: 'mashrooms_seeds',
        img: require('../assets/images/jpeg/vegetables.jpeg')
      },
      {
        title: 'Насіння дерев',
        value: 'tree_seeds',
        img: require('../assets/images/jpeg/vegetables.jpeg')
      },
      {
        title: 'Насіння кущів',
        value: 'shrub_seeds',
        img: require('../assets/images/jpeg/vegetables.jpeg')
      },
    ],
    subCategories: [
      {
        title: 'Яблука',
        value: 'currant_seeds',
        parentsCategories: ['tree_seeds'],
        img: require('../assets/images/png/categories/ex-1.png')
      },
      {
        title: 'Груші',
        value: 'pears_seeds',
        parentsCategories: ['tree_seeds'],
        img: require('../assets/images/png/categories/ex-2.png')
      },
      {
        title: 'Вишні',
        value: 'cucamber_seeds',
        parentsCategories: ['tree_seeds'],
        img: require('../assets/images/png/categories/ex-3.png')
      },
      {
        title: 'Черешні',
        value: 'cucamber_seeds',
        parentsCategories: ['tree_seeds'],
        img: require('../assets/images/png/categories/ex-1.png')
      },
      {
        title: 'Лісні',
        value: 'forest_mashrooms_seeds',
        parentsCategories: ['mashrooms_seeds'],
        img: require('../assets/images/png/categories/ex-2.png')
      },
      {
        title: 'Тепличні',
        value: 'forest_mashrooms_seeds',
        parentsCategories: ['mashrooms_seeds'],
        img: require('../assets/images/png/categories/ex-3.png')
      },
      {
        title: 'Капуста',
        value: 'cabbage_seeds',
        parentsCategories: ['vegetables_seeds'],
        img: require('../assets/images/png/categories/ex-1.png')
      },
      {
        title: 'Огірок',
        value: 'cucamber_seeds',
        parentsCategories: ['vegetables_seeds'],
        img: require('../assets/images/png/categories/ex-2.png')
      },
      {
        title: 'Помідор',
        value: 'tomatos_seeds',
        parentsCategories: ['vegetables_seeds'],
        img: require('../assets/images/png/categories/ex-3.png')
      },
      {
        title: 'Базилік',
        value: 'basil_seeds',
        parentsCategories: ['vegetables_seeds'],
        img: require('../assets/images/png/categories/ex-1.png')
      },

    ]
  },
  mutations: {
    setCurrentCategory (state, category) {
      state.currentCategory = category
    }
  },
  getters: {
    getCategories (state) {
      return state.categories
    },
    getCurrentCategory (state) {
      return state.currentCategory
    },
    getFilteredSubCategoryList (state) {
      if (state.currentCategory === 'all_seeds') {
        return state.subCategories
      } else {
        return state.subCategories.filter(el => el.parentsCategories.includes(state.currentCategory))
      }
    }
  }
}
