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
    <div class="withCenter">
      <div class="userA"><div>用户a</div></div>
      <div></div>
      <div class="userB"><div>用户b</div></div>
    </div>
    <div class="withBottom"></div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        msg:''
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
  .withTop {
    padding: 3%;
    display: flex;
    justify-content: space-between;
    border-bottom: .1rem solid rgba(232, 232, 232, 0.38);
    position: sticky;
    top: 0;
    z-index: 999;
    .back {
      display: grid;
      grid-template-rows: 100%;
      grid-template-columns: 50% 80%;
      justify-items: start;
      align-items: center;
      font-size: 1.3rem;
    }
  }
  .withCenter {
    padding: 3%;
    display: grid;
    grid-template-rows: 100%;
    grid-template-columns: 15% 70% 15%;
    .userA {
      display: grid;
      grid-template-rows: 100%;
      grid-template-columns: 100%;
      justify-items: start;
      div:nth-child(1) {
        width: 3rem;
        height: 3rem;
        background-color: skyblue;
        border-radius: .5rem;
      }
    }
    .userB {
      display: grid;
      grid-template-columns: 100%;
      grid-template-rows: 100%;
      justify-items: end;
      div:nth-child(1) {
        width: 3rem;
        height: 3rem;
        background-color: blue;
        border-radius: .5rem;
      }
    }
    div:nth-child(2) {
      background: skyblue;
    }
  }

}
</style>
