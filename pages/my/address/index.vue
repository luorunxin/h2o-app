<template>
  <div class="address">
    <div class="addressTop">
      <div><van-icon name="arrow-left" /></div>
      <div>我的收货地址</div>
      <div>添加收货地址</div>
    </div>
    <div class="addressCenter">
      <div class="addressList" v-for="(item,index) in addressData" :key="index">
        <div><van-icon :name="item.icon" size="3rem"/></div>
        <div>
          <div class="user">
            <div>{{ item.name }}</div>
            <div>{{ item.phone }}</div>
          </div>
          <div class="userAdderss">{{ item.address }}</div>
        </div>
        <div class="addressEdit">{{ item.edit }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        addressData: [
          {
            icon:'friends-o',
            name:'张三',
            phone: 14398752345,
            address: '湖北省 孝感市 孝南区 书院街道 新铺镇 罗家巷子asdfasdfasdfasdfasdfasdf',
            edit: '编辑'
          }
        ]
      }
    },
  }
</script>

<style scoped lang="scss">
.address {
  background-color: #fff;
  .addressTop {
    display: flex;
    justify-content: space-between;
    padding: 3%;
    font-size: 1.5rem;
    align-items: center;
    background-color: #f4f4f4;
    div:nth-child(3) {
      font-size: 1.2rem;
    }
  }
  .addressCenter {
    .addressList {
      display: grid;
      grid-template-rows: 100%;
      grid-template-columns: 10% auto 10%;
      padding: 3%;
      align-items: center;
      font-size: 1.3rem;
      .user {
        display: grid;
        grid-template-rows: 100%;
        grid-template-columns: 20% auto;
        align-items: center;
        div:nth-child(1) {
          font-size: 1.5rem;
        }
        div:nth-child(2) {
          color: #cccccc;
          font-size: 1.2rem;
        }
      }
      .addressEdit {
        position: relative;
        &:after {
          content: '';
          display: grid;
          width: .1rem;
          height: 2rem;
          border-right: 1px solid #cccccc;
          color: red;
          position: absolute;
          top: -1%;
          left: -10%;
        }
      }
    }
  }
}
</style>
