<template>
  <div class="l-dialog-container">
    <div class="l-dialog-left" v-show="left">
      {{text}}
    </div>
    <div class="l-dialog-right" v-show="!left">
      {{text}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "lDialog",
    props: {
      left: {
        type: Boolean,
        default: true
      },
      text: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .l-dialog-container{
    width: 100%;
    .l-dialog-left{
      padding: 1rem;
      font-size: 1.5rem;
      background-color: rgba(0,0,0,0.5);
      border-radius: 0.5rem;
      position: relative;
      background: white;
      &:after {
        content: '';
        display: block;
        position: absolute;
        border-width: .6rem;
        border-style: solid;
        border-color: transparent white transparent transparent;
        left: -1.2rem;
        top: 1.2rem;
      }
    }
    .l-dialog-right{
      padding: 1rem;
      font-size: 1.3rem;
      background-color: rgba(0,0,0,0.5);
      border-radius: 0.5rem;
      position: relative;
      background: white;
      &:after {
        content: '';
        display: block;
        position: absolute;
        border-width: .6rem;
        border-style: solid;
        border-color: transparent transparent transparent white;
        left: 100%;
        top: 1.2rem;
      }
    }
  }
</style>