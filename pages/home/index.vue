<template>
<div class="container">
  <div class="homeTop">
    <div class="Positioning">
      <div class="PositioningIcon">
        <van-icon size="2rem" color="#ff8000" name="location" />
        <h2>湖北省孝感市</h2>
      </div>
      <div>
        <van-icon size="2rem" name="scan" />
        <van-icon size="2rem" name="comment-o" class="ad1"/>
      </div>
    </div>
    <div class="search">
      <van-search shape="round" placeholder="请输入搜索关键词" />
    </div>
    <div class="Jiugongge">
      <van-grid>
        <van-grid-item icon="photo-o" text="美食" />
        <van-grid-item icon="photo-o" text="商超便利" />
        <van-grid-item icon="photo-o" text="水果" />
        <van-grid-item icon="photo-o" text="送药上门" />
      </van-grid>
    </div>
    <div class="ad">
      <div>
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item>1</van-swipe-item>
          <van-swipe-item>2</van-swipe-item>
          <van-swipe-item>3</van-swipe-item>
          <van-swipe-item>4</van-swipe-item>
        </van-swipe>
      </div>
    </div>
  </div>
  <div class="page">
    <l-refresh
      ref="refresh"
      @refresh="refresh"
    >
      <div class="container">
        <div class="container-left">
          <l-card
            class="card"
            v-for="(item, index) in list"
            v-if="index%2 == 0"
            :key="index"
            :record="item"
            @onCardHandle="onCardHandle"
          >
            <l-label class="label" :label="item.label" />
          </l-card>
        </div>
        <div class="container-right">
          <l-card
            class="card"
            v-for="(item, index) in list"
            v-if="index%2 != 0"
            :key="index"
            :record="item"
            @onCardHandle="onCardHandle"
          >
            <l-label class="label" :label="item.label" />
          </l-card>
        </div>
      </div>
    </l-refresh>
  </div>
</div>
</template>

<script>
  import LRefresh from '~/components/l-refresh'
  import LCard from '~/components/l-card'
  import LLabel from '~/components/l-label'
  export default {
    layout: 'tabbar',
    name: "index",
    components: {
      LRefresh,
      LCard,
      LLabel
    },
    data() {
      return {
        list: [
          {
            src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584191214702&di=d330763a4c2d9173eaac684f3e4ea392&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F68%2F61%2F300000839764127060614318218_950.jpg',
            title: '憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨',
            price: 1000,
            paymentNum: 10000,
            label: '产地:罗家巷子'
          },
          {
            src: '',
            title: '憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨',
            price: 100,
            paymentNum: 10000,
            label: '产地:罗家巷子'
          },
          {
            src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584191214702&di=d330763a4c2d9173eaac684f3e4ea392&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F68%2F61%2F300000839764127060614318218_950.jpg',
            title: '憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨',
            price: 1000,
            paymentNum: 10000,
            label: '产地:罗家巷子'
          },
          {
            src: '',
            title: '憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨',
            price: 100,
            paymentNum: 10000,
            label: '产地:罗家巷子'
          }
        ]
      }
    },
    methods: {
      onCardHandle(record) {
        console.log(record)
      },
      refresh() {
        let _that = this
        setTimeout(() => {
          _that.$refs['refresh'].refreshComplete()
        }, 2000)
      }
    }
  }
</script>

<style scoped lang="scss">
.Positioning {
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 80% 20%;
  padding: 1rem 0.5rem;
  div:nth-child(2) {
    .ad1{
      color: red;
      margin-left: 2rem;
    }
  }
  .PositioningIcon {
    display: grid;
    grid-template-rows: 100%;
    grid-template-columns: 10% 90%;
  }
}
  .ad {
    padding: 3%;
    .my-swipe .van-swipe-item {
      color: #fff;
      font-size: 20px;
      line-height: 150px;
      text-align: center;
      background-color: #39a9ed;
    }
  }
  .page {
    .container{
      display: flex;
      padding: .2rem 3% 3%;
      justify-content: space-between;
      .container-left, .container-right{
        width: 48.5%;
      }
      .card{
        margin-bottom: 5%;
      }
      .label{
        margin-top: .5rem;
      }
    }
  }
  .search {
    position: sticky;
    top: 0;
    z-index: 999;
  }
</style>
