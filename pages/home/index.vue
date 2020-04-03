<template>
<div class="container">
  <l-search
    v-show="showSearch"
    @onCancel="onCancel"
  />
  <div>
    <div class="homeTop">
      <div class="Positioning">
        <div class="PositioningIcon">
          <van-icon size="2rem" color="#ff8000" name="location" />
          <h2>{{location}}</h2>
        </div>
        <div>
          <!--<van-icon size="2rem" name="scan" />-->
          <van-icon size="2rem" color="#ff8000" name="bell" />
        </div>
      </div>
      <div class="search">
        <van-search input-align="center" shape="round" placeholder="请输入搜索关键词" @click="searchData"/>
      </div>
      <div class="Jiugongge">
        <van-grid :border="false" :column-num="navs.length<4?navs.length:4">
          <van-grid-item
            v-for="(item,index) in navs"
            :key="index"
            :text="item.text"
            @click="toSingleClsaa(item)"
          >
            <i slot="icon" :class="['iconfont', item.icon]"></i>
          </van-grid-item>
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
</div>
</template>

<script>
  import LRefresh from '~/components/l-refresh'
  import LCard from '~/components/l-card'
  import LLabel from '~/components/l-label'
  import LLoadingMore from '~/components/l-loading-more'
  import Storage from '~/utils/storage.js'
  import LSearch from "~/components/l-search/src/lSearch";
  export default {
    layout: 'tabbar',
    name: "index",
    components: {
      LSearch,
      LRefresh,
      LCard,
      LLabel,
      LLoadingMore
    },
    data() {
      return {
        showSearch: false,
        list: [],
        page: 1,
        size: 10,
        loadingMore: true,
        finish: false,
        nomore: false,
        location: null,
        navs:[
          {
            text:'男装',
            icon: 'icon-nanzhuang',
            category_id: 1001,
            gender: 1
          },
          {
            text:'女装',
            icon: 'icon-nvzhuang',
            category_id: 1001,
            gender: 2
          },
          {
            text:'鞋子',
            icon: 'icon-xiezi',
            category_id: 1001,
            part_id: 10012
          }
        ]
      }
    },
    mounted() {
      let location_info = Storage.getLocal('location')
      if(location_info.addressComponent){
        this.location = location_info.addressComponent.province+location_info.addressComponent.city
      }else{
        this.location = location_info.province + location_info.city
      }
      this.getGoodsList(1)
    },
    methods: {
      onCancel() {
        this.showSearch = false
      },
      //点击商品分类跳转页面
      toSingleClsaa(record) {
        this.$router.push({
          path: '/singleClass',
          query:{
            record: JSON.stringify(record)
          }
        })
      },
      searchData() {
        this.showSearch = true
      },
      onLoadingMore() {
        this.loadingMore = true
        this.page+=1
        this.getGoodsList(1)
      },
      getGoodsList(type) {
        let params = {
          page: this.page,
          size: this.size
        }
        this.$ajax('/goodsList', JSON.stringify(params)).then(res => {
          if(res.status == 200){
            if(type == 1){
              this.list = this.list.concat(res.result)
              this.loadingMore = false
            }else{
              this.list = res.result
              this.$refs['refresh'].refreshComplete()
            }
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
        this.$router.push({
          path:'/goodsDetails',
          query:{
            id:record.id
          }
        })
      },
      refresh() {
        this.page=1
        this.getGoodsList(2)
      }
    }
  }
</script>

<style scoped lang="scss">
.Positioning {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 3%;
  div:nth-child(2) {
    .ad1{
      color: red;
      margin-left: 2rem;
    }
  }
  .PositioningIcon {
    display: flex;
    align-items: center;
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
  .iconfont{
    font-size: 3rem;
    color: #ff8000;
  }
</style>
