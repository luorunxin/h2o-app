<template>
  <div>
    {{ msg }}
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
    created() {
      this.msg = this.$route.query.msg
    }
  }
</script>

<style scoped>

</style>
