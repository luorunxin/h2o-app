<template>
  <div class="Men">
    <l-search
      v-show="showSearch"
      @onCancel="onCancel"
    />
    <l-header>
      <van-search
        class="serach"
        slot="headerRight"
        placeholder="请输入搜索关键词"
        input-align="center"
        @click="searchData"
        shape="round"
      />
    </l-header>
    <div class="screening-box">
      <div class="screening-single">
        <van-dropdown-menu active-color="#ff8000">
          <van-dropdown-item v-model="rank" :options="ranks" @change="changeRank" />
        </van-dropdown-menu>
      </div>
      <div class="screening-single" @click="onPopup">
        <span>筛选</span>
        <van-icon name="bars" />
      </div>
    </div>
    <van-popup
      v-model="showPopup"
      position="right"
      :style="{width: '75%',height: '100%'}"
    >
      <div class="popup-container">
        <div class="popup-single">
          <p class="popup-single-title">折扣服务</p>
          <div class="tag-box">
            <van-tag
              v-for="(item, index) in discountService"
              :key="index"
              class="tag-single"
              :color="item.selected?'#ff8000':'#f7f8fb'"
              :text-color="item.selected?'white':'#666'"
              @click="selectTag(index)"
            >
              {{item.text}}
            </van-tag>
          </div>
        </div>
        <div class="popup-single">
          <p class="popup-single-title">价格区间</p>
          <div class="price-box">
            <input class="field" v-model="lowest" type="number" placeholder="最低价" />
            <div class="line"></div>
            <input class="field" v-model="highest" type="number" placeholder="最高价" />
          </div>
        </div>
      </div>
      <van-goods-action>
        <van-goods-action-button type="warning" text="重置" @click="onReset" />
        <van-goods-action-button type="danger" text="确定" @click="onScreening" />
      </van-goods-action>
    </van-popup>
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
  import LLoadingMore from '~/components/l-loading-more'
  import LCard from '~/components/l-card'
  import LHeader from '~/components/l-header'
  import LSearch from "~/components/l-search/src/lSearch";
  export default {
    name: "index",
    data() {
      return {
        homeJumpParams: {},
        showSearch: false,
        list: [],
        page: 1,
        size: 10,
        loadingMore: true,
        finish: false,
        nomore: false,
        showPopup: false,
        rank: 1,
        ranks: [
          { text: '综合', value: 1 },
          { text: '价格降序', value: 2 },
          { text: '价格升序', value: 3 },
          // { text: '销量', value: 4 }
        ],
        discountServiceReset: [
          {
            text: '包邮',
            selected: false
          }
        ],
        discountService: [
          {
            text: '包邮',
            type: 1,
            selected: false
          }
        ],
        lowest: '',
        highest: '',
      }
    },
    mounted() {
      this.homeJumpParams = JSON.parse(this.$route.query.record)
      delete this.homeJumpParams.text
      delete this.homeJumpParams.icon
      this.getGoodsList(1)
    },
    methods: {
      changeRank() {
        this.loadingMore = true
        this.page = 1
        this.getGoodsList()
      },
      onReset() {
        this.discountService = this.discountServiceReset
        this.lowest = ''
        this.highest = ''
      },
      onScreening() {
        if(this.discountService.length<1 && this.lowest==='' && this.lowest===null &&
          this.highest==='' && this.highest===null) {return;}
          this.changeRank()
      },
      selectTag(index) {
        this.discountService[index].selected = !this.discountService[index].selected
      },
      onPopup() {
        this.showPopup = true
      },
      onLoadingMore() {
        this.loadingMore = true
        this.page+=1
        this.getGoodsList(1)
      },
      getGoodsList(type) {
        let params = {
          page: this.page,
          size: this.size,
          rank: this.rank,
          ...this.homeJumpParams
        }
        let discountService = []
        this.discountService.forEach(item => {
          if(item.selected){
            discountService.push(item.type)
          }
        })
        if(discountService.length>0){
          params.discountService = discountService
        }
        if(this.lowest!=='' && this.lowest!==null) {
          params.lowest = this.lowest
        }
        if(this.highest!=='' && this.highest!==null) {
          params.highest = this.highest
        }
        this.$ajax('/goodsList', JSON.stringify(params)).then(res => {
          if(res.status == 200){
            if(type == 1){
              this.list = this.list.concat(res.result)
              this.loadingMore = false
            }else if(type == 2){
              this.list = res.result
              this.$refs['refresh'].refreshComplete()
            }else{
              this.list = res.result
              this.loadingMore = false
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
      refresh() {
        this.page=1
        this.getGoodsList(2)
      },
      searchData() {
        this.showSearch = true
      },
      onCancel() {
        this.showSearch = false
      },
      onCardHandle(record) {
        this.$router.push({
          path: '/goodsDetails',
          query: {
            id: record.id
          }
        })
      },
    },
    components: {
      LCard,
      LHeader,
      LSearch,
      LRefresh,
      LLoadingMore
    }
  }
</script>

<style scoped lang="scss">
.Men {
  padding-top: calc(90px + 3%);
  .page {
    .container {
      display: flex;
      padding: .2rem 3% 3%;
      justify-content: space-between;
      .container-left, .container-right {
        width: 48.5%;
      }
      .card {
        margin-bottom: 5%;
      }
      .label {
        margin-top: .5rem;
      }
    }
  }
  .serach {
    width: calc(91vw);
  }
  .screening-box {
    border-top: 1px solid #f7f8fb;
    display: flex;
    align-items: center;
    background: white;
    display: flex;
    position: fixed;
    width: 100%;
    top: 50px;
    left: 0;
    z-index: 999;
    .color-ff8000{
      color: #ff8000;
    }
    .screening-single {
      flex: 1;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      .van-dropdown-menu {
        height: inherit;
        width: 100%;
      }
      .van-icon {
        font-size: 1.5rem;
      }
    }
  }
  .popup-container {
    padding: 5% 0;
    -o-overflow-scrolling: touch;
    -ms-overflow-scrolling: touch;
    -moz-overflow-scrolling: touch;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
    overflow: auto;
    height: calc(100% - 50px);
    .popup-single {
      padding: 5% 0;
      border-bottom: 1px solid #f7f8fb;
      .popup-single-title {
        font-size: 1.3rem;
        margin-left: 2.5%;
      }
      .tag-box {
        margin-top: 5%;
        .tag-single {
          width: 30%;
          justify-content: center;
          margin-left: 2.5%;
          padding: .8rem 0;
          font-size: 1.3rem;
          margin-bottom: 3%;
        }
      }
      .price-box {
        margin-top: 5%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .field {
          width: 40%;
          background: #f7f8fb;
          border: none;
          padding: .8rem 2rem;
          font-size: 1.2rem;
          border-radius: 1.5rem;
          text-align: center;
        }
        .line {
          width: 2rem;
          height: 1px;
          border: 1px solid #d5d5d8;
        }
      }
    }
  }
}
</style>
