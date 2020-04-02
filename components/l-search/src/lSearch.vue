<template>
  <div class="l-search">
    <form class="search-box" action="javascript:return false;">
      <van-search
        v-model="value"
        clearable
        show-action
        autofocus
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <div class="tag-box" v-show="search_history.length>0">
      <div class="history-title">
        <h4>搜索历史</h4>
        <van-icon size="1.5rem" name="delete" @click.stop="deleteHistory" />
      </div>
      <div>
        <van-tag
          v-for="(item, index) in search_history"
          :key="index"
          class="tag-single"
          plain
        >
          {{item}}
        </van-tag>
      </div>
    </div>
  </div>
</template>

<script>
  import Storage from '~/utils/storage.js'
  export default {
    name: "lSearch",
    data() {
      return {
        value: '',
        search_history: []
      }
    },
    mounted() {
      if(Storage.getLocal('search_history')){
        this.search_history = Storage.getLocal('search_history')
      }
    },
    methods: {
      onSearch(val) {
        console.log(val)
        if(this.search_history.length>0){
          this.search_history.unshift(val)
          if(this.search_history.length > 10){
            this.search_history.pop()
          }
          Storage.setLocal('search_history', this.search_history)
        }else{
          this.search_history.unshift(val)
          Storage.setLocal('search_history', this.search_history)
        }
      },
      onCancel(){
        this.$emit('onCancel')
      },
      deleteHistory() {
        this.$dialog.confirm({
          title: '提示',
          message: '是否删除搜索历史缓存'
        }).then(() => {
          this.search_history = []
          Storage.removeLocal('search_history')
        }).catch(() => {
          // on cancel
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .l-search{
    width: 100vw;
    height: 100vh;
    background: white;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    .search-box{
      width: 100%;
    }
    .tag-box{
      padding: 3%;
      .history-title{
        display: flex;
        align-items: center;
        justify-content: space-between;
        &>h4{
          font-size: 1.5rem;
        }
      }
      .tag-single{
        margin-top: 1rem;
        margin-right: 1rem;
      }
    }
  }
</style>