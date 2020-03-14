<template>
  <div>
    <l-refresh
      ref="refresh"
      @refresh="refresh"
    >
      <div class="container">
        <div class="container-left">
          <l-card
            class="card"
            v-for="(item, index) in list"
            v-if="index%2 == 0"
            :key="index"
            :record="item"
            @onCardHandle="onCardHandle"
          >
            <l-label class="label" :label="item.label" />
          </l-card>
        </div>
        <div class="container-right">
          <l-card
            class="card"
            v-for="(item, index) in list"
            v-if="index%2 != 0"
            :key="index"
            :record="item"
            @onCardHandle="onCardHandle"
          >
            <l-label class="label" :label="item.label" />
          </l-card>
        </div>
      </div>
    </l-refresh>
  </div>
</template>

<script>
import LRefresh from '~/components/l-refresh'
import LCard from '~/components/l-card'
import LLabel from '~/components/l-label'
export default {
  components: {
    LRefresh,
    LCard,
    LLabel
  },
  data() {
    return {
      list: [
        {
          src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584191214702&di=d330763a4c2d9173eaac684f3e4ea392&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F68%2F61%2F300000839764127060614318218_950.jpg',
          title: '憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨',
          price: 1000,
          paymentNum: 10000,
          label: '产地:罗家巷子'
        },
        {
          src: '',
          title: '憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨',
          price: 100,
          paymentNum: 10000,
          label: '产地:罗家巷子'
        },
        {
          src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584191214702&di=d330763a4c2d9173eaac684f3e4ea392&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F68%2F61%2F300000839764127060614318218_950.jpg',
          title: '憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨',
          price: 1000,
          paymentNum: 10000,
          label: '产地:罗家巷子'
        },
        {
          src: '',
          title: '憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨',
          price: 100,
          paymentNum: 10000,
          label: '产地:罗家巷子'
        }
      ]
    }
  },
  mounted() {
  },
  methods: {
    onCardHandle(record) {
      console.log(record)
    },
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
  .label{
    margin-top: .5rem;
  }
.container {
  min-height: 100vh;
  display: flex;
  padding: 0 3% 3%;
  justify-content: space-between;
  .container-left, .container-right{
    width: 48.5%;
  }
  .card{
    margin-top: 5%;
  }
}
</style>
