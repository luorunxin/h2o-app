<template>
  <div class="details">
    <l-search
      v-show="showSearch"
      @onCancel="onCancel"
    />
    <l-header>
      <van-search
        class="serach"
        slot="backRight"
        placeholder="点击搜索"
        input-align="center"
        @click="searchData"
        shape="round"
      />
      <van-icon slot="headerRight" size="2rem" name="cart-o" />
    </l-header>
    <div class="content">
      <van-swipe @change="onChange">
        <van-swipe-item v-for="(item, index) in goods.images" :key="index">
          <img :src="item.src" width="100%" height="35%" />
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">
            {{ current + 1 }}/{{imageLength}}
          </div>
        </template>
      </van-swipe>
      <div class="details-single">
        <div class="single-row">
          <span class="price-icon">¥</span>
          <span class="price">{{goods.price}}</span>
        </div>
        <div class="single-row">
          <h4>{{goods.title}}</h4>
        </div>
      </div>
      <div class="details-single">
        <div class="single-row location">
          <span>发货</span>
          <div>
            <van-icon name="location-o" />
            <span>{{goods.ship_address}}</span>
            <div class="line">|</div>
            <span>快递: {{goods.courier_fees}}</span>
          </div>
          <span>月销{{goods.monthly_sales}}</span>
        </div>
      </div>
      <div class="details-single">
        <div class="single-row location" @click.stop="selectSize">
          <span>选择</span>
          <div>请选择 尺码</div>
          <van-icon size="1rem" color="#999" name="arrow" />
        </div>
        <div class="single-row tag" @click.stop="selectSize">
          <div>
            <van-tag
              v-for="(item, index) in sizes"
              v-show="index<3"
              :key="index"
              color="#f7f8fb"
              text-color="#666"
            >
              {{item.size}}
            </van-tag>
            <van-tag color="#f7f8fb" text-color="#666">共{{sizes.length}}种尺码可选</van-tag>
          </div>
        </div>
        <div class="single-row location" @click.stop="isShowPopup">
          <span>参数</span>
          <div>
            <span
              v-for="(item, index) in parameters"
              :key="index"
              v-show="index<2"
              class="parameter"
            >
              {{item.key}}
            </span>...
          </div>
          <van-icon size="1rem" color="#999" name="arrow" />
        </div>
      </div>
    </div>
    <div class="Shopping">
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" @click="toService" />
        <van-goods-action-icon icon="star-o" text="收藏" @click="onCollect" />
        <van-goods-action-button type="warning" text="加入购物车" @click="addInformation" />
        <van-goods-action-button type="danger" text="立即购买" @click="onBuy" />
      </van-goods-action>
    </div>
    <van-sku
      v-model="showSku"
      :sku="sku"
      :goods="goodsImage"
      :goods-id="goods.id"
      close-on-click-overlay
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    />
    <van-popup
      v-model="showPopup"
      position="bottom"
      :style="{ height: '70%' }"
    >
      <p class="params-popup">产品参数</p>
      <van-cell-group>
        <van-cell
          v-for="(item, index) in parameters"
          :key="index"
        >
          <template #title>
            <span class="params-popup-key">{{item.key}}</span>
            <span class="params-popup-value">{{item.value}}</span>
          </template>
        </van-cell>
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script>
  import LHeader from "../../components/l-header/src/lHeader";
  import LSearch from "~/components/l-search/src/lSearch";
  export default {
    name: "index",
    components: {
      LHeader,
      LSearch
    },
    data() {
      return {
        id:null,
        goods:{},
        goodsImage: {
          picture: ''
        },
        showPopup: false,
        showSearch: false,
        current: 0,
        imageLength: 0,
        sizes: [],
        colors: [],
        parameters: [],
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
        }
      }
    },
    mounted() {
      this.id = this.$route.query.id;
      this.getGoodsById()
    },
    methods: {
      isShowPopup() {
        this.showPopup = true
      },
      onAddCartClicked() {

      },
      onBuyClicked() {

      },
      selectSize() {
        this.showSku = true
      },
      getGoodsById() {
        let params = {
          id: this.id
        }
        this.$ajax('/getGoodsById', JSON.stringify(params)).then(res=>{
          if(res.status == 200){
            this.goods = {...res.result}
            this.goods.price = this.goods.price.toFixed(2)
            if(this.goods.courier_fees>0){
              this.goods.courier_fees = this.goods.courier_fees.toFixed(2)
            }else{
              this.goods.courier_fees = '免运费'
            }
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
                }
                return i
              })
            })
            console.log(JSON.stringify(this.goods.amounts,null,2))
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
            this.parameters = this.getParameters(this.goods.parameter)
            this.imageLength = this.goods.images.length
            this.goodsImage.picture = this.goods.images[0].src
            this.sku.price = this.goods.price
            console.log(JSON.stringify(this.sku,null,2))
          }else{
            this.$toast.fail({
              message: res.message
            })
          }
        }).catch(err=>{
          console.error(err)
        })
      },
      onChange(index) {
        this.current = index;
      },
      searchData() {
        this.showSearch = true
      },
      onCancel() {
        this.showSearch = false
      },
      toService() {

      },
      onCollect() {

      },
      addInformation() {

      },
      onBuy() {

      },
      getParameters(val) {
        let arr = []
        if(val.indexOf(';') != -1){
          val.split(';').forEach(item => {
            let obj = {}
            obj.key = item.split(':')[0]
            obj.value = item.split(':')[1]
            arr.push(obj)
          })
        }else{
          let obj = {}
          obj.key = val.split(':')[0]
          obj.value = val.split(':')[1]
          arr.push(obj)
        }
        return arr
      },
    },
  }
</script>

<style scoped lang="scss">
.details {
  padding-top: 50px;
  .serach{
    width: 100%;
  }
  .content{
    .van-swipe{
      position: relative;
      background: white;
      .custom-indicator {
        position: absolute;
        right: 1rem;
        bottom: 1rem;
        padding: .5rem 1.5rem;
        font-size: 1.2rem;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 1.5rem;
        color: white;
      }
    }
  }
  .details-single{
    padding: 0 3%;
    background: white;
    margin-bottom: 1rem;
    font-size: 1.2rem;
    .single-row{
      padding: 1rem 0;
      .price-icon{
        font-size: 1.5rem;
        color: red;
      }
      .price{
        font-size: 2.3rem;
        color: red;
      }
      &>h4{
        font-size: 1.5rem;
      }
    }
    .location{
      display: flex;
      align-items: center;
      &>span{
        color: #777;
        white-space: nowrap;
      }
      &>div{
        display: flex;
        align-items: center;
        width: 100%;
        margin-left: 2rem;
        .line{
          color: #999;
          margin: 0 1rem;
        }
        .parameter:not(:first-child){
          margin-left: 1rem;
        }
      }
    }
    .tag{
      padding: 0 0 1rem 0;
      margin-left: 4rem;
      .van-tag{
        padding: .7rem;
        margin-right: .5rem;
      }
    }
  }
  .params-popup{
    font-size: 1.5rem;
    text-align: center;
    height: 50px;
    line-height: 50px;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 99999;
    background: white;
  }
  .van-cell__title{
    display: flex;
    font-size: 1.2rem;
    .params-popup-key{
      flex: 1;
      color: #888;
    }
    .params-popup-value{
      flex: 3;
    }
  }
}
</style>
