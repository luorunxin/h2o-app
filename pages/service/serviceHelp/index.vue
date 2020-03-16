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
      <div class="single-left" v-for="item in 10">
        <div class="head-photo">
          <div></div>
        </div>
        <div class="dialog">
          <l-dialog :left="true" :text="'打开就是不了四个 iu 的撒'" />
        </div>
        <div class="covering"></div>
      </div>
      <div class="single-right" v-for="item in 10">
        <div class="covering"></div>
        <div class="dialog">
          <l-dialog :left="false" :text="'打开就是不了四个 iu 的撒'" />
        </div>
        <div class="head-photo">
          <div></div>
        </div>
      </div>
    </div>
    <div class="input-group" ref="input">
      <div class="text">
        <textarea></textarea>
      </div>
      <button class="l-button">发送</button>
    </div>
  </div>
</template>

<script>
  import LDialog from '~/components/l-dialog'
  export default {
    name: "index",
    components: {
      LDialog
    },
    data() {
      return {
        msg:'',
        beforeHeight: 0,
      }
    },
    mounted() {
      let _this = this
      this.beforeHeight = document.documentElement.clientHeight || document.body.clientHeight
      window.onresize = function () {
        let afterHeight = document.documentElement.clientHeight || document.body.clientHeight
        if(_this.beforeHeight > afterHeight){
          _this.$refs['input'].style.transform = `translateY(-70px)`
          _this.$refs['talk'].style.transform = `translateY(-70px)`
        }else{
          _this.$refs['talk'].style.transform = ''
          _this.$refs['input'].style.transform = ''
        }
      }
    },
    methods: {
      back() {
        this.$router.go(-1)
      }
    },
    created() {
      this.msg = this.$route.query.msg
    }
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
    overflow:auto;
    .single-left{
      display: flex;
      margin-bottom: 5%;
    }
    .single-right{
      display: flex;
      margin-bottom: 5%;
      .head-photo{
        display: flex;
        justify-content: flex-end;
      }
    }
    .head-photo{
      flex: 1;
      &>div{
        width: 4rem;
        height: 4rem;
        background: dodgerblue;
        border-radius: .5rem;
      }
    }
    .dialog{
      flex: 4.3;
    }
    .covering{
      flex: 1;
    }
  }
  .input-group{
    width: 100%;
    height: 60px;
    border-top: 1px solid #dadada;
    display: flex;
    align-items: center;
    .text{
      width: 100%;
      padding: 1rem;
      textarea{
        list-style: none;
        width: 100%;
        height: 36px;
        padding: 1rem;
        font-size: 1.4rem;
        resize: none;
        outline: none;
        border: none;
        border-radius: .5rem;
      }
    }
    .l-button{
      list-style: none;
      padding: .5rem 1.2rem;
      border: 1px solid #dadada;
      border-radius: .5rem;
      font-size: 1.4rem;
      background: dodgerblue;
      color: white;
      font-weight: 500;
      white-space: nowrap;
      margin-right: 1rem;
    }
  }
}
</style>
