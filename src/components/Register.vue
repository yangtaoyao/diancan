<template>
  <view-box class="Login-box">
    <img class="guide-img" src='../assets/img/bg03.jpg'>
    <group>
      <h2 style="color:#ffffff">注册</h2>
      <x-input v-model="form.nickname" placeholder="昵称" type="text">
        <span class="iconfont icon-tubiao-" slot="label"  style="padding-right:10px;display:block;" width="24" height="24"></span>
      </x-input>
      <x-input v-model="form.userID" placeholder="账号id" type="text">
        <span class="iconfont icon-shoujihaomax" slot="label"  style="padding-right:10px;display:block;" width="24" height="24"></span>
      </x-input>
      <x-input v-model="form.password"  placeholder="密码" type="password">
        <span class="iconfont icon-mima" slot="label"  style="padding-right:10px;display:block;" width="24" height="24"></span>
      </x-input>
      <br>
      <x-button @click.native="doRegister()" type="default" :show-loading="false">注册</x-button>
      <divider @click.native="goto_login()" style="margin-top:16px">去登录</divider>
    </group>

  </view-box>
</template>

<script>
import { ViewBox, XInput, Group, XButton, Cell, Divider } from 'vux'
import { doRegister } from '../api/index.js'

export default {
  name: 'Register',
  components: {
    ViewBox, XInput, Group, XButton, Cell, Divider
  },
  data () {
    return {
      form: {
        nickname: '111',
        userID: '123',
        password: '123'
      }
    }
  },
  methods: {
    goto_login () {
      this.$router.push({ path: '/login' })
    },
    async doRegister () {
      if (this.form.nickname.trim() === '' || this.form.userID.trim() === '' || this.form.password.trim() === '') {
        this.$vux.toast.show({
          text: '输入框不能为空！',
          position: 'middle',
          type: 'cancel'
        })
        return
      }
      try {
        const response = await doRegister({
          userType: 'cus',
          nickname: encodeURI(this.form.nickname.trim()),
          phoneNum: this.form.userID.trim(),
          password: this.form.password.trim()
        })
        console.log(response.data)
        if (response.data.code === 1) {
          this.$vux.toast.show({
            text: '注册成功!',
            position: 'middle',
            type: 'success'
          })
          this.$router.push({ path: '/login' })
        } else {
          this.$vux.toast.show({
            text: response.data.message,
            position: 'middle',
            type: 'cancel'
          })
        }
      } catch (err) {
        console.error(err)
        this.$vux.toast.show({
          text: '注册失败,网络错误!',
          position: 'middle',
          type: 'cancel'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.guide-img {
  width: 100%;height: 100%;position: absolute;
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