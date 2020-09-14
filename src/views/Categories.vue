<template>
  <section class="container">

    <template v-if="showMainCategories">
      <div class="categories">
        <div
            v-for="(item, i) in categoriesItems"
            :key="i"
            class="categories__items"
            :style="{ backgroundImage: `url(${item.img})` }"
            @click="changeCategories(item.value)"
        >
          <h2>{{ item.title }}</h2>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="sub-categories">
        <div class="sub-categories__list">
          <h3>Категорії</h3>
          <ul>

            <li
                v-for="seed in categoriesItems"
                :key="seed.title"
                class="categories__sub-items"
                @click="filterCategories(seed.value)"
                :class="{'categories__sub-items-active' : seed.value === currentCategory}"
            >
              <svg class="list-circle" height="16" width="16" :class="{'list-circle-active' : seed.value === currentCategory}">
                <circle cx="8" cy="8" r="6" stroke="#6cc164" stroke-width="2" fill="#ffffff" />
              </svg>
              <span>{{ seed.title }}</span>
            </li>
          </ul>
        </div>
        <div class="sub-categories__blocks">
          <div
              v-for="(subCategory, i) in subCategories"
              :key="i"
              class="sub-categories__item"
              :style="{ backgroundImage: `url(${subCategory.img})` }"
              @click="goToProducts(subCategory.value)"
          >
            <h4>{{ subCategory.title }}</h4>
          </div>
          <div v-if="subCategories.length === 0" class="sub-categories">Вибачте, товарів данної категорії немає у наявності<br><router-link to="/categories?mode=main_categories">усі категорії</router-link></div>

        </div>

      </div>

    </template>

  </section>
</template>

<script>
  export default {
    name: "Categories",
    data () {
      return {
        showMainCategories: true
      }
    },
    computed: {
      categoriesItems () {
        return this.$store.getters.getCategories
      },
      subCategories () {
        return this.$store.getters.getFilteredSubCategoryList
      },
      currentCategory () {
        return this.$store.getters.getCurrentCategory
      }
    },
    watch: {
      '$route.query.mode': {
        handler (nv) {
          this.checkQuery(nv)
        }
      }
    },
    created () {
      console.log(this.$route.query.mode)
      console.log('cat', this.categoriesItems)
      this.checkQuery(this.$route.query.mode)
    },
    methods: {
      checkQuery (value) {
        this.showMainCategories = value === 'main_categories'
      },
      async changeCategories (id) {
        await this.$store.commit('setCurrentCategory', id)
        console.log(this.currentCategory, this.subCategories)
        this.$router.push({ path: '/categories', query: { mode: 'sub_categories' } })
      },
      filterCategories (id) {
        this.$store.commit('setCurrentCategory', id)
      },
      goToProducts (id) {
        this.$router.push({name: 'Goods', query: {sort_value: id}})
      }
    }

  }
</script>

<style scoped lang="scss">

@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital@0;1&display=swap');



  .container {
    max-width: 1270px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .categories {
    padding-top: 50px;
    display: grid;
    grid-template-columns: repeat(4, 280px);
    grid-gap: 20px;
    font-family: 'IBM Plex Sans', sans-serif;

    &__items {
      height: 280px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
      background-repeat: no-repeat;

      &:before {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.65);
        position: absolute;
      }

      &:hover:before {
        background-color: transparent !important;
        transition: background-color 0.3s ease-in-out;

      }

      &:hover h2 {
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
      }

      h2 {
        color: white;
        position: relative;
        z-index: 1;
        font-weight: bold;
        font-size: 25px;
      }
    }

    &__sub-items {
      margin-bottom: 5px;
      cursor: pointer;

      &-active {
        color: #6cc164;
      }
    }
  }

  .sub-categories {
    padding: 50px 0;
    &__list {
      position: fixed;
      h3 {
        font-size: 25px;
        font-weight: bold;
        color: #22283D;
        margin-bottom: 10px;
      }

      ul {
        li {
          position: relative;
          padding-left: 45px;
          font-size: 25px;
          margin-bottom: 25px;
          user-select: none;

          &:hover {
            circle {
              fill: #6cc164;
            }
            color: #6cc164;
          }
          .list-circle {
            position: absolute;
            left: 13px;
            top: 5px;

            &-active {
              circle {
                fill: #6cc164;
              }
            }
          }
        }
      }
    }

    &__blocks {
      margin-left: 109px;
      width: 100%;
      display: grid;
      grid-template-columns: repeat(3, 200px);
      grid-gap: 10%;
      font-family: 'IBM Plex Sans', sans-serif;
      justify-content: center;
    }

    &__item {
      width: 200px;
      height: 240px;
      background-repeat: no-repeat;
      background-size: 200px 200px;
      cursor: pointer;
      border: 3px solid #ffffff;
      border-radius: 15px;
      text-align: center;
      position: relative;

      h4 {
        position: absolute;
        bottom: 10px;
        width: 100%;
      }

      &:hover {
        border: 3px solid #6cc164;
      }
    }
  }


  @media all and (max-width: 1060px) {
    .sub-categories {
      &__list {
        display: none;
      }

      &__blocks {
        margin-left: 0;
      }
    }


  }


  @media all and (max-width: 1200px) {
    .categories {
      grid-template-columns: repeat(3, 280px);
      justify-content: center;

    }
  }

  @media all and (max-width: 880px) {
    .categories {
      grid-template-columns: repeat(2, 280px);
      justify-content: center;
    }

    .sub-categories {
      &__blocks {
        grid-template-columns: repeat(2, 200px);
      }
    }
  }

  @media all and (max-width:360px) {
    .sub-categories {
      &__blocks {
        grid-template-columns: repeat(1, 200px);
      }
    }
  }

  @media all and (max-width: 599px) {
    .categories {
      grid-template-columns: repeat(1, 250px);
      justify-content: center;

    }
    .sub-categories {
      &__blocks {
        grid-gap: 2%;
      }

      &__item {
        &:hover {
          border: 3px solid transparent;
        }
      }
    }
  }

</style>
