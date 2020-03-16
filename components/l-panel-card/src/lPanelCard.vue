<template>
  <div class="l-panel-card">
    <div class="title-box" @click="panelCardHandle">
      <span class="title">{{record.title}}</span>
      <div class="arrow-box">
        <span class="arrowTitle">{{record.arrowTitle}}</span>
        <van-icon v-if="record.arrowTitle" name="arrow" color="#acacac" />
      </div>
    </div>
    <div class="content-box">
      <slot />
    </div>
  </div>
</template>

<script>
  export default {
    name: "lPanelCard",
    props: ['record'],
    methods: {
      panelCardHandle() {
        this.$emit('onPanelCardHandle', this.record)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .l-panel-card{
    width: 100%;
    border-radius: 10px;
    background: white;
    box-shadow: 0 0 10px #dadada;
    .title-box{
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #eeeeee;
      padding: 1.2rem;
      .title{
        font-size: 1.3rem;
      }
      .arrow-box{
        display: flex;
        align-items: center;
        .arrowTitle{
          font-size: 1rem;
          color: #acacac;
        }
      }
    }
    .content-box{
      padding: 1.2rem;
    }
  }
</style>
