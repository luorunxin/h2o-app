<template>
<div class="service">
  <l-header
    :title="'我的客服'"
    :back="false"
    :fixed="false"
    :bgColor="'#ff8000'"
    :color="'white'"
  />
  <div class="serviceTop">
    <div class="serviceIcon">
      <div></div>
      <div>您好,客服小e很高兴为你服务!</div>
    </div>
  </div>
  <div class="serviceBottom">
    <div class="commonProblem">常见问题</div>
    <div class="Order">
      <div class="OrderLeft" @click="order">催单相关 ></div>
      <div class="OrderRight">
        <div>订单超时怎么办?</div>
        <div>订单一直没有骑士接单怎么办?</div>
      </div>
    </div>
  </div>
  <div class="contactService">
    <van-button class="button" size="large" type="info" @click="help($event)">联系客服</van-button>
  </div>
</div>
</template>

<script>
  import LHeader from '@/components/l-header'
  export default {
    layout: 'tabbar',
    name: "index",
    components: {
      LHeader
    },
    data() {
      return {
      }
    },
    methods: {
      order() {
        this.$router.push({
          path:'/service/order',
          query:{
            id:'1',
            msg: '订单疑问'
          }
        })
      },
      help(event) {
        this.$router.push({
          path:'/service/serviceHelp',
          query: {
            id:'1',
            msg:'客服'
          }
        })
      }
    },
  }
</script>

<style scoped lang="scss">
.service {
  .serviceTop {
    background: #FF8000;
    padding: 1rem 1rem 3rem 1rem;
    div:nth-child(1) {
      color: #FFFFFF;
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    .serviceIcon {
      display: grid;
      grid-template-rows: 100%;
      grid-template-columns: 30% 70%;
      align-items: center;
      div:nth-child(1) {
        width: 5rem;
        height: 5rem;
        border: 0.2rem solid #cccccc;
        border-radius: 50%;
      }
      div:nth-child(2) {
        padding: 1rem 0 1rem 0.5rem;
        color: #FFFFFF;
        font-size: 1.3rem;
        background-color: rgba(0,0,0,0.5);
        border-radius: 0.5rem;
        position: relative;
        &:after {
          content: '';
          display: block;
          position: absolute;
          border-width: .6rem;
          border-style: solid;
          border-color: transparent rgba(0, 0, 0, 0.5) transparent transparent;
          left: -1.2rem;
          top: 1.2rem;
        }
      }
    }
  }
  .serviceBottom {
    background: #FFFFFF;
    padding: 1rem .5rem;
    .commonProblem {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
    .Order {
      display: grid;
      grid-template-rows: 100%;
      grid-template-columns: 25% 75%;
      border-bottom: .1rem solid #e8e8e8;
      padding-bottom: 1.5rem;
      align-items: center;
      /*justify-items: center;*/
      color: #7a7a7a;
      .OrderLeft {
        padding: 1rem .5rem;
        font-size: 1.5rem;
        border-right: .1rem solid #ebebeb;
      }
      .OrderRight {
        display: grid;
        grid-template-rows: repeat(2,50%);
        grid-template-columns: 100%;
        padding-left: 1rem;
        div {
          padding-bottom: .5rem;
          padding-top: .5rem;
          font-size: 1.2rem;
        }
        div:nth-child(1) {
          border-bottom: .1rem solid #e8e8e8;
        }
      }
    }
  }
  .contactService {
    width: 100%;
    padding: 3%;
    position: absolute;
    bottom: 50px;
    .button{
      border-radius: .5rem;
    }
  }
}
</style>
