<template>
  <div>
    <nuxt />
<!--    <van-tabbar :active="active">-->
<!--      <van-tabbar-item name="home" icon="home-o" to="/home">首页</van-tabbar-item>-->
<!--      <van-tabbar-item name="service" icon="search" to="/service">客服</van-tabbar-item>-->
<!--      <van-tabbar-item name="information" icon="friends-o" to="/information">信息</van-tabbar-item>-->
<!--      <van-tabbar-item name="my" icon="setting-o" to="/my">我的</van-tabbar-item>-->
<!--    </van-tabbar>-->
    <van-tabbar v-model="active">
      <van-tabbar-item name="home" icon="home-o" to="/home">标签</van-tabbar-item>
      <van-tabbar-item name="service" icon="search" to="/service">标签</van-tabbar-item>
      <van-tabbar-item name="information" icon="friends-o" to="/information">标签</van-tabbar-item>
      <van-tabbar-item name="my" icon="setting-o" to="/my">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        active: 'home',
      }
    },
   methods:{

   }
  }
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

html, body{
  width: 100%;
  height: 100%;
  background: #f1f1f1;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
