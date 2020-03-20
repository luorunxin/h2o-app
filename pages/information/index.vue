<template>
  <div class="infomation">
    <l-header
      :back="false"
      :bgColor="'#f1f1f1'"
      :fixed="false"
      :title="'购物车'"
    >
      <div slot="headerRight" class="manege">管理</div>
    </l-header>
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
    </div>
    <van-submit-bar
      :price="sum"
      button-text="提交订单"
      @submit="onSubmit"
      v-if="isShow"
    >
      <van-checkbox checked-color="#ff8000" @click="selectAll"  v-model="checked">全选</van-checkbox>
    </van-submit-bar>
    <van-submit-bar
      button-text="删除订单"
      @submit="deletes"
      v-else
    >
      <van-checkbox checked-color="#ff8000" @click="selectAll"  v-model="checked">全选</van-checkbox>
      <div class="ss">总计: <span>{{ sun }}</span>件商品</div>
    </van-submit-bar>




  </div>
</template>

<script>
  import LShoppingCartCard from '~/components/l-shopping-cart-card'
  import LHeader from '~/components/l-header'
  export default {
    layout: 'tabbar',
    name: "index",
    components: {
      LShoppingCartCard,
      LHeader
    },
    data() {
      return {
        checked: false,
        sum:0,
        isShow: true,
        sun:0,
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
          },
          {
            id: 3,
            checked: false,
            src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4132984704,2110908246&fm=11&gp=0.jpg',
            title: '测试数据标题',
            price: 99,
            num: 1
          },
          {
            id: 4,
            checked: false,
            src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4132984704,2110908246&fm=11&gp=0.jpg',
            title: '测试数据标题',
            price: 99,
            num: 1
          },
          {
            id: 5,
            checked: false,
            src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4132984704,2110908246&fm=11&gp=0.jpg',
            title: '测试数据标题',
            price: 99,
            num: 1
          },{
            id: 6,
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
      deletes() {
        this.datas=[];
        this.sun = 0;
        Toast.success('删除成功');
      },
      //返回上层
      back() {
        this.$router.go(-1)
      },
      //管理订单
      management() {
        this.isShow = !this.isShow
        // this.sun = this.datas.length
      },
      selectAll() {
        this.sum = 0
        for(let i in this.datas){
          if(!this.checked) {
            this.datas[i].checked = true
            this.sum += this.datas[i].price * this.datas[i].num * 100
            this.sun+=this.datas[i].num
          }else{
            this.datas[i].checked = false
            this.sun-=this.datas[i].num
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
            this.sun+=item.num
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
          if(this.datas[i].checked) {
            this.sum += this.datas[i].price * this.datas[i].num * 100

          }
        }
        if(record.checked) {
          this.sum += record.price * record.num * 100

        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .infomation{
<<<<<<< HEAD
    .ss {
      width: 51.65%;
      text-align: right;
      span {
        color: #ff8000;
        font-size: 2.5rem;
      }
    }
    .infomationTop {
      padding: 3%;
      display: flex;
      justify-content: space-between;
      align-content: center;
      font-size: 1.5rem;
      background-color: #fff;
      div:nth-child(2) {
        color: #ff8000;
      }
    }
    .infomationCenter {
      padding: 3%;
=======
    padding: 0 3%;
    height: calc(100vh - 100px);
    -o-overflow-scrolling: touch;
    -ms-overflow-scrolling: touch;
    -moz-overflow-scrolling: touch;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
    overflow:auto;
    .manege{
      font-size: 1.3rem;
      white-space: nowrap;
>>>>>>> 0d23f12870086ba9524982f4f7bfc4765b52ab14
    }
    .shopping-cart-card{
      margin-bottom: 3%;
    }
    .van-submit-bar{
      bottom: 50px;
    }
  }
</style>
