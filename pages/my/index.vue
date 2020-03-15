<template>
  <div class="my-container">
    <l-panel-card
      :record="datas"
      @onPanelCardHandle="onPanelCardHandle"
    >
      <div></div>
    </l-panel-card>
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
        datas: {
          title: '我的订单',
          arrowTitle: '查看全部订单'
        }
      }
    },
    methods: {
      onPanelCardHandle() {
        this.$toast('跳转全部订单')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .my-container{
    padding: 3%;
  }
</style>
