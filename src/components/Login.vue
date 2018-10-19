<template>
  <view-box class="Login-box">
    <img class="guide-img" src='../assets/img/bg03.jpg'>
    <group>
      <h2 style="color:#ffffff">欢迎登录</h2>
      <x-input v-model="form.userID" placeholder="账号" type="number">
        <span class="iconfont icon-shoujihaomax" slot="label"  style="padding-right:10px;display:block;" width="24" height="24"></span>
      </x-input>
      <x-input v-model="form.password" placeholder="密码" type="password">
        <span class="iconfont icon-mima" slot="label"  style="padding-right:10px;display:block;" width="24" height="24"></span>
      </x-input>
      <br>
      <x-button type="default" :show-loading="showLoading" @click.native="doLogin()">登录</x-button>
      <divider @click.native="goto_register()" style="margin-top:16px">注册</divider>
    </group>

  </view-box>
</template>

<script>
import { ViewBox, XInput, Group, XButton, Cell, Divider } from 'vux'
import { mapActions } from 'vuex'
// import { doLogin } from '../api/index.js'

export default {
  name: 'Login',
  components: {
    ViewBox, XInput, Group, XButton, Cell, Divider
  },
  data () {
    return {
      showLoading: false,
      form: {
        userID: '55160111',
        password: '55160111'
      },
      be2333: function (value) {
        return {
          valid: value === '2333',
          msg: 'Must be 2333'
        }
      }

    }
  },
  methods: {
    goto_register () {
      this.$router.push({ path: '/register' })
    },
    ...mapActions(['createLoginInfo']),
    // async doLogin () {
    doLogin () {
      if (this.form.userID.trim() === '' || this.form.password.trim() === '') {
        this.$vux.toast.show({
          text: '请正确填写用户名和密码！',
          position: 'middle',
          type: 'cancel'
        })
        return
      }
      // try {
      //   const response = await doLogin({
      //     userType: 'cus',
      //     phoneNum: this.form.userID.trim(),
      //     password: this.form.password.trim()
      //   })
      //   console.log(response.data)
      //   if (response.data.code === 1) {
      //     this.createLoginInfo({
      //       id: response.data.data.cus_userid,
      //       data: response.data.data
      //     })
      //     this.$vux.toast.show({
      //       text: response.data.message,
      //       position: 'middle',
      //       type: 'success'
      //     })
      //     this.$router.push({ path: '/home' })
      //   } else {
      //     this.$vux.toast.show({
      //       text: response.data.message,
      //       position: 'middle',
      //       type: 'cancel'
      //     })
      //   }
      // } catch (err) {
      //   console.error(err)
      // }

      const thisObj = this
      setTimeout(function () {
        thisObj.createLoginInfo({
          id: 'cus_userid',
          data: {
            cus_time: '2018-10-16',
            cus_userid: '55160131',
            iDcard: '55160131',
            nickName: 'yty',
            balance: '0'
          }
        })
        thisObj.$vux.toast.show({
          text: '登录成功',
          position: 'middle',
          type: 'success'
        })
        thisObj.$router.push({ path: '/home' })
      }, 3000)
    }
  }
}
</script>

<style lang="less" scoped>
.guide-img {
  width: 100%;
  height: 100%;
  position: absolute;
  -webkit-filter: blur(2px);
  /* Chrome, Opera */
  -moz-filter: blur(2px);
  -ms-filter: blur(2px);
  filter: blur(2px);
}
.Login-box /deep/ .weui-tab__panel .weui-cells{
  margin-top: 150px;
  padding:0 10%;
  background: none
}
.Login-box /deep/ .weui-tab__panel  .weui-cells:before , .Login-box /deep/ .weui-tab__panel  .weui-cells:after{
  height: 0;
  border: 0;
}
.Login-box /deep/ .weui-tab__panel .weui-cells .weui-cell{
  background: rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  color: #FFFFFF;
}
.Login-box /deep/ .weui-tab__panel .weui-cells .weui-cell .weui-input{ 
   color: #FFFFFF;
}
</style>