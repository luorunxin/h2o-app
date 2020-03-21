<template>
  <div class="modifyAddress">
    <div class="modifyAddressCenter">
      <div class="Contact-person"><van-field v-model="userAddressData.name" label="姓名" placeholder="姓名"/></div>
      <div class="phone"><van-field v-model="userAddressData.phone" type="tel" label="电话" placeholder="手机号"/></div>
      <div class="address"><van-field v-model="userAddressData.address" label="地址" placeholder="xxx路xxx小区"/></div>
<!--      <div class="house-numbur"><van-field v-model="userAddressData.houseNumbu" label="门牌号" placeholder="例: 5号楼203室"/></div>-->
      <div class="button"><van-button type="warning" size="large">保存</van-button></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        userAddressData: {}
      }
    },

    methods: {

    },
  }
</script>

<style scoped lang="scss">
  .modifyAddress {
    .modifyAddressCenter {
      .button {
        padding: 3%;
      }
    }
  }
</style>
