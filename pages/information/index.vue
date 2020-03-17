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
    <van-submit-bar
      :price="sumAll"
      button-text="提交订单"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checked" checked-color="#ff8000" @click="selectAll">全选</van-checkbox>
    </van-submit-bar>
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
            checked: true,
            src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4132984704,2110908246&fm=11&gp=0.jpg',
            title: '测试数据标题',
            price: 199,
            num: 1
          },
          {
            checked: false,
            src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4132984704,2110908246&fm=11&gp=0.jpg',
            title: '测试数据标题',
            price: 199,
            num: 1
          }
        ],
        checked: true,
        sum:null,
        sumAll:0
      }
    },
    mounted() {
      this.on()
    },
    methods: {
      selectAll() {
        if (!this.checked) {
          for (let i=0;i<this.datas.length;i++) {
            this.datas[i].checked = true
          }
        } else {
          for (let i=0;i<this.datas.length;i++) {
            this.datas[i].checked = false
          }
        }
      },
      onSubmit() {
        console.log('我是提交')
      },
      on() {
        for (let i=0;i<this.datas.length;i++) {
          if (!this.datas[i].checked) {
            return this.checked = false
          }
        }
      },
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
