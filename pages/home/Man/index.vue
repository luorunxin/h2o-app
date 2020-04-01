<template>
  <div class="Men">
    <lheader :search="true" :data1="this.$route.query.id" :data2="true"/>
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
          <!--<l-label class="label" :label="item.label" />-->
        </l-card>
      </div>
    </div>
  </div>
</template>

<script>
  import LCard from '~/components/l-card'
  import Lheader from '~/components/l-header'
  export default {
    name: "index",
    data() {
      return {
        list: [],
        page: 1,
        size: 10,
        loadingMore: true,
        nomore: false,
      }
    },
    methods: {
      onCardHandle(record) {
        this.$router.push({
          path: '/home/Details', query: {
            id: record.id
          }
        })
      },
      getGoodsList() {
        let params = {
          page: this.page,
          size: this.size
        }
        this.$ajax('/goodsList', JSON.stringify(params)).then(res => {
          if (res.status == 200) {
            this.list = this.list.concat(res.result)
            // this.loadingMore = false
            if (res.result.length < this.size) {
              this.nomore = true
            } else {
              this.nomore = false
            }
          } else {
            this.$toast.fail(res.message)
          }
        }).catch(err => {
          console.error(err)
        })
      },
    },
    mounted() {
      this.getGoodsList()
    },
    components: {
      LCard,Lheader
    }
  }
</script>

<style scoped lang="scss">
.Men {
  padding-top: 50px;
  .container{
    display: flex;
    padding: .2rem 3% 3%;
    justify-content: space-between;
    .container-left, .container-right{
      width: 48.5%;
    }
    .card{
      margin-bottom: 5%;
    }
    .label{
      margin-top: .5rem;
    }
  }
}
</style>
