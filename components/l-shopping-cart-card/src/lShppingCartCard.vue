<template>
  <div class="l-shopping-cart-card" @click.stop="shoppingHandle">
    <div class="left-box">
      <div class="checkbox-box">
        <van-checkbox checked-color="#ff8000" v-model="record.checked" @click.stop="changeCheck" />
      </div>
      <div v-show="record.src" class="goods-picture-box">
        <img :src="record.src" class="goods-picture">
      </div>
      <div v-show="!record.src" class="no-picture">
        <svg t="1584181349872" class="icon image-icon" viewBox="0 0 1339 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1178"><path d="M671.914819 496.757199l-86.645987-92.356746-224.728183 262.61611-92.159823-83.967838-133.907435 170.771364h934.437588V582.891187l-219.647578-315.548932z m-339.21904-141.784343a112.364092 112.364092 0 1 0-112.639783-112.364092 112.52163 112.52163 0 0 0 112.639783 112.206554z m872.761399 443.548685c-0.236307-67.938331 0-652.168592 0-708.921713A80.895844 80.895844 0 0 0 1116.093657 0.511999c-57.383274-0.236307-965.236298 0-1026.361103 0A82.392457 82.392457 0 0 0 0.369034 89.324136c0.275692 49.112521 0 658.194427 0 708.921714a81.72292 81.72292 0 0 0 89.324136 89.087828c61.006652-0.275692 967.756908 1.260305 1026.361103 1.378459S1205.535947 866.459872 1205.535947 798.364003z m-1115.724624 4.174762V89.324136h1027.54264v713.214628H89.732554zM1339.443382 222.955879a88.930291 88.930291 0 0 0-89.363521-89.087829l1.142152 678.87131s20.046731 122.092073-72.073708 122.092073H134.276469A88.890906 88.890906 0 0 0 223.758143 1023.998031h1026.361103c72.506937 0 89.481674-36.824545 89.36352-91.884131S1339.443382 293.966204 1339.443382 222.955879z" fill="#BAB9BA" p-id="1179"></path></svg>
      </div>
    </div>
    <div class="rigth-content">
      <div class="title">{{record.title}}</div>
      <div class="slot">
        <slot />
      </div>
      <div class="price-box">
        <span class="price">¥ {{(record.price*record.sku_num).toFixed(2)}}</span>
        <div class="count-box">
          <span class="subtract" @click.stop="substrctHandle">-</span>
          <span class="number">{{record.sku_num}}</span>
          <span class="plus" @click.stop="plusHandle">+</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "lShppingCartCard",
    data() {
      return {

      }
    },
    props: ['record'],
    methods: {
      changeCheck() {
        this.record.checked = !this.record.checked
        this.$emit('onChangeCheck', this.record)
      },
      shoppingHandle() {
        this.$emit('onShoppingHandle', this.record)
      },
      substrctHandle() {
        if(this.record.sku_num == 1) return this.$toast('宝贝不能再减了')
        this.record.sku_num = parseInt(this.record.sku_num) - 1
        this.$emit('onSubstrctHandle', this.record)
      },
      plusHandle() {
        this.record.sku_num = parseInt(this.record.sku_num) + 1
        this.$emit('onPlusHandle', this.record)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .l-shopping-cart-card{
    width: 100%;
    background: white;
    display: flex;
    align-items: flex-start;
    padding: 3% 0;
    .left-box{
      display: flex;
      align-items: center;
      .checkbox-box{
        padding: 0 1.5rem;
      }
      .goods-picture-box{
        width: 8rem;
        height: 8rem;
        border-radius: .5rem;
        overflow: hidden;
        .goods-picture{
          width: 100%;
          height: 100%;
        }
      }
      .no-picture{
        width: 8rem;
        height: 8rem;
        border-radius: .5rem;
        border: 1px solid #f7f8fb;
        display: flex;
        align-items: center;
        justify-content: center;
        .image-icon{
          width: 50%;
        }
      }
    }
    .rigth-content{
      padding: 0 1.5rem;
      width: 100%;
      .title{
        font-size: 1.3rem;
        font-weight: 400;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .slot{
        margin: 1rem 0;
      }
      .price-box{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .price{
          font-size: 1.4rem;
          font-weight: 500;
          color: red;
        }
        .count-box{
          border: 1px solid #e8e9ec;
          border-radius: .5rem;
          display: flex;
          align-items: center;
          .subtract{
            padding: .1rem .7rem;
            border-right: 1px solid #e8e9ec;
            color: #dadada;
          }
          .number{
            padding: .1rem 1.5rem;
          }
          .plus{
            padding: .1rem .7rem;
            border-left: 1px solid #e8e9ec;
            color: #dadada;
          }
        }
      }
    }
  }
</style>
