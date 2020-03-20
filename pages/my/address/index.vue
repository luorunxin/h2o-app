<template>
  <div class="address">
    <div class="addressTop">
      <div><van-icon name="arrow-left" /></div>
      <div>我的收货地址</div>
      <div @click="addresss">添加收货地址</div>
    </div>
    <div class="addressCenter">
      <div class="addressList" v-for="(item,index) in addressData" :key="index">
        <div>
          <div class="userAdderss">{{ item.address }}</div>

          <div class="user">
            <div>{{ item.name }}</div>
            <div>{{ item.phone }}</div>
          </div>
        </div>
        <div class="addressEdit" @click="editAddress"><van-icon size="2.5rem" color="#ccc" :name="item.edit" /></div>
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
            address: '湖北省 孝感市 孝南区 书院街道 新铺镇 罗家巷子',
            edit: 'records'
          }
        ],
        add:[]
      }
    },
    methods: {
      //编辑地址
      editAddress() {
        this.$router.push({
          path: '/my/address/editAddress',
          query: {
            id:1,
            userAddressData:this.addressData
          }
        })
      },
      //添加收货地址
      addresss() {
        this.$router.push({
          path: '/my/address/addNewAddress',
        })
      }
    },
    mounted() {
      this.add.push(this.$route.query.data)
      console.log(this.add)
    }
  }
</script>

<style scoped lang="scss">
.address {
  .addressTop {
    display: flex;
    justify-content: space-between;
    padding: 3%;
    font-size: 1.5rem;
    background-color: #FFFFFF;
    div:nth-child(3) {
      font-size: 1.2rem;
    }
  }
  .addressCenter {
    .addressList {
      display: grid;
      grid-template-rows: 100%;
      grid-template-columns: 80% 20%;
      padding: 3%;
      justify-items: center;
      align-items: center;
      font-size: 1.3rem;
      background-color: #fff;
      .userAdderss {
        font-size: 1.3rem;
        font-weight: 600;
      }
      .user {
        display: grid;
        grid-template-rows: 100%;
        grid-template-columns: 20% auto;
        align-items: center;
        color: #cccccc;
        div:nth-child(1) {
          font-size: 1.2rem;
        }
        div:nth-child(2) {
          color: #cccccc;
          font-size: 1.2rem;
        }
      }
    }
  }
}
</style>
