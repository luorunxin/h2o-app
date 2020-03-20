<template>
  <div class="addNewAddress">
    <l-header
      :title="'新增地址'"
    />
    <div class="center">
      <div class="Contact-person"><van-field v-model="userData.user" label="姓名" placeholder="姓名"/></div>
      <div class="phone"><van-field v-model="userData.phone" type="tel" label="电话" placeholder="手机号"/></div>
      <div class="address"><van-field v-model="userData.address" label="地址" placeholder="xxx路xxx小区"/></div>
      <div class="house-numbur"><van-field v-model="userData.houseNumbu" label="门牌号" placeholder="例: 5号楼203室"/></div>
      <div class="button"><van-button type="warning" size="large" @click="save">保存地址</van-button></div>
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
        userData: [
          {
            //姓名
            user: '',
            //电话
            phone:null,
            //地址
            address: '',
            //门牌号
            houseNumbu: ''
          }
        ]
      }
    },
    methods: {
      back() {
        //退回上一页面
        this.$router.go(-1)
      },
      save() {
        this.$router.push({
          path: '/my/address',
          query: {
            id: '1',
            datas:this.userData
          }
        })

      }
    }
  }
</script>

<style scoped lang="scss">
.addNewAddress {
  padding-top: 50px;
  .center {
    .button {
      padding: 3%;
    }
  }
}
</style>
