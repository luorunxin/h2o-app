<template>
  <div
    class="l-label"
    :style="`border: 1px solid ${color};color:${color};`"
  >
    {{label}}
  </div>
</template>

<script>
  export default {
    name: "lLabel",
    props: {
      label: {
        type: String,
        default: ''
      },
      color: {
        type: String,
        default: '#777'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .l-label{
    border-radius: 2px;
    font-size: 1rem;
    display: inline-block;
    line-height: 1rem;
    padding: 2px;
  }
</style>