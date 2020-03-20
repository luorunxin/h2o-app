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
      <l-panel-card
        class="panel-card"
        v-for="(item, index) in panelCardDataList"
        :key="index"
        :record="item.record"
        @onPanelCardHandle="onPanelCardHandle"
      >
        <div class="DataList">
          <div class="single" v-for="(it,ind) in item.buttons" :key="ind">
            <div class="orderIcon">
              <i :class="['iconfont', it.icon]"></i>
              <div class="orderMsg" @click="address">{{ it.text }}</div>
            </div>
          </div>
        </div>
        <!--<div class="LogisticsInformation" v-if="index == 0">-->
          <!--<div class="LogisticsInformationTop">-->
            <!--<div>最新物流</div>-->
            <!--<div>03-11</div>-->
          <!--</div>-->
          <!--<div class="LogisticsInformationBottom">-->
            <!--<div class="productPicture">图片</div>-->
            <!--<div class="LogisticsStatus">-->
              <!--<div><van-icon name="completed" /> 已发货</div>-->
              <!--<div>包裹正在等待揽收</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      </l-panel-card>
    </div>
  </div>
</template>

<script>
  import LPanelCard from '~/components/l-panel-card'

  export default {
    layout: 'tabbar',
    name: "index",
    components: {
      LPanelCard
    },
    data() {
      return {
        panelCardDataList: [
          {
            record: {
              title: '我的订单',
              arrowTitle: '查看全部订单'
            },
            buttons: [
              {icon: 'icon-daifukuan', text: '待付款'},
              {icon:'icon-fahuotixing', text: '待发货'},
              {icon:'icon-daishouhuo',text: '待收货'},
              {icon: 'icon-pingjia',text: '评价'},
              {icon: 'icon-shouhou',text: '退款/售后'}
            ],
          },
          {
            record: {
              title: '必备工具',
              arrowTitle: '查看全部工具'
            },
            buttons:[
              {icon:'icon-dizhi',text:'地址'},
            ]
          }
        ],
      }
    },
    methods: {
      address() {
        this.$router.push({
          path: '/my/address/',
          query: {
            id:'1',
            name: '地址'
          }
        })
      },
      onPanelCardHandle(record) {
        switch (record.title) {
          case '我的订单':
            this.$router.push({
              path:'/my/allOrders'
            })
            break;
          case '必备工具':
            this.$toast('跳转必备工具')
            break;
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .my {
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
      .panel-card{
        margin-top: 5%;
      }
      .DataList {
        /*height: 50%;*/
        display: grid;
        grid-template-columns: repeat(5,20%);
        justify-content: space-between;
        justify-items: center;
        .single {
          .orderIcon {
            display: flex;
            flex-direction: column;
            align-items: center;
            .iconfont {
              color: #ff8000;
              font-size: 2.5rem;
            }
            .orderMsg{
              margin-top: .2rem;
            }
          }
        }
      }
      /*.LogisticsInformation {*/
        /*font-size: 1.1rem;*/
        /*background-color: rgba(238, 238, 238, 0.36);*/
        /*border-radius: .7rem;*/
        /*display: grid;*/
        /*grid-template-rows: 30% 70%;*/
        /*grid-template-columns: 100%;*/
        /*padding: .7rem 0;*/
        /*.LogisticsInformationTop {*/
          /*display: grid;*/
          /*grid-template-rows: 100%;*/
          /*grid-template-columns: repeat(2,15%);*/
          /*justify-content: space-between;*/
          /*padding: 0 1rem;*/
        /*}*/
        /*.LogisticsInformationBottom {*/
          /*display: grid;*/
          /*grid-template-rows: 100%;*/
          /*grid-template-columns: 20% 80%;*/
          /*padding: .7rem 1rem;*/
          /*.productPicture {*/
            /*width: 5rem;*/
            /*height: 5rem;*/
            /*background-color: skyblue;*/
            /*border-radius: .7rem;*/
          /*}*/
          /*.LogisticsStatus {*/
            /*display: grid;*/
            /*grid-template-rows: repeat(2,30%);*/
            /*grid-template-columns: 100%;*/
            /*align-content: space-between;*/
            /*align-items: center;*/
            /*div:nth-child(1) {*/
              /*color: skyblue;*/
            /*}*/
            /*div:nth-child(2) {*/
              /*color: #a9a9a9;*/
            /*}*/
          /*}*/
        /*}*/
      /*}*/
    }
  }
</style>
