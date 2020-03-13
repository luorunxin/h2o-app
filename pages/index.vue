<template>
  <div class="container">
    <div>
      <h1 class="title">
        h2o
      </h1>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {

    }
  },
}
</script>

<style scoped lang="scss">
.container {
  margin: 0 auto;
  min-height: 100vh;
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
