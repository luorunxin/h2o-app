<template>
  <div class="infomation">
    <l-shopping-cart-card
      class="shopping-cart-card"
      v-for="(item, index) in datas"
      :key="index"
      :record="item"
      @onChangeCheck="onChangeCheck"
      @onShoppingHandle="onShoppingHandle"
      @onSubstrctHandle="onSubstrctHandle"
      @onPlusHandle="onPlusHandle"
    >
      <div v-if="index%2 == 0" style="font-size: 1.5rem;color: dodgerblue;">
        这里可以支持插槽，你可以随便放数据
      </div>
    </l-shopping-cart-card>
  </div>
</template>

<script>
  import LShoppingCartCard from '~/components/l-shopping-cart-card'
  export default {
    layout: 'tabbar',
    name: "index",
    components: {
      LShoppingCartCard
    },
    data() {
      return {
        datas: [
          {
            checked: false,
            src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4132984704,2110908246&fm=11&gp=0.jpg',
            title: '测试数据标题',
            price: 199.99,
            num: 1
          },
          {
            checked: true,
            src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4132984704,2110908246&fm=11&gp=0.jpg',
            title: '测试数据标题',
            price: 199.99,
            num: 99
          }
        ]
      }
    },
    methods: {
      // 点击复选框触发
      onChangeCheck(record) {
        console.log(JSON.stringify(record, null, 2))
      },
      // 点击卡片任意地方（不包括卡片内的按钮）触发
      onShoppingHandle(record) {
        console.log(JSON.stringify(record, null, 2))
      },
      // 点击减号触发
      onSubstrctHandle(record) {
        console.log(JSON.stringify(record, null, 2))
      },
      //点击加号触发
      onPlusHandle(record) {
        console.log(JSON.stringify(record, null, 2))
      }
    }
  }
</script>

<style lang="scss" scoped>
  .infomation{
    padding: 3%;
    .shopping-cart-card{
      margin-bottom: 3%;
    }
  }
</style>
