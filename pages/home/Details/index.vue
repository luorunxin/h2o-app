<template>
  <div class="details">
    <div class="detailsTop">
      <div @click="back"><van-icon name="arrow-left" /></div>
      <div><van-search shape="round" background="#f1f1f1" v-model="value" placeholder="请输入搜索关键词" /></div>
      <div><van-icon name="star-o" /></div>
      <div><van-icon name="cart-o" /></div>
      <div><van-icon name="ellipsis" /></div>
    </div>
    <div class="swipe">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item, index) in GoodsList.images" :key="index">
          <img :src="item.src" width="100%" height="35%" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="price">
<!--      详细价格-->
      <div class="DetailedPrice">
        <div><span>￥</span>{{ GoodsList.price }}</div>
      </div>

      <div class="ProductName">
        <div class="title">{{ GoodsList.title }}</div>
      </div>
      <div class="Delivery">
        <div class="ship">
          <div>发货</div>
          <div><van-icon name="location-o" />{{GoodsList.ship_address}}</div>

          <div>快递:{{GoodsList.courier_fees}}</div>

          <div>月销{{GoodsList.monthly_sales}}</div>
        </div>
      </div>
      <div >
        <van-cell is-link @click="showPopup1">详情</van-cell>

        <van-popup v-model="show1" position="bottom" class="max">
          <div v-for="(item,index) in GoodsList.type" :key="index"  class="sex">
            <div><span>性别:</span><van-tag class="sss" plain >{{item.gender | ss}}</van-tag></div>
            <div><span>类型:</span><van-tag class="sss" plain >{{item.category_id | sss}}:</van-tag></div>
            <div><span>部位:</span><van-tag class="sss" plain type="primary">{{item.part_id | ssss}}</van-tag></div>
          </div>
          <div v-for="(item,index) in GoodsList.amounts" :key="index" class="aa">
            <span>尺码:</span><van-tag class="ss" plain type="primary">{{item.amount}}</van-tag>
            <span>颜色:</span><van-tag class="ss" plain type="success">{{item.color}}</van-tag>
            <span>型号:</span><van-tag class="ss" plain type="danger">{{item.size}}</van-tag>
          </div>
        </van-popup>
      </div>
      <div>
        <!-- 优惠券单元格 -->
        <van-cell is-link @click="showPopup" >参数</van-cell>
        <van-popup v-model="show"  position="bottom">
          <div class="center">
            <div class="title">产品参数</div>
            <div v-for="(item,index) in parameters" :key="index" class="box">
              <div class="name">{{item.key}}</div>
              <div class="nameData">{{item.value}}</div>
            </div>
          </div>
        </van-popup>
      </div>
      <div class="comment">
      </div>
      <div class="Shopping">
        <van-goods-action>
          <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon" />
          <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickIcon" />
          <van-goods-action-button type="warning" text="加入购物车" @click="onClickButton" />
          <van-goods-action-button type="danger" text="立即购买" @click="onClickButton" />
        </van-goods-action>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        //商品id
        id:null,
        GoodsList:{},
        show: false,
        show1: false,
        parameters:[]
      }
    },
    filters: {
      ss(value) {
        return value==1?'男士':'女'
      },
      sss(value) {
        return value==1001?'服装':''
      },
      ssss(value) {
        return value==10011?'上衣':''
      },
    },
    methods: {
      getParameters(val) {
        let arr = []
        if(val.indexOf(';') != -1){
          val.split(';').forEach(item => {
            let obj = {}
            obj.key = item.split(':')[0]
            obj.value = item.split(':')[1]
            arr.push(obj)
          })
        }else{
          let obj = {}
          obj.key = val.split(':')[0]
          obj.value = val.split(':')[1]
          arr.push(obj)
        }
        return arr
      },
      showPopup() {
        this.show = true;
      },
      showPopup1() {
        this.show1 = true;
      },
      onClickIcon() {
        Toast('点击图标');
      },
      onClickButton() {
        Toast('点击按钮');
      },
      back() {
        this.$router.go(-1)
      }
    },
    mounted() {

      this.id = this.$route.query.id;
      console.log(this.id)
      this.$ajax('/getGoodsById',JSON.stringify({id:this.id})).then(res=>{
        console.log(res)
        this.GoodsList = {...res.result}
        console.log(this.GoodsList)
        this.parameters = this.getParameters(this.GoodsList.parameter)

      }).catch(err=>{
        console.log(err)
      })
    },
  }
</script>

<style scoped lang="scss">
.details {
  .parameter {
    display: flex;
    justify-content: space-between;
    font-size: 1.1rem;
    padding: 3%;
    color: #cccccc;
  }
  .ParameterDetails {
    z-index: 999;
    background-color: #fff;
    height: 100vh;
  }
  .sex {
    padding: 3%;
    font-size: 1.5rem;
    display: flex;
    justify-content: left;
    span {
      margin-right: .5rem;
    }
    .sss {
      font-size: 1.4rem;
    }
    div {
      margin-right: 1rem;
    }
    div:nth-child(3) {
      margin-left: 4rem;
    }
  }
  .aa {
    padding: 3%;
    span {
      font-size: 1.4rem;
      margin-right: 1rem;
    }
    .ss {
      width: 50px;
      height: 30px;
      font-size: 1.3rem;
    }
  }
  .center {
    font-size: 1.5rem;
    text-align: center;
    height: 50vh;
    .title {
      grid-row-start: 1;
      grid-row-end: 2;
      grid-column-start: 3;
      grid-column-end: 4;
    }
    .box {
      padding: 3%;
      display: flex;
      justify-content: left;
      div {
        margin-right: 2rem;
      }
    }
  }
  .detailsTop {
    display: grid;
    grid-template-rows: 100%;
    grid-template-columns: 1fr 5fr 1fr 1fr 1fr;
    align-items: center;
    justify-items: center;
    padding: 3%;
    font-size: 2rem;
    position: sticky;
    top: 0;
    z-index: 999;
    background-color: #f1f1f1;
  }
  .price {
    padding: 3%;
    background-color: #fff;
    .DetailedPrice {
      display: grid;
      grid-template-rows: 100%;
      grid-template-columns: 35% 65%;
      align-items: end;
      div:nth-child(1) {
        color: #FF8000;
        font-size: 2.2rem;
        span:nth-child(1) {
          font-size: 1.3rem;
        }
      }
      div:nth-child(2) {
        color: #cccccc;
        font-size: 1.2rem;
        span {
          text-decoration: line-through;
        }
      }
    }
    .CommodityRoll {
      display: grid;
      grid-template-rows: 100%;
      grid-template-columns: 35% 35% 20% 10%;
      font-size: 1.3rem;
      justify-items: center;
      align-items: center;
      color: rgb(255, 128, 0);
      margin-bottom: 5%;
      .bg {
        background-color: rgba(255, 128, 0, 0.21);
        border-radius: .3rem;
      }
    }
    .ProductName {
      .title {
        font-size: 2rem;
      }
      div:nth-child(1) {
        color: #FF8000;
        margin-bottom: 2%;
        font-size: 1.3rem;
      }
      div:nth-child(2) {
        font-size: 1.5rem;
      }
    }
    .Delivery {
      .ship {
        display: flex;
        justify-content: space-between;
        font-size: 1.2rem;
        padding: 3%;
        margin-bottom: 1rem;
        div:nth-child(1) {
          color: #cccccc;
        }
        div:nth-child(4) {
          color: #cccccc;
        }
      }
    }
    .Guarantee {
      display: grid;
      grid-template-rows: 100%;
      grid-template-columns: 10% 80% 10%;
      justify-items: center;
      font-size: 1.2rem;
      margin-bottom: 2rem;
      div:nth-child(1) {
        color: #cccccc;
      }
      div:nth-child(2) {
        span {
          margin: 0 .3rem;
        }
      }
      div:nth-child(3) {
        color: #cccccc;
      }
    }
    .ProductSelection {
      .ProductSelectionTop {
        display: grid;
        grid-template-rows: 100%;
        grid-template-columns: 10% 80% 10%;
        justify-items: center;
        font-size: 1.2rem;
        margin-bottom: 2rem;
        div:nth-child(1) {
          color: #cccccc;
        }
        div:nth-child(3) {
          color: #cccccc;
        }
      }
      .ProductSelectionCenter {
        display: grid;
        grid-template-rows: 100%;
        grid-template-columns: 70% 30%;
        justify-items: center;
        align-items: center;
        margin-bottom: 1.5rem;
        div:nth-child(2) {
          background-color: rgba(204, 204, 204, 0.29);
          padding: 3%;
          border-radius: .3rem;
          font-size: 1.2rem;
        }
      }
      .ProductSelectionBottom {
        display: grid;
        grid-template-rows: 100%;
        grid-template-columns: 10% 80% 10%;
        font-size: 1.2rem;
        div:nth-child(1) {
          color: #cccccc;
        }
        div:nth-child(3) {
          color: #cccccc;
        }
      }
    }
    .comment {
      .commentTop {
        div:nth-child(1) {
          padding: 3% 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1.3rem;
          div:nth-child(2) {
            color: #FF8000;
          }
        }
        .ProductCharacteristics {
          span {
            padding: 2%;
            background-color: rgba(255, 128, 0, 0.14);
            margin-right: 1rem;
            border-radius: 1.5rem;
          }
        }
        .userAppraisal {
          padding: 3%;
          display: grid;
          grid-template-rows: 30% 70%;
          grid-template-columns: 100%;
          justify-items: start;
          align-items: center;
          margin-top: 3rem;
          border-bottom: 1px solid rgba(204, 204, 204, 0.11);
          .user {
            display: grid;
            grid-template-rows: 100%;
            grid-template-columns: repeat(2,25%);
            .userIcon {
              width: 3rem;
              height: 3rem;
              background-color: #7d89ff;
              border-radius: 50%;
            }
          }
          .userComments {
            white-space: normal;
            font-size: 1.3rem;

          }
        }
      }
      .commentCenter {
        margin-top: 1rem;
        margin-bottom: 1.5rem;
        .Buyer {
          display: flex;
          justify-content: space-between;
          font-size: 1.3rem;
          margin-bottom: 1rem;
          div:nth-child(2) {
            color: #FF8000;
          }
        }
        .BuyerImg {
          img {
            margin-right: .5rem;
          }
        }
      }
      .commentBottom {
        .ask {
          display: flex;
          justify-content: space-between;
          font-size: 1.2rem;
          margin-bottom: 1.5rem;
          div:nth-child(2) {
            color: #FF8000;
          }
        }
        .askUser {
          display: grid;
          grid-template-columns: 100%;
          grid-template-rows: repeat(2,50%);
          font-size: 1.1rem;
          div:nth-child(1),div:nth-child(2) {
            display: flex;
            justify-content: space-between;
            margin-bottom: 1rem;
            span:nth-child(2) {
              color: #cccccc;
            }
          }
        }
      }
    }
  }
}
  .max {
    max-height: 40vh;
  }
</style>
