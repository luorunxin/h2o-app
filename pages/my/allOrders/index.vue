<template>
  <div>
      <div class="allOrdersTop">
        <div @click="back"><van-icon name="arrow-left" size="2rem"/></div>
        <div><van-search v-model="value"  placeholder="请输入搜索关键词" shape="round" /></div>
        <div><van-icon name="ellipsis" size="2rem" /></div>
      </div>
    <div class="allOrdersCenter">

      <van-tabs  v-model="active" animated>

        <van-tab title="全部">
          <div class="ad">广告</div>
          <div class="labelList">
            <div class="commodity" v-for="(item,index) in commodityList" :key="index">
<!--              商品名字-->
              <div class="commodityTitle">
                <div>{{ item.BusinessName }}</div>
                <div>{{ item.WhetherToShip }}</div>
              </div>
<!--              商品数据-->
              <div class="commodityData">
                <div>
                  <img :src="item.productPicture" alt="" width="100%" height="80%" >
                </div>
                <div class="data">
                  <div class="ProductData">{{ item.ProductData }}</div>
                  <div class="NumberOfProducts">{{ item.NumberOfProducts }}</div>
                  <span class="CommodityProtection">{{ item.CommodityProtection }}</span>
                </div>
                <div class="price"><span>￥</span>69.00</div>
              </div>
<!--              运费险-->
              <div class="commodityLogistics">
                <div></div>
                <div>运费险</div>
                <div>{{ item.Returns }}</div>
                <div>{{ item.IssueAnOrder }}</div>
              </div>
<!--              商品价格-->
              <div class="commodityPrice">
                <div></div>
                <div>
                  <span>共{{ item.productNum}}件商品</span>
                  <span>合计:<span>￥</span><span class="sum">{{ item.sum }}</span></span>
                </div>
              </div>
<!--              确认收货-->
              <div class="commodityReceipt">
                <div>{{ item.ExtendedReceipt }}</div>
                <div>{{ item.ViewLogistics }}</div>
                <div>{{ item.ConfirmReceipt }}</div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="待付款">内容 2</van-tab>
        <van-tab title="待发货">内容 3</van-tab>
        <van-tab title="待收货">内容 4</van-tab>
        <van-tab title="待评价">内容 4</van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        value:'',
        active: 1,
        commodityList: [
          {
            //商家名字
            BusinessName:'天亿食品专营店',
            //是否发货
            WhetherToShip: '卖家已发货',
            //商品图片
            productPicture :'https://img.yzcdn.cn/vant/apple-1.jpg',
            //商品介绍
            ProductData: '零食大礼包猪饮料女生一整箱充饥夜宵薯片小吃休闲...',
            //商品数量
            NumberOfProducts: '套餐一共240包,买一箱送一箱,猪饮料',
            //是否有保障
            CommodityProtection: '天猫无忧购',
            //退货
            Returns: '退换可自动理赔',
            //是否出单
            IssueAnOrder: '已出单',
            //多少件商品
            productNum: 1,
            //所有商品价格
            sum: 99,
            //延长收货
            ExtendedReceipt: '延长收货',
            //查看物流
            ViewLogistics: '查看物流',
            //确认收货
            ConfirmReceipt: '确认收货'

          }
        ]
      }
    },
    methods: {
      back() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped lang="scss">
.allOrdersTop {
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 15% 70% 15%;
  background-color: #fff;
  align-items: center;
  justify-items: center;
}
  .allOrdersCenter {
    .ad {
      width: 90%;
      height: 6rem;
      background: #ffcbd5;
      margin: 1rem auto;
      border-radius: 1rem;
    }
    .labelList {
      display: grid;
      grid-template-rows: 15% 50% 10% 10% 15%;
      grid-template-columns: 100%;
      padding: 3%;
      margin: 3%;
      background-color: #fff;
      border-radius: .7rem;
      .commodity {
        .commodityTitle {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          div:nth-child(1) {
            font-size: 1.8rem;
          }
          div:nth-child(2) {
            color: #FF8000;
            font-size: 1.3rem;
          }
        }
        .commodityData {
          display: grid;
          grid-template-rows: 100%;
          grid-template-columns: 30% 50% 20%;
          grid-gap: 0 .3rem;
          margin-bottom: 1rem;
          .price {
            font-size: 1.5rem;
            span {
              font-size: 1rem;
            }
          }
          .data {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .CommodityProtection {
              width: 45%;
              text-align: center;
              color: #FF8000;
              padding: 1%;
              background-color: rgba(255, 128, 0, 0.1);
              border-radius: 3rem;
            }
          }
          .ProductData {
            font-size: 1.2rem;
          }
          .NumberOfProducts {
            font-size: .9rem;
            color: #cccccc;
          }
        }
        .commodityLogistics {
          display: grid;
          grid-template-rows: 100%;
          grid-template-columns: 20% 20% 45% 15%;
          font-size: 1.3rem;
          margin-bottom: 1.5rem;
          div:nth-child(3) {
            color: #cccccc;
          }
          div:nth-child(4) {
            color: #FF8000;

          }
        }
        .commodityPrice {
          display: grid;
          grid-template-rows: 100%;
          grid-template-columns: repeat(2,50%);
          justify-items: right;
          font-size: 1.3rem;
          margin-bottom: 1rem;
          .sum {
            font-size: 2rem;
          }
        }
        .commodityReceipt {
          display: grid;
          grid-template-rows: 80%;
          grid-template-columns: repeat(3,30%);
          justify-content: right;
          justify-items: right;
          align-items: center;
          padding: 3% 0 0 0;
          font-size: 1.3rem;
          div{
            padding: 3% 15%;
            border: 1px solid #cccccc;
            border-radius: 3rem;
          }
          div:last-child {
            color: #FF8000;
            border-color: #FF8000;
          }
        }
      }
    }
  }
</style>
