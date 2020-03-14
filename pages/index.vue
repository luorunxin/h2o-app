<template>
  <div>
    <!--<div class="top"></div>-->
    <l-refresh
      ref="refresh"
      @refresh="refresh"
    >
      <div class="container">
        <div>
          <h1 class="title">
            h2o
          </h1>
        </div>
      </div>
    </l-refresh>
  </div>
</template>

<script>
import LRefresh from '~/components/l-refresh'
export default {
  components: {
    LRefresh
  },
  data() {
    return {

    }
  },
  methods: {
    refresh() {
      let _that = this
      setTimeout(() => {
        _that.$refs['refresh'].refreshComplete()
      }, 2000)
    }
  }
}
</script>

<style scoped lang="scss">
  .top{
    width: 100%;
    height: 300px;
    background: #dedede;
  }
.container {
  background: dodgerblue;
  margin: 0 auto;
  min-height: 100vh;
  height: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  .title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    display: block;
    font-weight: 400;
    font-size: 5rem;
    color: #FF8000;
    letter-spacing: 1px;
  }
}
</style>
