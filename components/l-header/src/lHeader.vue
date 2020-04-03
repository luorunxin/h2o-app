<template>
  <div
    :class="['l-header', {'fixed': fixed}]"
    :style="[{background: bgColor},{}]"
  >
    <div :class="['back-box', {'w100': !title}]">
      <i
        v-if="back"
        :class="['iconfont', 'icon-fanhui']"
        @click.stop="goBack"
      ></i>
      <slot name="backRight" />
    </div>
    <div
      v-if="title"
      class="header-title"
      :style="[{color: color}, {'text-align': back || (!back&&!$slots.headerRight)?'center':'left'}]"
    >
      {{title}}
    </div>
    <div class="header-right">
      <i v-if="back && !$slots.headerRight" :class="['hidden', 'iconfont', 'icon-fanhui', {'mr': $slots.backRight}]"></i>
      <div v-if="back && !$slots.headerRight" class="hidden">
        <slot name="backRight" />
      </div>
      <slot v-else name="headerRight" />
    </div>
  </div>
</template>

<script>
  export default {
    name: "lHeader",
    data() {
      return {
      }
    },
    props: {
      fixed: {
        type: Boolean,
        default: true
      },
      bgColor: {
        type: String,
        default: 'white'
      },
      title: {
        type: String,
        default: ''
      },
      back: {
        type: Boolean,
        default: true
      },
      color: {
        type: String,
        default: '#333'
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
    }
  }
</script>

<style lang="scss" scoped>
  .l-header{
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    justify-content: space-between;
    overflow: hidden;
    .w100{
      width: 100%;
    }
    .back-box{
      display: flex;
      align-items: center;
      .icon-fanhui{
        font-size: 1.6rem;
      }
      .mr{
        margin-right: 1rem;
      }
    }
    .header-title{
      font-size: 1.6rem;
      font-weight: 500;
      width: 100%;
    }
    .header-right{
      display: flex;
      align-items: center;
    }
  }
  .fixed{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
  }
  .hidden{
    visibility: hidden;
  }
</style>
