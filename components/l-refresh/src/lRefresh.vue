<template>
  <div class="oh">
    <div class="l-refresh-container" ref="l_refresh">
      <div class="refresh-box">
        <div v-show="state === 'start'" class="start">下拉刷新 ⬇</div>
        <div v-show="state === 'move'" class="move">松手刷新</div>
        <div v-show="state === 'loading'" class="loading">正在刷新</div>
        <div v-show="state === 'end'" class="end">刷新完成</div>
      </div>
      <div ref="l_refresh_content">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "lRefresh",
    data() {
      return {
        currentNode: null,
        state: 'start',
        startY: 0,
        moveY: 0,
        firstNode: null,
        moveTrue: false
      }
    },
    props: {
      maxY: {
        type: Number,
        default: 60
      },
    },
    watch: {
    },
    mounted() {
      document.addEventListener('touchstart',this.touchStart,false);
      document.addEventListener('touchmove',this.touchMove,{passive: false});
      document.body.addEventListener('touchend',this.touchEnd,false);
    },
    methods: {
      refreshComplete() {
        let _that = this
        this.state = 'end'
        setTimeout(() => {
          _that.$refs['l_refresh'].style.transform = `translateY(-${_that.maxY}px)`
        }, 1000)
        setTimeout(() => {
          _that.$refs['l_refresh'].style.transition = ''
          _that.state = 'start'
          _that.moveY = 0
          _that.startY = 0
          _that.firstNode = null
          _that.$refs['l_refresh'].style.transform = ''
          _that.$refs['l_refresh'].style.transition = 'all .3s'
        }, 1300)
      },
      touchStart(e) {
        if(this.state === 'loading' || this.state === 'end') return
        this.startY = e.touches[0].clientY
        this.getTouchTarget(e.target)
      },
      touchMove(e) {
        if(this.moveTrue) e.preventDefault()
        this.moveY = e.touches[0].clientY - this.startY
        if(this.state === 'loading' ||
          this.state === 'end' ||
          this.moveY<0 ||
          !this.$refs['l_refresh_content'].contains(e.target) ||
          (document.documentElement.scrollTop>0 && this.state === 'start') ||
          (this.firstNode && this.firstNode.scrollTop>0)) return
        if(this.moveY>this.maxY) {
          this.state = 'move'
          this.$refs['l_refresh'].style.transform = `translateY(${this.maxY}px)`
        }else{
          this.state = 'start'
          this.moveTrue = true
          this.$refs['l_refresh'].style.transform = `translateY(${this.moveY}px)`
        }
        console.log(this.state)
      },
      touchEnd(e) {

        // this.flag = true
        // this.windowFirstNode = null
        // this.windowFirstNodeY = 0
        if(this.state === 'loading' || this.state === 'end') return
        if(this.state === 'move') {
          this.state = 'loading'
          this.$emit('refresh')
        }else{
          if(this.moveTrue){
            this.$refs['l_refresh'].style.transform = `translateY(-${this.maxY}px)`
            let _that = this
            setTimeout(() => {
              _that.$refs['l_refresh'].style.transition = ''
              _that.$refs['l_refresh'].style.transform = ''
              _that.$refs['l_refresh'].style.transition = 'all .3s'
              this.moveTrue = false
            }, 300)
          }
        }
      },
      getTouchTarget(elm) {
        if(this.$refs['l_refresh'] && this.$refs['l_refresh'].contains(elm)) {
          let overflow = window.getComputedStyle(this.$refs['l_refresh_content'].firstElementChild).overflow
          let overflowY = window.getComputedStyle(this.$refs['l_refresh_content'].firstElementChild).overflowY
          if(overflow === 'scroll' || overflow === 'auto' || overflowY === 'scroll' || overflowY === 'auto'){
            this.currentNode = elm
            this.firstNode = this.$refs['l_refresh_content'].firstElementChild
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .oh{
    overflow: hidden;
  }
  .l-refresh-container{
    position: relative;
    width: 100%;
    transition: all .3s;
    .refresh-box{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      font-size: 1rem;
      text-align: center;
      z-index: 9999;
      transform: translateY(-100%);
    }
  }
</style>