<template>
  <div class="l-card-container" @click="cardHandle">
    <img v-show="record.src" data-src="" :src="record.src"/>
    <div v-show="!record.src" class="image-icon-box">
      <svg t="1584181349872" class="icon image-icon" viewBox="0 0 1339 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1178"><path d="M671.914819 496.757199l-86.645987-92.356746-224.728183 262.61611-92.159823-83.967838-133.907435 170.771364h934.437588V582.891187l-219.647578-315.548932z m-339.21904-141.784343a112.364092 112.364092 0 1 0-112.639783-112.364092 112.52163 112.52163 0 0 0 112.639783 112.206554z m872.761399 443.548685c-0.236307-67.938331 0-652.168592 0-708.921713A80.895844 80.895844 0 0 0 1116.093657 0.511999c-57.383274-0.236307-965.236298 0-1026.361103 0A82.392457 82.392457 0 0 0 0.369034 89.324136c0.275692 49.112521 0 658.194427 0 708.921714a81.72292 81.72292 0 0 0 89.324136 89.087828c61.006652-0.275692 967.756908 1.260305 1026.361103 1.378459S1205.535947 866.459872 1205.535947 798.364003z m-1115.724624 4.174762V89.324136h1027.54264v713.214628H89.732554zM1339.443382 222.955879a88.930291 88.930291 0 0 0-89.363521-89.087829l1.142152 678.87131s20.046731 122.092073-72.073708 122.092073H134.276469A88.890906 88.890906 0 0 0 223.758143 1023.998031h1026.361103c72.506937 0 89.481674-36.824545 89.36352-91.884131S1339.443382 293.966204 1339.443382 222.955879z" fill="#BAB9BA" p-id="1179"></path></svg>
    </div>
    <div class="content">
      <h4>{{record.title}}</h4>
      <slot />
      <div class="content-btm">
        <div class="price-box">
          <span class="money-icon">¥</span>
          <span class="price">{{record.price | getPrice}}</span>
          <span class="payment-num">{{record.paymentNum}}人付款</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "lCard",
    data() {
      return {

      }
    },
    props: ['record'],
    methods: {
      cardHandle() {
        this.$emit('onCardHandle', this.record)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .l-card-container{
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 0 10px #dadada;
    overflow: hidden;
    img{
      width: 100%;
    }
    .image-icon-box{
      min-height: 150px;
      display: flex;
      justify-content: center;
      align-items: center;
      .image-icon{
        width: 50%;
      }
    }
    .content{
      width: 100%;
      padding: .5rem 1rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      h4{
        text-align: left;
        font-size: 1.5rem;
        font-weight: 400;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .content-btm{
        display: flex;
        align-items: flex-start;
        margin-top: 1.5rem;
        .price-box{
          color: red;
          display: flex;
          align-items: flex-end;
          .money-icon{
            font-size: 1rem;
          }
          .price{
            font-size: 1.7rem;
            margin-left: .2rem;
          }
          .payment-num{
            margin-left: 1rem;
            color: #777;
            font-size: 1rem;
          }
        }
      }
    }
  }
</style>