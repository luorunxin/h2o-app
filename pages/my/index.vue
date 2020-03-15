<template>
  <div class="my">
    <div class="myTop">
      <div class="one">
        <van-icon size="2.5rem" name="comment-o" />
      </div>
      <div class="two">
        <div class="three">
          <div class="top">189****9809</div>
          <div class="center">再忙,也要记得吃饭哟 ~</div>
          <div class="bottom"><van-icon color="red" name="notes-o" />签到领10元红包</div>
        </div>
        <div class="four">
        </div>
      </div>
    </div>
    <div class="myBottom"></div>
  </div>
</template>

<script>
  import LPanelCard from '~/components/l-panel-card'
  export default {
    name: "index",
    components: {
      LPanelCard
    },
    data() {
      return {

      }
    },
    methods: {

    }
  }
</script>

<style scoped lang="scss">
.my {
  .myTop {
    .one{
      text-align: right;
      padding: 3% 3% 0 3%;
    }
    .two {
      display: flex;
      justify-content: space-between;
      padding: 0 3%;
      margin-top: 1rem;
      .three {
        .top{
          font-size: 3rem;
        }
        .center {
          font-size: 1.5rem;
          margin: 1rem 0 ;
        }
        .bottom {
          display: inline-block;
          font-size: 1.2rem;
          border: .1rem solid #cccccc;
          border-radius: 3.3rem;
          padding: .3rem;
          display: flex;
          align-items: center;
        }
      }
      .four {
        width: 8rem;
        height: 8rem;
        border-radius: 50%;
        background-color: skyblue;
      }
    }
  }
}
</style>
