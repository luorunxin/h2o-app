<template>
  <div class="login">
    <div class="back" @click="back"><van-icon name="arrow-left" /></div>
   <div class="loginBox">
     <div class="loginIcon">
       <i class="iconfont icon-touxiang"></i>
     </div>
     <div class="loginInput">
       <van-cell-group>
         <van-field
           v-model="phone"
           label="手机号"
           placeholder="请输入手机号"
           :error-message="message"
           type="number"
           maxlength="11"
         />
         <van-field
           v-model="code"
           center
           :error-message="message1"
           label="短信验证码"
           type="number"
           maxlength="6"
           placeholder="请输入短信验证码"
         >
           <template #button>
             <van-button size="small" type="primary" color="#ff8000" @click="checkCode">发送验证码</van-button>
           </template>
         </van-field>
       </van-cell-group>
     </div>
     <div class="loginButton">
       <div style="margin: 16px;">
         <van-button round block type="info" color="#ff8000" native-type="submit" @click="submit">
           提交
         </van-button>
       </div>
     </div>
   </div>
  </div>
</template>

<script>
  import Storage from '~/utils/storage.js'
  export default {
    name: "index",
    data() {
      return {
        //手机号
        phone: '',
        //输入错误时提示信息
        message:'',
        //验证码错误时提示
        message1:'',
        //验证码
        code:''
      }
    },
    methods: {
      //返回
      back() {
        this.$router.back()
      },
      VerifyPhone() {
        //验证手机号
        if (/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone)) {
          this.message = null;
          return true
        } else {
          this.message = '请输入正确的手机号'
          return false
        }
      },
      checkCode() {
        if(!this.VerifyPhone()) return
      },
      submit() {
        if(!this.VerifyPhone()) return
        let location_info = Storage.getLocal('location'), location = ''
        if(location_info.formattedAddress){
          location = location_info.formattedAddress
        }else{
          location = location_info.province + location_info.city
        }
        let params = {
          phone: this.phone,
          code: this.code,
          location: location
        };
        this.$ajax('/login',JSON.stringify(params)).then(res => {
          if(res.status == 200){
            Storage.setLocal('user_info',res.result)
            let go_path = Storage.getLocal('go_path')
            if(go_path){
              this.$router.push(go_path.path)
            }else{
              this.$router.push('/')
            }
          }else{
            this.$notify({ type: 'danger', message: res.message })
          }
        }).catch(err => {
          console.error(err)
        });
      }
    }
  }
</script>

<style scoped lang="scss">
.login {
  background: #fff;
  height: 100vh;
  display: grid;
  .back {
    padding: 3%;
    font-size: 2.5rem;
  }
  .loginBox {
    display: grid;
    grid-template-rows: repeat(5,1fr);
    grid-template-columns: repeat(10,10%);
    .loginIcon {
      grid-row-start: 2;
      grid-row-end: 3;
      grid-column-start: 2;
      grid-column-end: 5;
      i {
        font-size: 10rem;
        color: #ff8000;
      }
    }
    .loginInput {
      grid-row-start: 3;
      grid-row-end: 5;
      grid-column-start: 2;
      grid-column-end: 11;
      font-size: .2rem;
    }
    .loginButton {
      grid-row-start: 4;
      grid-row-end: 5;
      grid-column-start: 3;
      grid-column-end: 9;
    }
  }
}
</style>
