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
        v-model="value"
        placeholder="请输入搜索关键词"
        input-align="center"
        @click="searchData"
      />
    </l-header>
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
        showSearch: false,
        list: [],
        page: 1,
        size: 10,
        loadingMore: true,
        finish: false,
        nomore: false,
      }
    },
    methods: {
      onLoadingMore() {
        console.log(1)
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
          path: '/home/Details', query: {
            id: record.id
          }
        })
      },
    },
    mounted() {
      this.getGoodsList(1)
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
  padding-top: calc(50px + 3%);
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
  .serach{
    width: calc(100vw - 30px);
  }
}
</style>
