<template>
<div class="service">
  <div class="serviceTop">
    <div>我的客服</div>
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
</div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        socket: null
      }
    },
    mounted() {
      this.initWebSocket()
    },
    methods: {
      initWebSocket() {
        if (window.WebSocket){
          let address = 'ws://192.168.0.103:3001/'
          this.socket = new WebSocket(address)
          this.open()
          this.send('1111')
          this.message()
          // this.close()
        }else{
          this.$toast('当前客户端不支持此功能')
          this.$router.go(-1)
        }
      },
      open() {
        console.log('正在连接...')
        this.socket.onopen = () => {
          this.message()
        }
      },
      send(data) {
        if(!data || this.socket.readyState != 1) return
        this.socket.send(data)
      },
      message() {
        this.socket.onmessage = function (msg) {
          console.log(msg.data)
        }
      },
      close() {
        this.socket.onclose = function (event) {
          console.log('连接关闭:',event)
        }
      },
      order() {
        this.$router.push({
          path:'/service/order',
          query:{
            id:'1',
            msg: '订单疑问'
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
}
</style>
