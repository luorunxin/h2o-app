<template>
  <div class="modifyAddress">
    <div class="modifyAddressTop">
      <div>
        <van-icon size="2rem" name="arrow-left" color="#ccc" @click="back"/>
      </div>
      <div>新增地址</div>
    </div>
    <div class="modifyAddressCenter">
      <div class="Contact-person"><van-field v-model="modifyUserData.user" label="姓名" placeholder="姓名"/></div>
      <div class="phone"><van-field v-model="modifyUserData.phone" type="tel" label="电话" placeholder="手机号"/></div>
      <div class="address"><van-field v-model="modifyUserData.address" label="地址" placeholder="xxx路xxx小区"/></div>
      <div class="house-numbur"><van-field v-model="modifyUserData.houseNumbu" label="门牌号" placeholder="例: 5号楼203室"/></div>
      <div class="button"><van-button type="warning" size="large">保存</van-button></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        modifyUserData:[
          {
            //用户名字
            user: '',
            //手机号
            phone: null,
            //用户地址
            address: '',
            //用户门牌号
            houseNumbu: ''
          }
        ]
      }
    },
    methods: {
      back() {
        this.$router.go(-1)
      }
    },
    created() {
      console.log(this.$route.query.datas.user)
    }
  }
</script>

<style scoped lang="scss">
  .modifyAddress {
    .modifyAddressTop {
      display: grid;
      grid-template-rows: 100%;
      grid-template-columns: 40% 50%;
      font-size: 1.5rem;
      padding: 3%;
      background-color: #fff;
    }
    .modifyAddressCenter {
      .button {
        padding: 3%;
      }
    }
  }
</style>
