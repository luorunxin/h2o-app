<template>
<div>
  客服
  <button @click="send(111)">send</button>
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
      }
    }
  }
</script>

<style scoped>

</style>
