<template>
  <div class="searchPage">
    <Lheader :search="true" :button="true" >
      <template v-slot:searchRight>
        <van-button type="warning" size="small" round="true" :style="fontObj">搜索</van-button>
      </template>
    </Lheader>
    <div class="searchBox">
      <div class="title">
        <div class="left">搜索发现</div>
        <div class="right"><van-icon name="eye-o" size="1.6rem"/></div>
      </div>
      <div class="container">
        <ul >
          <li v-for="(item,index) in text" :key="index">{{ item.msg }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Lheader from '~/components/l-header'
  export default {
    name: "index",
    data() {
      return {
        fontObj:{
          fontSize:'14px'
        },
        text:[
          {msg:'华为9x'},
          {msg:'华为9x'},
          {msg:'华为9x'},
          {msg:'华为9x'},
          {msg:'华为9x'},
          {msg:'华为9x'},
        ]
      }
    },
    created() {
      console.log(this.$route.query.id)
    },
    components: {
      Lheader
    }
  }
</script>

<style scoped lang="scss">
  .searchPage {
    height: calc(100vh - 50px);
    padding-top: 50px;
    background: #fff;
    .searchBox {
      .title {
        padding: 3%;
        display: flex;
        justify-content: space-between;
        .left {
          font-size: 16px;
          font-weight: 600;
        }
      }
      .container {
        ul {
          display: grid;
          grid-template-rows: 1fr;
          grid-template-columns: repeat(2,1fr);
          list-style: none;
          padding: 3%;
          grid-row-gap: 1.3rem;
          li {
            font-size: 1.19rem;
            color: #bababa;
          }
        }
      }
    }
  }
</style>
