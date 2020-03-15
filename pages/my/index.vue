<template>
  <div class="my">
    <div class="myTop">
      <div class="one">
        <van-icon size="2.5rem" name="comment-o"/>
      </div>
      <div class="two">
        <div class="three">
          <div class="top">189****9809</div>
          <div class="center">再忙,也要记得吃饭哟 ~</div>
          <div class="bottom">
            <van-icon color="red" name="notes-o"/>
            签到领10元红包
          </div>
        </div>
        <div class="four">
        </div>
      </div>
    </div>
    <div class="myCentent">
      <div class="orderDetails">
        <div>我的订单</div>
        <div></div>
        <div>查看全部订单></div>
      </div>
      <div class="DataList">
        <div class="single" v-for="(item,index) in orderInformation" :key="index">
          <div class="orderIcon">
            <van-icon class="icon" color="#ff8000" :name="item.icon" size="2.5rem"/>
            <div class="orderMsg">{{ item.orderMsg }}</div>
          </div>
        </div>
      </div>
      <div class="LogisticsInformation">
        <div class="LogisticsInformationTop">
          <div>最新物流</div>
          <div>03-11</div>
        </div>
        <div class="LogisticsInformationBottom">
          <div class="productPicture">图片</div>
          <div class="LogisticsStatus">
            <div><van-icon name="completed" /> 已发货</div>
            <div>包裹正在等待揽收</div>
          </div>
        </div>
      </div>
    </div>
    <div class="myBottom">
      <div class="toolTop">
        <div>必备工具</div>
        <div>查看全部工具></div>
      </div>
      <div class="toolBottom">
        <div class="toolData" v-for="(item,index) in tool" :key="index">
          <div class="toolIcon"></div>
          <div>{{ item.toolMsg }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LPanelCard from '~/components/l-panel-card'

  export default {
    name: "index",
    components: {
      LPanelCard
    },
    data() {
      return {
        orderInformation: [
          {icon: 'credit-pay', orderMsg: '待付款'},
          {icon:'paid', orderMsg: '待发货'},
          {icon:'logistics',orderMsg: '待收货'},
          {icon: 'records',orderMsg: '评价'},
          {icon: 'balance-pay',orderMsg: '退款/售后'}
        ],
        tool:[
          {img:'',toolMsg:'每日返现'},
          {img:'',toolMsg:'每日返现'},
          {img:'',toolMsg:'每日返现'},
          {img:'',toolMsg:'每日返现'},
          {img:'',toolMsg:'每日返现'},
          {img:'',toolMsg:'每日返现'},
          {img:'',toolMsg:'每日返现'},
          {img:'',toolMsg:'每日返现'},
        ]
      }
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
  .my {
    background-color: #fff;
    .myTop {
      .one {
        text-align: right;
        padding: 3% 3% 0 3%;
      }

      .two {
        display: flex;
        justify-content: space-between;
        padding: 0 3%;
        margin-top: 1rem;

        .three {
          .top {
            font-size: 3rem;
          }

          .center {
            font-size: 1.5rem;
            margin: 1rem 0;
          }

          .bottom {
            display: inline-block;
            font-size: 1.2rem;
            border: .1rem solid #cccccc;
            border-radius: 3.3rem;
            padding: .3rem;
            display: flex;
            align-items: center;
          }
        }

        .four {
          width: 8rem;
          height: 8rem;
          border-radius: 50%;
          background-color: skyblue;
        }
      }
    }
    .myCentent {
      padding: 0 1rem;
      margin-bottom: 1rem;
      .orderDetails {
        display: flex;
        justify-content: space-between;
        padding: 3%;

        div:nth-child(1) {
          font-size: 1.3rem;
          font-weight: 500;
        }

        div:nth-child(2) {
          color: #e0e0e0;
        }
      }
      .DataList {
        /*height: 50%;*/
        display: grid;
        grid-template-columns: repeat(5,20%);
        justify-content: space-between;
        justify-items: center;
        .single {

          .orderIcon {
            display: grid;
            grid-template-rows: repeat(2,50%);
            grid-template-columns: 100%;
            justify-items: center;
            .icon {
              margin-bottom: 1.5rem;
            }
          }

        }
        }
      .LogisticsInformation {
        font-size: 1.1rem;
        background-color: rgba(238, 238, 238, 0.36);
        border-radius: .7rem;
        display: grid;
        grid-template-rows: 30% 70%;
        grid-template-columns: 100%;
        padding: .7rem 0;
        .LogisticsInformationTop {
          display: grid;
          grid-template-rows: 100%;
          grid-template-columns: repeat(2,15%);
          justify-content: space-between;
          padding: 0 1rem;
        }
        .LogisticsInformationBottom {
          display: grid;
          grid-template-rows: 100%;
          grid-template-columns: 20% 80%;
          padding: .7rem 1rem;
          .productPicture {
            width: 5rem;
            height: 5rem;
            background-color: skyblue;
            border-radius: .7rem;
          }
          .LogisticsStatus {
            display: grid;
            grid-template-rows: repeat(2,30%);
            grid-template-columns: 100%;
            align-content: space-between;
            align-items: center;
            div:nth-child(1) {
              color: skyblue;
            }
            div:nth-child(2) {
              color: #a9a9a9;
            }
          }
        }
      }
    }
    .myBottom {
      display: grid;
      grid-template-rows: 20% 80%;
      grid-template-columns: 100%;
      .toolTop {
        display: grid;
        grid-template-rows: 100%;
        grid-template-columns: repeat(2,20%);
        justify-content: space-between;
        align-content: center;
        align-items: center;
        padding: 1rem;
        div:nth-child(1) {
          font-size: 1.5rem;
        }
        div:nth-child(2) {
          color: #cccccc;
        }
      }
      .toolBottom {
        display: grid;
        grid-template-rows: repeat(2,50%);
        grid-template-columns: repeat(4,25%);
        justify-content: space-between;
        justify-items: center;
        .toolData {
          display: grid;
          grid-template-rows: repeat(2,50%);
          grid-template-columns: 100%;
          justify-content: space-between;
          justify-items: center;
          .toolIcon {
            background-color: red;
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            margin-bottom: 2.5rem;
          }
        }
      }
    }
  }
</style>
