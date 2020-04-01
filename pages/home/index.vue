<template>
<div class="container">
  <div class="homeTop">
    <div class="Positioning">
      <div class="PositioningIcon">
        <van-icon size="2rem" color="#ff8000" name="location" />
        <h2>{{location}}</h2>
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
            <!--<l-label class="label" :label="item.label" />-->
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
            <!--<l-label class="label" :label="item.label" />-->
          </l-card>
        </div>
      </div>
    </l-refresh>
    <l-loading-more
      :loadingMore="loadingMore"
      :finish="finish"
      :nomore="nomore"
      @onBottom="onLoadingMore"
    />
  </div>
</div>
</template>

<script>
  import LRefresh from '~/components/l-refresh'
  import LCard from '~/components/l-card'
  import LLabel from '~/components/l-label'
  import LLoadingMore from '~/components/l-loading-more'
  import Storage from '~/utils/storage.js'
  export default {
    layout: 'tabbar',
    name: "index",
    components: {
      LRefresh,
      LCard,
      LLabel,
      LLoadingMore
    },
    data() {
      return {
        list: [],
        page: 1,
        size: 10,
        loadingMore: true,
        finish: false,
        nomore: false,
        location: null,
      }
    },
    mounted() {
      let location_info = Storage.getLocal('location')
      if(location_info.addressComponent){
        this.location = location_info.addressComponent.province+location_info.addressComponent.city
      }else{
        this.location = location_info.province + location_info.city
      }
      this.getGoodsList()
    },
    methods: {
      onLoadingMore() {
        this.loadingMore = true
        this.page+=1
        this.getGoodsList()
      },
      getGoodsList() {
        let params = {
          page: this.page,
          size: this.size
        }
        this.$ajax('/goodsList', JSON.stringify(params)).then(res => {
          if(res.status == 200){
            this.list = this.list.concat(res.result)
            this.loadingMore = false
            if(res.result.length<this.size){
              this.nomore = true
            }else{
              this.nomore = false
            }
          }else{
            this.$toast.fail(res.message)
          }
        }).catch(err => {
          console.error(err)
        })
      },
      onCardHandle(record) {
        this.$router.push({path:'/home/Details',query:{
          id:record.id
          }})
      },
      refresh() {
        let _that = this;
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
