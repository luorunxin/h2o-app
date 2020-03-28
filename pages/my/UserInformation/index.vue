<template>
  <div class="user">
    <div class="back" @click="back"><van-icon size="2rem" name="arrow-left" /><span>我的</span></div>
    <div class="userTop">
      <div class="r-userTitle"></div>
      <div class="r-userName">下雨</div>
      <div class="r-accountUmber">淘宝号:</div>
      <div class="r-phone">ljjdnsjfnrf</div>
      <div class="r-right"> > </div>
    </div>
    <div class="dropOut" @click="out"><span>退出</span></div>
  </div>
</template>

<script>
  import Storage from '~/utils/storage.js'
  export default {
    name: "index",
    data() {
      return {

      }
    },
    methods: {
      back() {
        this.$router.back()
      },
      out() {
        Storage.removeLocal('user_info');
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped lang="scss">
.user {
  background-color: #fff;
  height: 100vh;
  .back {
    padding: 3% 1%;
    display: flex;
    align-content: center;
    span{
      margin-left: 1rem;
      font-size: 1.3rem;
    }
  }
  .userTop {
    display: grid;
    grid-template-rows: repeat(4,25%);
    grid-template-columns: repeat(6,1fr);
    padding: 3rem 1rem 0 1rem;
    .r-userTitle {
      width: 6rem;
      height: 6rem;
      background-color: skyblue;
      border-radius: .7rem;
      margin-right: 1rem;
    }
    .r-userName {
      font-size: 2rem;
    }
    .r-accountUmber {
      grid-row-start: 3;
      grid-row-end: 4;
      grid-column-start: 2;
      grid-column-end: 4;
      color: #bababa;
      font-size: 1.3rem;
    }
    .r-phone {
      grid-row-start: 3;
      grid-row-end: 4;
      grid-column-start: 3;
      grid-column-end: 4;
      font-size: 1.3rem;
      color: #bababa;
    }
    .r-right {
      justify-self: center;
      align-self: center;
      color: #bababa;
      font-size: 2rem;
      grid-row-start: 3;
      grid-row-end: 4;
      grid-column-start: 6;
      grid-column-end: 7;
    }
  }
  .dropOut {
    padding: .5rem 0 0 0;
    background-color: #e4e4e4;
    font-size: 1.5rem;
    box-shadow: 0 1px 2px #ededed;
    text-align: center;
    color: #6d6d6d;
    span {
      display: block;
      background-color: #fff;
      padding: 1rem 0;
      &:active {
        background-color: #a6a6a6;
        opacity: .4;
      }
    }
  }
}
</style>
