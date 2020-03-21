<template>
  <div class="address">
    <l-header
      :title="'我的收货地址'"
    >
      <div class="add-address" slot="headerRight" @click="addresss">新增地址</div>
    </l-header>
    <div class="addressCenter">
      <div class="addressList" v-for="(item,index) in addressData" :key="index">
        <div>
          <div class="userAdderss">{{ item.address }}</div>

          <div class="user">
            <div>{{ item.name }}</div>
            <div>{{ item.phone }}</div>
          </div>
        </div>
        <div class="addressEdit" @click="editAddress(item)">
          <i :class="['iconfont', item.icon]"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LHeader from '~/components/l-header'
  export default {
    name: "index",
    components: {
      LHeader
    },
    data() {
      return {
        addressData: [
          {
            icon:'icon-bianji',
            name:'张三',
            phone: 14398752345,
            address: '湖北省 孝感市 孝南区 书院街道 新铺镇 罗家巷子',
            edit: 'records'
          },
          {
            icon:'icon-bianji',
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
      editAddress(item) {
        this.$router.push({
          path: '/my/address/addNewAddress',
          query: {
            status: 2,
            userAddressData:JSON.stringify(item)
          }
        })
      },
      //添加收货地址
      addresss() {
        this.$router.push({
          path: '/my/address/addNewAddress',
          query: {
            status: 1,
          }
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
  .add-address{
    white-space: nowrap;
  }
  .addressCenter {
    padding-top: 50px;
    .addressList {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 3% 2.5rem;
      font-size: 1.3rem;
      background-color: #fff;
      border-bottom: 1px solid #f1f1f1;
      .userAdderss {
        font-size: 1.3rem;
        font-weight: 600;
        width: 100%;
        padding-right: 2.5rem;
      }
      .user {
        display: flex;
        align-items: center;
        color: #cccccc;
        margin-top: .5rem;
        div:nth-child(1) {
          font-size: 1.2rem;
        }
        div:nth-child(2) {
          color: #cccccc;
          font-size: 1.2rem;
          margin-left: 1rem;
        }
      }
      .iconfont{
        font-size: 1.6rem;
        color: #ccc;
      }
    }
  }
}
</style>
