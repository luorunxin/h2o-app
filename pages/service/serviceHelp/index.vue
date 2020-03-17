<template>
  <div class="serviceHelp">
    <div class="withTop">
      <div class="back">
        <van-icon size="2rem" name="arrow-left" @click="back"/>
        <div>{{ msg }}</div>
      </div>
      <div>
        <van-icon size="2rem" name="ellipsis" />
      </div>
    </div>
    <div class="withCenter" ref="talk">
      <component
        v-for="(item, index) in talkContent"
        :key="index"
        :is="item.name"
        :text="item.text"
      />
    </div>
    <div class="input-group" ref="input">
      <l-textarea
        v-model="textareaVal"
      />
      <button class="l-button" @click.stop="sendtext">发送</button>
    </div>
  </div>
</template>

<script>
  import LTextarea from '~/components/l-textarea'
  import LTalkLeft from '~/components/l-talk-left'
  import LTalkRight from '~/components/l-talk-right'
  import BASEURL from '~/plugins/baseURL.js'
  export default {
    name: "index",
    components: {
      LTextarea,
      LTalkLeft,
      LTalkRight
    },
    data() {
      return {
        talkContent: [],
        textareaVal: '',
        msg:'',
        beforeHeight: 0,
        stop: 0,
        socket: null,
        token: '',
        timer: null
      }
    },
    created() {
      this.msg = this.$route.query.msg
    },
    mounted() {
      this.token = parseInt(Math.random()*100000).toString() + new Date().getTime()
      this.initWebSocket()
      let _this = this
      //下面的这代码是猎取当前屏幕可视取的高度
      this.beforeHeight = document.documentElement.clientHeight || document.body.clientHeight
      this.stop = this.$refs['talk'].scrollHeight
      //点击当前窗口任意地方的时候调用这个函数
      window.onresize = function () {
        //把当前的高度保存到一个变量里面
        let afterHeight = document.documentElement.clientHeight || document.body.clientHeight
        //判断最开始保存的变量和后面点击窗口后保存的变量判断后进行元素的位置改变
        if(_this.beforeHeight > afterHeight){
          _this.$refs['input'].style.bottom = `0px`
          _this.$refs['talk'].scrollTop = _this.beforeHeight - afterHeight + _this.stop
        }else{
          _this.$refs['talk'].style.bottom = '0'
          _this.$refs['input'].scrollTop = _this.stop
        }
      }
    },
    beforeDestroy() {
      this.close()
    },
    methods: {
      initWebSocket() {
        if (window.WebSocket || window.MozWebSocket){
          let address = BASEURL.socket + '/service'
          this.socket = new WebSocket(address)
          this.open()
        }else{
          this.$toast('当前客户端不支持此功能')
          this.$router.go(-1)
        }
      },
      open() {
        console.log('正在连接...')
        this.socket.onopen = () => {
          this.send()
          this.message()
          this.setIntervalSend()
        }
      },
      send(data) {
        if(this.socket.readyState != 1) return
        let obj = {
          token: this.token
        }
        if(data) obj.message = data
        this.socket.send(JSON.stringify(obj))
      },
      message() {
        let _this = this
        this.socket.onmessage = function (msg) {
          _this.talkContent.push({
            name: 'l-talk-left',
            text: msg.data
          })
        }
      },
      close() {
        this.socket.close()
        this.socket.onclose = function () {
          console.log('连接关闭')
          clearInterval(this.timer)
        }
      },
      setIntervalSend() {
        this.timer = setInterval(() => {
          this.socket.send('791618513')
        }, 5000)
      },
      sendtext() {
        if(!this.textareaVal) return
        this.send(this.textareaVal)
        this.talkContent.push({
          name: 'l-talk-right',
          text: this.textareaVal
        })
        this.textareaVal = ''
      },
      back() {
        this.$router.go(-1)
      }
    },
  }
</script>

<style scoped lang="scss">
.serviceHelp {
  height: 100vh;
  .withTop {
    height: 50px;
    padding: 0 3%;
    display: flex;
    justify-content: space-between;
    border-bottom: .1rem solid rgba(232, 232, 232, 0.38);
    position: sticky;
    top: 0;
    z-index: 999;
    background-color: #fff;
    align-items: center;
    .back {
      display: grid;
      grid-template-rows: 100%;
      grid-template-columns: 50% 80%;
      justify-items: start;
      align-items: center;
      font-size: 1.3rem;
    }
  }

  .withCenter{
    padding: 3%;
    height: calc(100vh - 110px);
    -o-overflow-scrolling: touch;
    -ms-overflow-scrolling: touch;
    -moz-overflow-scrolling: touch;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
    overflow-y: scroll;

  }
  .input-group{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    min-height: 60px;
    border-top: 1px solid #dadada;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 1rem;
    background: #f1f1f1;

    .l-button{
      height: calc(60px - 2rem);
      list-style: none;
      padding: 0 1.2rem;
      border: 1px solid #dadada;
      border-radius: .5rem;
      font-size: 1.4rem;
      background: dodgerblue;
      color: white;
      font-weight: 500;
      white-space: nowrap;
    }
  }
}
</style>
