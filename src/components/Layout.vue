<template>
<transition name="fade">
  <view-box>
    <x-header  slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;"
    :left-options="{showBack: true,preventGoBack:true}" :right-options="{showMore: true}" @on-click-more="clickMore"
    >
    <span slot="overwrite-left">{{key}}</span>
    </x-header>
    <!-- 数据缓存不刷新 -->
    <!-- <keep-alive> -->
      <router-view style="padding-top: 46px" class="main"></router-view>
    <!-- </keep-alive> -->
    <tabbar slot="bottom" v-model="indexActive">
      <tabbar-item link="/home/table"  @dblclick="refreshTable()">
        <span slot="icon" class="iconfont icon-shouye3" ></span>
        <span slot="icon-active" class="iconfont icon-shouye" ></span>
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item link="/home/order" @on-item-click="itemClick()">
        <span slot="icon" class="iconfont icon-dingdan2"></span>
        <span slot="icon-active" class="iconfont icon-dingdan" ></span>
        <span slot="label">订单</span>
      </tabbar-item>
      <tabbar-item link="/home/me" @on-item-click="itemClick()">
        <span slot="icon" class="iconfont icon-home"></span>
        <span slot="icon-active" class="iconfont icon-tubiao-" ></span>
        <span slot="label">我的</span> 
      </tabbar-item>
    </tabbar>

    <div v-transfer-dom>
      <popup v-model="show" @on-hide="log('hide')" @on-show="log('show')">
        <div class="popup0">
          <group>
            <x-input title="退出登录" class="weui-vcode">
              <x-button @click.native="doLogout()" slot="right" type="default"  style="background-color: none;border:0;color:#666666;font-size:18px;" class="iconfont icon-tuichu   " mini></x-button>
            </x-input>
          </group>
        </div>
      </popup>
    </div>
  </view-box>
   
</transition>
</template>

<script>
import { XInput, XButton, Group, TransferDom, Popup, XSwitch, XHeader, Tabbar, TabbarItem, ViewBox } from 'vux'
import { removeToken, removeUserInfo } from '../assets/js/auth'
import { hub } from '../assets/js/hub'
export default {
  name: 'Layout',
  directives: {
    TransferDom
  },
  components: {
    Tabbar,
    TabbarItem,
    ViewBox,
    XHeader,
    XSwitch,
    Popup,
    Group,
    XInput,
    XButton
  },
  methods: {
    // 刷新数据
    refreshTable1 () {
      this.$vux.toast.show({
        text: '双击刷新数据',
        position: 'middle',
        type: 'text'
      })
    },
    refreshTable () {
      console.log('==========reflashTable===========')
      hub.$emit('refreshTable', '这是传递的值')
      this.$vux.toast.show({
        text: '正在刷新数据',
        position: 'middle',
        type: 'text'
      })
      return false
    },
    clickMore () {
      if (this.show) {
        this.show = false
      } else {
        this.show = true
      }
    },
    log (str) {
      // console.log(str)
    },
    itemClick: function () {
      console.log(this.indexActive)
      console.log(this.key)
    },
    doLogout () {
      removeToken()
      removeUserInfo()
      this.$router.push({ path: '/' })
      this.$vux.toast.show({
        text: '退出成功',
        position: 'middle',
        type: 'text'
      })
    }
  },
  computed: {
    // 标题栏
    key () {
      return this.$route.name !== undefined ? this.$route.name : 'view-' + +new Date()
    }
  },
  created: function () {
    if (this.$route.path === '/home/order') {
      this.indexActive = 1
    } else if (this.$route.path === '/home/table') {
      this.indexActive = 0
    } else {
      this.indexActive = 2
    }
    // console.log('=========Layout created=========')
    // console.log(this.$route.path)
    // console.log(this.indexActive)
  },
  data () {
    return {
      // 双击刷新
      first: null,
      show: false,
      indexActive: 0
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.vux-header {
  background-color: #ffffff;
}
.vux-header .vux-header-left span,
.vux-header .vux-header-left {
  color: #333333;
}
</style>