<template>
  <div class="infomation">
    <l-header
      :back="false"
      :bgColor="'#f1f1f1'"
      :title="'购物车'"
    >
      <div slot="headerRight" class="manege" @click="management">管理</div>
    </l-header>
    <div class="content-box">
      <van-swipe-cell
        v-for="item in datas"
        :key="item.id"
      >
        <l-shopping-cart-card
          class="shopping-cart-card"
          :record="item"
          @onChangeCheck="onChangeCheck"
          @onShoppingHandle="onShoppingHandle"
          @onSubstrctHandle="onSubstrctHandle"
          @onPlusHandle="onPlusHandle"
        >
          <div class="selected-sku-box" @click.stop="onShowSku(item)">
            <div class="selected-sku">
              <span>{{item.size}};{{item.color}}</span>
              <van-icon name="arrow-down" />
            </div>
          </div>
        </l-shopping-cart-card>
        <template #right>
          <van-button
            square
            text="删除"
            type="danger"
            class="delete-button"
            @click.stop="deleteShoppingCart(item)"
          />
        </template>
      </van-swipe-cell>
      <l-loading-more
        :loadingMore="loadingMore"
        :finish="finish"
        :nomore="nomore"
        @onBottom="onLoadMore"
      />
    </div>
    <van-submit-bar
      :price="sum"
      button-text="结算"
      @submit="onSubmit"
      v-if="isShow"
    >
      <van-checkbox checked-color="#ff8000" @click="selectAll"  v-model="checked">全选</van-checkbox>
    </van-submit-bar>
    <van-submit-bar
      button-text="删除"
      @submit="deletes"
      v-else
    >
      <van-checkbox class="decheckbox" checked-color="#ff8000" @click="selectAll"  v-model="checked">全选</van-checkbox>
    </van-submit-bar>
    <van-sku
      ref="goodsSku"
      v-model="showSku"
      :sku="sku"
      :goods="goodsImage"
      :goods-id="goods.id"
      :initial-sku="initialSku"
      buy-text="查看详情"
      add-cart-text="确定"
      close-on-click-overlay
      reset-stepper-on-hide
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
      @sku-selected="onSkuSelected"
    >
      <template #sku-stepper="props">
        <div></div>
      </template>
    </van-sku>
  </div>
</template>

<script>
  import LShoppingCartCard from '~/components/l-shopping-cart-card'
  import LHeader from '~/components/l-header'
  import LLoadingMore from "~/components/l-loading-more/src/lLoadingMore";
  import CONSTANS from '~/utils/constans.js'
  export default {
    layout: 'tabbar',
    name: "index",
    components: {
      LLoadingMore,
      LShoppingCartCard,
      LHeader
    },
    data() {
      return {
        goods: {
          id: ''
        },
        checked: false,
        sum:0,
        isShow: true,
        sun:0,
        datas: [],
        page: 1,
        size: 10,
        loadingMore: false,
        finish: false,
        nomore: false,
        goodsImage: {
          picture: ''
        },
        showSku: false,
        sku: {
          // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
          // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
          tree: [
            // {
            //   k: null, // skuKeyName：规格类目名称
            //   v: [
            //     // {
            //     //   id: '30349', // skuValueId：规格值 id
            //     //   name: '红色', // skuValueName：规格值名称
            //     //   imgUrl: 'https://img.yzcdn.cn/1.jpg', // 规格类目图片，只有第一个规格类目可以定义图片
            //     //   previewImgUrl: 'https://img.yzcdn.cn/1p.jpg', // 用于预览显示的规格类目图片
            //     // },
            //     // {
            //     //   id: '1215',
            //     //   name: '蓝色',
            //     //   imgUrl: 'https://img.yzcdn.cn/2.jpg',
            //     //   previewImgUrl: 'https://img.yzcdn.cn/2p.jpg',
            //     // }
            //   ],
            //   k_s: null // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
            // }
          ],
          // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
          list: [
            // {
            //   id: 2259, // skuId，下单时后端需要
            //   price: 100, // 价格（单位分）
            //   s1: '1215', // 规格类目 k_s 为 s1 的对应规格值 id
            //   s2: '1193', // 规格类目 k_s 为 s2 的对应规格值 id
            //   s3: '0', // 最多包含3个规格值，为0表示不存在该规格
            //   stock_num: 110 // 当前 sku 组合对应的库存
            // }
          ],
          price: null, // 默认价格（单位元）
          stock_num: 0, // 商品总库存
          //collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
          //none_sku: false, // 是否无规格商品
          hide_stock: false // 是否隐藏剩余库存
        },
        sizes: [],
        colors: [],
        initialSku: {},
        currentSelectGoods: null
      }
    },
    mounted() {
      this.getShoppingCartList()
    },
    methods: {
      updateShoppingCartById() {
        const loading = this.$toast.loading({
          message: '加载中...',
          forbidClick: true
        })
        this.$ajax('/updateShoppingCartById',JSON.stringify(this.selectedSku)).then(res => {
          loading.clear()
          if(res.status == 200){
            this.showSku = false
            this.getShoppingCartList()
          }else{
            this.$toast.fail(res.message)
          }
        }).catch(err => {
          loading.clear()
          console.error(err)
        })
      },
      onSkuSelected({ skuValue, selectedSku, selectedSkuComb }) {
        if(CONSTANS.GOODSCATEGORY.CLOTHING === this.goods.goods_category_id){
          if(selectedSkuComb){
            for (let i in  this.goods.amounts) {
              if(this.goods.amounts[i].sid === selectedSkuComb['s1'] &&
                this.goods.amounts[i].cid === selectedSkuComb['s2']){
                this.selectedSku = this.goods.amounts[i]
                this.selectedSku.sku_num = this.currentSelectGoods.sku_num
              }
            }
          }else{
            this.selectedSku = null
          }
        }
      },
      onAddCartClicked() {
        if(this.selectedSku){
          //修改商品规格
          this.selectedSku.select_sku = this.selectedSku.id
          this.selectedSku.id = this.currentSelectGoods.id
          this.updateShoppingCartById()
        }else{
          this.$toast('请先选择商品规格')
        }
      },
      getGoodsById(record) {
        const loading = this.$toast.loading({
          message: '加载中...',
          forbidClick: true
        })
        this.$ajax('/getGoodsById', JSON.stringify({id:record.goods_id})).then(res=>{
          if(res.status == 200){
            this.$forceUpdate()
            this.goods = {...res.result}
            this.goodsImage.picture = this.goods.images[0].src
            this.sku.price = this.goods.price
            this.initialSku.selectedNum = record.sku_num
            if(CONSTANS.GOODSCATEGORY.CLOTHING === this.goods.goods_category_id){
              this.$set(this.sku, 'tree', [])
              this.$set(this.sku, 'list', [])
              this.$set(this.sku, 'price', null)
              this.$set(this.sku, 'stock_num', 0)
              // this.$set(this.initialSku, 'selectedNum', record.sku_num)
              this.sizes = []
              this.colors = []
              let ss = [], cc = []
              this.goods.amounts.forEach((item,index) => {
                if(!ss.includes(item.size)){
                  let obj = {}
                  obj.id = item.id
                  obj.size = item.size
                  this.sizes.push(obj)
                  ss.push(item.size)
                }
                if(!cc.includes(item.color)){
                  let obj = {}
                  obj.id = item.id
                  obj.color = item.color
                  this.colors.push(obj)
                  cc.push(item.color)
                }
                this.sku.stock_num+=item.amount
              })
              let sobj = {},cobj = {}, vObj = {}
              sobj.v = []
              cobj.v = []
              this.sizes.forEach(item => {
                vObj = {}
                if(!sobj.k) {
                  sobj.k = '尺码'
                  sobj.k_s = 's1'
                }
                vObj.id = item.id
                vObj.name = item.size
                sobj.v.push(vObj)
                this.goods.amounts.map(i => {
                  if(i.size === item.size){
                    i.sid = item.id
                    if(record.size === i.size){
                      this.initialSku.s1 = i.sid
                    }
                  }
                  return i
                })
              })
              this.sku.tree.push(sobj)
              this.colors.forEach(item => {
                vObj = {}
                if(!cobj.k) {
                  cobj.k = '颜色'
                  cobj.k_s = 's2'
                }
                vObj.id = item.id
                vObj.name = item.color
                vObj.imgUrl = this.goods.images[1].src
                vObj.previewImgUrl = this.goods.images[1].src
                cobj.v.push(vObj)
                this.goods.amounts.map(i => {
                  if(i.color === item.color){
                    i.cid = item.id
                    if(record.color === i.color){
                      this.initialSku.s2 = i.cid
                    }
                  }
                  return i
                })
              })
              this.goods.amounts.forEach((item,index) => {
                let obj = {}
                obj.id = index
                obj.price = this.goods.price*100
                obj.s1 = item.sid
                obj.s2 = item.cid
                obj.stock_num = item.amount
                this.sku.list.push(obj)
              })
              this.sku.tree.push(cobj)
            }
            this.showSku = true
            loading.clear()
          }else{
            loading.clear()
            this.$toast.fail({
              message: res.message
            })
          }
        }).catch(err=>{
          console.error(err)
          loading.clear()
        })
      },
      onBuyClicked(record) {
        this.$router.push({
          path: '/goodsDetails',
          query: {
            id: record.goodsId
          }
        })
      },
      onShowSku(record) {
        this.currentSelectGoods = record
        this.getGoodsById(record)
      },
      onLoadMore() {
        this.page+=1
        this.getShoppingCartList(1)
      },
      deleteShoppingCart(record) {
        const loading = this.$toast.loading({
          message: '加载中...',
          forbidClick: true
        })
        let params = {
          id: record.id
        }
        this.$ajax('/deleteShoppingCartById',JSON.stringify(params)).then(res => {
          loading.clear()
          if(res.status == 200){
            this.$toast.success('已从购物车成功移除!')
            this.getShoppingCartList()
          }else{
            this.$toast.fail(res.message)
          }
        }).catch(err => {
          loading.clear()
          console.error(err)
        })
      },
      getShoppingCartList(type) {
        this.loadingMore = true
        let params = {
          page: this.page,
          size: this.size
        }
        this.$ajax('/getShoppingCartList',JSON.stringify(params)).then(res => {
          if(res.status == 200){
            if(res.result.length<this.size){
              this.nomore = true
            }
            res.result.map(item => {
              item.checked = false
              return item
            })
            if(type === 1){
              this.datas = this.datas.concat(res.result)
            }else{
              this.datas = res.result
            }
            this.on()
          }else{
            this.$toast.fail(res.message)
            this.nomore = true
          }
          this.loadingMore = false
          this.finish = false
        }).catch(err => {
          this.loadingMore = false
          this.finish = false
          this.nomore = true
          console.error(err)
        })
      },
      deletes() {
        const loading = this.$toast.loading({
          message: '加载中...',
          forbidClick: true
        })
        let ids = this.datas.filter(item => {
          return item.checked
        }).map(item => {
          return item.id
        })
        if(ids.length<1){
          loading.clear()
          return this.$toast.fail('至少选择一个商品订单!')
        }
        this.$ajax('/deleteShoppingCart',JSON.stringify({ids})).then(res => {
          loading.clear()
          if(res.status == 200){
            this.checked = false
            this.$toast.success('已从购物车成功移除!')
            this.getShoppingCartList()
          }else{
            this.$toast.fail(res.message)
          }
        }).catch(err => {
          loading.clear()
          console.error(err)
        })
      },
      //返回上层
      //管理订单
      management() {
        this.isShow = !this.isShow
        // this.sun = this.datas.length
      },
      selectAll() {
        this.sum = 0
        for(let i in this.datas){
          if(!this.checked) {
            this.datas[i].checked = true
            this.sum += this.datas[i].price * this.datas[i].sku_num * 100
            this.sun+=this.datas[i].sku_num
          }else{
            this.datas[i].checked = false
            this.sun-=this.datas[i].sku_num
          }
        }
      },
      onSubmit() {
        console.log('我是提交')
      },
      on() {
        for (let i=0;i<this.datas.length;i++) {
          if (!this.datas[i].checked) {
            return this.checked = false
          }
        }
      },
      // 点击复选框触发
      onChangeCheck(record) {
        this.countPrice(record)
        let flag = false
        this.datas.forEach(item => {
          if(!item.checked) {
            flag = true
            this.sun+=item.sku_num
          }
        })
        if(flag) {
          this.checked = false
        }else{
          this.checked = true
        }
      },
      // 点击卡片任意地方（不包括卡片内的按钮）触发
      onShoppingHandle(record) {
        this.$router.push({
          path: '/goodsDetails',
          query: {
            id: record.goods_id
          }
        })
      },
      // 点击减号触发
      onSubstrctHandle(record) {
        this.countPrice(record)
      },
      //点击加号触发
      onPlusHandle(record) {
        this.countPrice(record)
      },
      // 循环获取每个选中的总价
      countPrice(record) {
        this.sum = 0
        for(let i in this.datas){
          if(this.datas[i].id == record.id) continue;
          if(this.datas[i].checked) {
            this.sum += this.datas[i].price * this.datas[i].sku_num * 100

          }
        }
        if(record.checked) {
          this.sum += record.price * record.sku_num * 100

        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .infomation{
    padding: 50px 0 100px 0;
    .content-box{
      padding: 0 3%;
      .van-swipe-cell{
        border-radius: 1rem;
        overflow: hidden;
        margin-bottom: 3%;
        .selected-sku-box{
          display: inline-block;
          .selected-sku{
            display: flex;
            align-items: center;
            padding: .5rem 1rem;
            background: #f7f8fb;
            color: #999;
            border-radius: .3rem;
            .van-icon{
              margin-left: 1rem;
            }
          }
        }
      }
      .delete-button {
        height: 100%;
      }
    }
    .decheckbox{
      width: 100%;
      text-align: left;
    }
    .manege{
      font-size: 1.3rem;
      white-space: nowrap;
    }
    .van-submit-bar{
      bottom: 50px;
    }
  }
</style>
