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

    </l-shopping-cart-card>
    <van-submit-bar
      :price="sum"
      button-text="提交订单"
      @submit="onSubmit"
    >
      <van-checkbox checked-color="#ff8000" @click="selectAll"  v-model="checked">全选</van-checkbox>
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
        checked: false,
        sum:0,
        datas: [
          {
            id: 1,
            checked: false,
            src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4132984704,2110908246&fm=11&gp=0.jpg',
            title: '测试数据标题',
            price: 199,
            num: 1
          },
          {
            id: 2,
            checked: false,
            src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4132984704,2110908246&fm=11&gp=0.jpg',
            title: '测试数据标题',
            price: 99,
            num: 1
          }
        ],
      }
    },
    mounted() {
      this.on()
    },
    methods: {
      selectAll() {
        this.sum = 0
        for(let i in this.datas){
          if(!this.checked) {
            this.datas[i].checked = true
            this.sum += this.datas[i].price * this.datas[i].num * 100
          }else{
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
        this.countPrice(record)
        let flag = false
        this.datas.forEach(item => {
          if(!item.checked) {
            flag = true
          }
        })
        if(flag) {
          this.checked = false
        }else{
          this.checked = true
        }
      },
      // 点击卡片任意地方（不包括卡片内的按钮）触发
      onShoppingHandle(record) {
        console.log(JSON.stringify(record, null, 2))
      },
      // 点击减号触发
      onSubstrctHandle(record) {
        this.countPrice(record)
      },
      //点击加号触发
      onPlusHandle(record) {
        this.countPrice(record)
      },
      // 循环获取每个选中的总价
      countPrice(record) {
        this.sum = 0
        for(let i in this.datas){
          if(this.datas[i].id == record.id) continue;
          if(this.datas[i].checked) this.sum += this.datas[i].price * this.datas[i].num * 100
        }
        if(record.checked) this.sum += record.price * record.num * 100
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
