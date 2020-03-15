<template>
  <div class="oh">
    <div class="l-refresh-container" ref="l_refresh">
      <div class="refresh-box">
        <div v-show="state === 'start'" class="start">
          <span>下拉刷新 </span>
          <svg t="1584193924101" class="arrow-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4040"><path d="M579.282383 734.407416 579.282383 110.408599c0-18.59245-14.914688-33.664727-33.95637-33.664727l-66.652026 0c-18.753109 0-33.95637 15.053857-33.95637 33.664727l0 634.385375L244.930385 548.423561c-6.64535-6.628978-17.5804-6.460132-24.427342 0.38681l-47.1386 47.1386c-6.846942 6.846942-7.03216 17.781992-0.38681 24.410969L441.59858 884.401592c0.944512 2.059915 2.26867 3.997034 3.971451 5.703909l51.405787 51.424206c4.047176 4.046153 9.398044 5.955642 14.606673 5.703909 4.793166 0.2415 9.729595-1.50733 13.458523-5.227048l37.402865-37.429471 288.122093-277.226952c7.266497-7.248078 7.062859-19.168572-0.408299-26.638707l-51.405787-51.424206c-7.489578-7.471159-19.409049-7.656377-26.638707-0.407276L579.282383 734.407416z" p-id="4041"></path></svg>
        </div>
        <div v-show="state === 'move'" class="move">松手刷新</div>
        <div v-show="state === 'loading'" class="loading">
          <svg t="1584193158470" class="loading-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2027"><path d="M538.363217 266.292938c-73.156657 0-132.69244-59.719326-132.692439-133.127149C405.670778 59.777287 465.20656 0.028981 538.363217 0.028981s132.663459 59.719326 132.663459 133.136808c0 73.407822-59.506802 133.127148-132.663459 133.127149zM255.889453 372.023773c-66.819569 0-121.206468-54.551122-121.206468-121.631517 0-67.090055 54.386898-121.641176 121.206468-121.641176 66.906511 0.086942 121.119526 54.502821 121.187147 121.641176 0 67.051414-54.367578 121.631516-121.187147 121.631517zM135.842209 647.155789C76.828077 647.097828 29.010111 599.096318 28.981131 539.879322c0.057961-59.197675 47.875927-107.170204 106.861078-107.237825 58.994811 0.077282 106.793457 48.04015 106.851417 107.237825-0.038641 59.197675-47.846946 107.189525-106.851417 107.257146v0.019321z m120.047244 272.572064c-50.03015-0.057961-90.573989-40.746703-90.62229-90.950736 0.067621-50.184713 40.59214-90.854135 90.602969-90.931417 50.03015 0.067621 90.564329 40.737043 90.631951 90.931417 0 50.136412-40.640441 90.950737-90.61263 90.950736z m282.473764 104.214185c-43.712383-0.038641-79.136318-35.588159-79.174959-79.445445 0-43.808985 35.520537-79.435784 79.174959-79.435784 43.702723 0.048301 79.116998 35.588159 79.155639 79.435784 0 43.818645-35.501217 79.445444-79.174959 79.445445h0.01932z m286.753231-134.276712c-35.279032-0.038641-63.86355-28.71976-63.902191-64.114715 0.038641-35.404615 28.623158-64.076074 63.902191-64.114714 35.269372 0.038641 63.86355 28.7101 63.90219 64.114714-0.038641 35.394955-28.632818 64.076074-63.90219 64.114715z m117.438991-296.674251c-28.941944-0.038641-52.396898-23.561216-52.435538-52.609422 0.028981-29.038546 23.483934-52.580442 52.435538-52.619083 28.941944 0.038641 52.396898 23.570876 52.4452 52.609422-0.048301 29.048207-23.503255 52.570782-52.4452 52.619083zM784.437366 254.323956a40.746703 40.746703 0 0 0 40.679082 40.833644 40.746703 40.746703 0 0 0 40.688742-40.814324 40.746703 40.746703 0 0 0-40.679082-40.823984 40.746703 40.746703 0 0 0-40.688742 40.823984v-0.01932z" fill="#ff8000" p-id="2028"></path></svg>
        </div>
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
        default: 80
      },
    },
    watch: {
    },
    mounted() {
      document.addEventListener('touchstart',this.touchStart,false);
      document.addEventListener('touchmove',this.touchMove,{passive: false});
      document.body.addEventListener('touchend',this.touchEnd,false);
    },
    destroyed() {
      document.removeEventListener('touchstart',this.touchStart,false);
      document.removeEventListener('touchmove',this.touchMove,{passive: false});
      document.body.removeEventListener('touchend',this.touchEnd,false);
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
      font-size: 1.2rem;
      text-align: center;
      z-index: 9999;
      transform: translateY(-180%);
      .start{
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .arrow-icon{
        width: 1.2rem;
        height: 1.2rem;
      }
      .loading-icon{
        width: 1.5rem;
        height: 1.5rem;
        animation:retate .5s linear infinite;
        -moz-animation:retate .5s linear infinite; /* Firefox */
        -webkit-animation:retate .5s linear infinite; /* Safari and Chrome */
        -o-animation:retate .5s linear infinite; /* Opera */
      }
    }
  }
  @keyframes retate {
    0%{transform: rotate(0deg)}
    100%{transform: rotate(360deg)}
  }
  @-moz-keyframes retate { /* Firefox */
    0%{transform: rotate(0deg)}
    100%{transform: rotate(360deg)}
  }
  @-webkit-keyframes retate { /* Safari 和 Chrome */
    0%{transform: rotate(0deg)}
    100%{transform: rotate(360deg)}
  }

  @-o-keyframes retate { /* Opera */
    0%{transform: rotate(0deg)}
    100%{transform: rotate(360deg)}
  }
</style>
