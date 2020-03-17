<template>
  <div class="single-right">
    <div class="covering"></div>
    <div class="dialog">
      <l-dialog :left="false" :text="text" />
    </div>
    <div class="head-photo">
      <div></div>
    </div>
  </div>
</template>

<script>
  import LDialog from '~/components/l-dialog'
  export default {
    name: "lTalkRight",
    components: {
      LDialog
    },
    props: ['text']
  }
</script>

<<style lang="scss" scoped>
  .single-right{
    display: flex;
    margin-bottom: 5%;
    .head-photo{
      display: flex;
      justify-content: flex-end;
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
      display: flex;
      justify-content: flex-end;
    }
    .covering{
      flex: 1;
    }
  }
</style>