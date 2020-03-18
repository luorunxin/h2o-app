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
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img :src="image" width="100%" height="35%" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="price">
<!--      详细价格-->
      <div class="DetailedPrice">
        <div><span>￥</span>938-1999</div>
        <div>价格￥<span>938.01</span>起</div>
      </div>
<!--      商品卷-->
      <div class="CommodityRoll">
        <div class="bg">商品卷满1199减100</div>
        <div class="bg">购买得积分</div>
        <div></div>
        <div>领卷></div>
      </div>
<!--      商品名字-->
      <div class="ProductName">
        <div>享三期免息,可免20.7元,每期299.7元(每日10元)</div>
        <div>领100元卷分期免息新品128g华为honor/荣耀 荣耀8x手机</div>
      </div>
      <div class="Delivery">
        <div class="ship">
          <div>发货</div>
          <div><van-icon name="location-o" />广东深圳</div>

          <div>快递:0.00</div>

          <div>月销444</div>
        </div>
      </div>
<!--      赔偿保障相关-->
      <div class="Guarantee">
        <div>保障</div>
        <div><span>假一赔四</span><span>免举证退换货</span><span>全国联保</span><span>延保服务</span></div>
        <div><van-icon name="arrow" /></div>
      </div>
      <div class="ProductSelection">
        <div class="ProductSelectionTop">
          <div>选择</div>
          <div>配送至:孝南区书院街街道,选择 机身颜色...</div>
          <div><van-icon name="arrow" /></div>
        </div>
        <div class="ProductSelectionCenter">
          <div>
            <img src="https://img.yzcdn.cn/vant/apple-1.jpg" alt="" width="15%" height="15%">
            <img src="https://img.yzcdn.cn/vant/apple-1.jpg" alt="" width="15%" height="15%">
            <img src="https://img.yzcdn.cn/vant/apple-1.jpg" alt="" width="15%" height="15%">
            <img src="https://img.yzcdn.cn/vant/apple-1.jpg" alt="" width="15%" height="15%">
            <img src="https://img.yzcdn.cn/vant/apple-1.jpg" alt="" width="15%" height="15%">
            <img src="https://img.yzcdn.cn/vant/apple-1.jpg" alt="" width="15%" height="15%">
          </div>
          <div>
            9种颜色可以选择
          </div>
        </div>
        <div class="ProductSelectionBottom">
          <div>参数</div>
          <div>是否支持红外 网络类型...</div>
          <div><van-icon name="arrow" /></div>
        </div>
      </div>
      <div class="comment">
        <div class="commentTop">
          <div>
            <div>宝贝评价(11143)</div>
            <div>查看全部<van-icon name="arrow" /></div>
          </div>
          <div class="ProductCharacteristics"><span>手机不错(85564)</span><span>性能强劲(564)</span><span>款式漂亮(432)</span></div>
          <div class="userAppraisal">
            <div class="user">
              <div class="userIcon"></div>
              <div class="userName">t**3</div>
            </div>
            <div class="userComments">这玩意真j8好,我还要买买买我asdfasdsdfgsfdgsdfgdssdfasdfasdfasdf</div>
          </div>
        </div>
        <div class="commentCenter">
          <div class="Buyer">
            <div>洋淘买家秀(24)</div>
            <div>查看全部<van-icon name="arrow" /></div>
          </div>
          <div class="BuyerImg">
            <img src="https://img.yzcdn.cn/vant/apple-1.jpg" alt="" width="20%" height="30%">
            <img src="https://img.yzcdn.cn/vant/apple-1.jpg" alt="" width="20%" height="30%">
            <img src="https://img.yzcdn.cn/vant/apple-1.jpg" alt="" width="20%" height="30%">
            <img src="https://img.yzcdn.cn/vant/apple-1.jpg" alt="" width="20%" height="30%">
          </div>
        </div>
        <div class="commentBottom">
          <div class="ask">
            <div >问大家(234)</div>
            <div>查看全部<van-icon name="arrow" /></div>
          </div>
          <div class="askUser">
            <div><span>这个东村怎么样,好不好用啊,多少钱啊</span><span>2个回答</span></div>
            <div><span>这东西怎么样,是正品吗,你们多少钱买的啊</span><span>4个回答</span></div>
          </div>
        </div>
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
        msg:'',
        images: [
          'https://img.yzcdn.cn/vant/apple-1.jpg',
          'https://img.yzcdn.cn/vant/apple-2.jpg'
        ],
      }
    },
    methods: {
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
    created() {
      this.msg = this.$route.query.msg;
      console.log(this.msg)
    }
  }
</script>

<style scoped lang="scss">
.details {
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
</style>
