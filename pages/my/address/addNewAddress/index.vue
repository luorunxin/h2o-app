<template>
  <div class="addNewAddress">
    <l-header
      :title="status==1?'新增地址':'编辑地址'"
    />
    <div class="center">
      <div class="Contact-person"><van-field v-model="userAddressData.name" label="姓名" placeholder="姓名"/></div>
      <div class="phone"><van-field v-model="userAddressData.phone" type="tel" label="电话" placeholder="手机号"/></div>
      <div class="address"><van-field v-model="userAddressData.address" label="地址" placeholder="xxx路xxx小区"/></div>
<!--      <div class="house-numbur"><van-field v-model="userData.houseNumbu" label="门牌号" placeholder="例: 5号楼203室"/></div>-->
      <div class="btns">
        <div class="button"><van-button type="warning" size="large" @click="add">确定</van-button></div>
        <div class="button" v-if="status == 2"><van-button type="warning" size="large" @click="del">删除</van-button></div>
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
        userAddressData: {},
        status: null,
      }
    },
    created() {
      if(this.$route.query.userAddressData)
        this.userAddressData = JSON.parse(this.$route.query.userAddressData)
      this.status = this.$route.query.status
    },
    methods: {
      add() {
        this.$router.go(-1)
      },
      del() {

      }
    }
  }
</script>

<style scoped lang="scss">
.addNewAddress {
  padding-top: 50px;
  .center {
    .btns{
      display: flex;
      .button {
        flex: 1;
        padding: 3%;
      }
    }
  }
}
</style>
