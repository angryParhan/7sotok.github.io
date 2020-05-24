<template>
  <section class="container">
    <p v-if="basketItems.length === 0">Корзина пуста</p>
    <div class="basket-table" v-else>

      <table class="table table-head">
        <tr>

          <th class="source">
            Назва товару
          </th>
          <th class="page-uniqueness">
            Кількість (кг)
          </th>
          <th class="page-uniqueness">
            Ціна (грн/кг)
          </th>
        </tr>
      </table>
      <table class="table table-head">
        <tr v-for="(item, i) in basketItems" :key="i">
          <td class="index">
            {{ item.title }}
          </td>
          <td class="source">
            {{ item.quantity }}
          </td>
          <td class="page-uniqueness">
            {{ item.price }}
          </td>
          <td class="last-check">
            <svg @click="deleteItem(item.id)" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash" class="delete-item svg-inline--fa fa-trash fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#A8B6C7" d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path></svg>
          </td>

        </tr>
      </table>
    </div>

  </section>
</template>

<script>
  export default {
    name: "Basket",
    data () {
      return {
      }
    },
    computed: {
      basketItems () {
        return this.$store.getters.getBusketItems
      }
    },
    methods: {
      deleteItem (id) {
        this.$store.commit('removeElFromBasket', id)
      }
    }
  }
</script>

<style scoped lang="scss">
  .container {
    padding-top: 60px;
    max-width: 1170px;
    margin: 0 auto;
  }

  .delete-item {
    height: 16px;
    width: 16px;
    &:hover path {
      fill: red;
      cursor: pointer;
    }
  }

</style>
