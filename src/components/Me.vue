<template>
  <div class="me-box">
    <card>
      <a slot="content"  class="weui-media-box weui-media-box_appmsg" 
      style="display: flex;
            -webkit-box-align: center;
            -webkit-align-items: center;
            align-items: center;"
            >
        <div class="" style="margin-right: .8em;">
          <img  style="width:50px;height:50px;border-radius:50%;" src="https://ws1.sinaimg.cn/large/663d3650gy1fq6824ur1dj20ia0pydlm.jpg">
        </div>
        <div class="weui-media-box__bd" style="flex: 1;">
          昵称：{{loginInfo.nickName}}
          <h6 style="color:red">id：{{loginInfo.cus_userid}}</h6>
        </div>
      </a>
    </card>
    <group>
      <cell title="余额" :value="loginInfo.balance">
      </cell>
      <cell title="办卡日期" :value="loginInfo.cus_time">
      </cell>
      <cell title="IDcard " :value="loginInfo.iDcard">
      </cell>
    </group>
    <p>{{loginInfo}}</p>
  
  </div>
</template>

<script>
import { Group, Cell, Card } from 'vux'
import { getUserInfo } from '../assets/js/auth'

export default {
  name: 'Me',
  components: {
    Group,
    Cell,
    Card
  },
  computed: {
    loginInfo: function () {
      console.log(getUserInfo())
      return getUserInfo()
    }

  },
  data () {
    return {
      // loginInfo: {
      //   id: '',
      //   data: {
      //     cus_time: '2018-10-16',
      //     cus_userid: '55160131',
      //     iDcard: '55160131',
      //     nickName: 'yty',
      //     balance: '0'
      //   }
      // }
    }
  }
}
</script>
<style lang="less" scoped>
.me-box{
 width:100%;
 overflow: hidden;
}
.me-box /deep/ .weui-panel__bd{
  padding: 16px;
 
}
</style>
