<template>
  <div class="single-left">
    <div class="head-photo">
      <div></div>
    </div>
    <div class="dialog">
      <l-dialog :left="true" :text="text" />
    </div>
    <div class="covering"></div>
  </div>
</template>

<script>
  import LDialog from '~/components/l-dialog'
  export default {
    name: "lTalkLeft",
    components: {
      LDialog
    },
    props: ['text']
  }
</script>

<style lang="scss" scoped>
  .single-left{
    display: flex;
    margin-bottom: 5%;
    .head-photo{
      flex: 1;
      &>div{
        width: 4rem;
        height: 4rem;
        background: dodgerblue;
        border-radius: .5rem;
      }
    }
    .dialog{
      flex: 4.3;
    }
    .covering{
      flex: 1;
    }
  }
</style>