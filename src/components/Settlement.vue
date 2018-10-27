<template>
  <div class="settle-box">
    <x-header  slot="header" style="width:100%;left:0;top:0;z-index:100; background:#ffffff;"
    :left-options="{backText: '结算'}"></x-header>
    <div class="group-box" style="height: calc(100% - 116px);width:calc(100% - 20px);">
     <group>
      <cell :title="'总计金额'" :value="'￥'+accoutNum"></cell>
      <cell-form-preview :list="list"></cell-form-preview>
    </group>
    <group>
      <cell :title="'已选桌位'" :value="tablenum"></cell>
    </group>
    <!-- <group style="margin-top:10px;">
      <x-switch v-model="switchShow" @click.native="getTables()" title="选桌位" inline-desc="是否需要预约桌位"></x-switch>
      <cell>
        <span slot="icon" style="color:#666666">
          <span v-for="item in tablesSetted">{{item.value}}</span>
        </span>
      </cell>
      <datetime v-model="limitHourValue" format="YYYY-MM-DD HH:mm" :min-hour=9 :max-hour=22
      title="预定桌位时间"
      >
      </datetime>
    </group> -->
    
    </div>
    <group class="bottom-box">
      <cell>
        <span slot="title" style="margin-left:16px">总计：￥{{accoutNum}}</span>
        <x-button @click.native="submit()"  type="primary" mini>提交订单</x-button>
      </cell>
    </group>
    <!-- 选桌 -->
    <div v-transfer-dom>
    <popup v-model="show" position="bottom" should-scroll-top-on-show>
      <div style="padding-bottom:120px">
        <h4 style="padding-left:16px;color:#333333;padding-top:8px;">桌位状态</h4>
        <group label-width="5em" >
          <cell primary="content">
            <checker slot="inline-desc" v-model="tablesSetted" type="radio" default-item-class="checker-item" selected-item-class="checker-item-selected">
              <checker-item :disabled="false"
                :value="item" v-for="(item, index) in tablesNoSelected" 
                :key="index">{{item.value}}
              </checker-item>
            </checker>
          </cell>
        </group>
      </div>
      <div style="padding: 10px 16px;position:fixed;bottom:0;width:calc(100% - 32px);background:#eee">
        <x-button @click.native="submitTable" style="background:#1AAD19;"  type="primary">确定</x-button>
        <x-button @click.native="submitTable" type="default">取消</x-button>
      </div>
    </popup>
  </div>

  </div>
</template>

<script>
import { XHeader, FormPreview, Group, Cell, XButton, CellFormPreview, Popup, XSwitch, Checker, CheckerItem, Datetime } from 'vux'
import { submitOrder, getTables } from '../api/index.js'

import { getUserInfo } from '../assets/js/auth'

export default {
  name: 'Settlement',
  components: {
    XHeader,
    FormPreview,
    Group,
    Cell,
    XButton,
    CellFormPreview,
    Popup,
    XSwitch,
    Checker,
    CheckerItem,
    Datetime
  },
  methods: {
    async submit () {
      const userinfo = getUserInfo()
      if (userinfo.cus_userid === undefined || userinfo.cus_userid === null) {
        this.$vux.toast.show({
          text: '用户ID为空',
          position: 'middle',
          type: 'cancel'
        })
        return
      } else if (this.tablesSetted === undefined || this.tablesSetted === null || this.submitList === undefined || this.submitList.length === 0) {
        this.$vux.toast.show({
          text: '订单列表错误！',
          position: 'middle',
          type: 'cancel'
        })
        return
      }
      try {
        console.log(JSON.stringify(this.submitList))
        // console.log('limitHourValue:' + this.limitHourValue)
        // console.log('tablesSetted:' + JSON.stringify(this.tablesSetted))
        // console.log('cus_userid:' + JSON.stringify(userinfo))
        const response = await submitOrder({
          userId: userinfo.cus_userid,
          tablenum: this.tablenum,
          orderList: encodeURI(JSON.stringify(this.submitList))
        })
        console.log(response.data)
        if (response.data.code === 1) {
          this.$vux.toast.show({
            text: '提交成功!',
            position: 'middle',
            type: 'success'
          })
          // this.$router.go(-2)
          this.$router.push('/home')
        } else {
          this.$vux.toast.show({
            text: '提交失败!',
            position: 'middle',
            type: 'cancel'
          })
        }
      } catch (err) {
        console.error(err)
        this.$vux.toast.show({
          text: '提交失败,网络错误!',
          position: 'middle',
          type: 'cancel'
        })
      }
    },
    async getTables () {
      this.show = true
      console.log('getTables')
      try {
        const response = await getTables()
        console.log(response.data)
        if (response.data.code === 1) {
          this.tablesGeted = response.data.data
          // this.$vux.toast.show({
          //   text: response.data.message,
          //   position: 'middle',
          //   type: 'success'
          // })
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
          text: '提交失败,网络错误!',
          position: 'middle',
          type: 'cancel'
        })
      }
    },
    submitTable () {
      this.show = false
      if (this.tablesSetted === undefined || this.tablesSetted === null || this.tablesSetted.length === 0) {
        this.switchShow = false
      } else {
        this.switchShow = true
      }
    }
  },
  computed: {
    // 购物车总计
    accoutNum: function () {
      let sum = 0
      if (this.orderList === undefined || this.orderList.length === 0) { return 0 }
      for (let i = 0, len = this.orderList.length; i < len; i++) {
        sum += parseFloat(this.orderList[i].price) * parseInt(this.orderList[i].num)
      }
      console.log('购物车总计' + sum)
      return sum
    },
    list: function () {
      let arr = []
      if (this.orderList === undefined || this.orderList.length === 0) { return [] }
      for (let i = 0, len = this.orderList.length; i < len; i++) {
        let obj = {}
        obj.label = this.orderList[i].dishName + '  x ' + this.orderList[i].num
        obj.value = '￥' + parseFloat(this.orderList[i].price) * parseInt(this.orderList[i].num)
        arr.push(obj)
      }
      return arr
    },
    submitList: function () {
      let arr = []
      if (this.orderList === undefined || this.orderList.length === 0) { return [] }
      for (let i = 0, len = this.orderList.length; i < len; i++) {
        for (let j = 0, len = parseInt(this.orderList[i].num); j < len; j++) {
          arr.push(this.orderList[i])
        }
      }
      return arr
    },
    // 可选的空桌
    tablesNoSelected: function () {
      let arr = []
      if (this.tablesGeted === undefined || this.tablesGeted.length === 0) { return [] }
      for (let i = 0, len = this.tablesGeted.length; i < len; i++) {
        if (this.tablesGeted[i].state === false) {
          let obj = {}
          obj.value = this.tablesGeted[i].tablenum
          obj.state = this.tablesGeted[i].state
          obj.capacity = this.tablesGeted[i].capacity
          arr.push(obj)
        }
      }
      return arr
    }
  },
  data () {
    return {
      limitHourValue: '',
      switchShow: false,
      orderList: [],
      // 选中的
      tablesSetted: [],
      show: false, // 显示选桌
      // 获取的
      tablesGeted: [],
      tablenum: ''
    }
  },
  mounted: function () {
    this.orderList = this.$route.query.orderList
    this.tablenum = this.$route.query.tablenum
  }
}
</script>
<style lang="less" scoped>
.settle-box{
  height: 100%;
  width:100%;
}
.settle-box /deep/ .vux-header .vux-header-left .vux-header-back,.search-box /deep/ .vux-header .vux-header-left .left-arrow{
color:#333333
}
.group-box{
  padding: 10px 10px;
  position:fixed;
  bottom: 50px;
  top:46px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.group-box /deep/ .weui-cells{
  margin-top: 0;
  box-shadow:1px 1px 0px 0px rgba(0, 0, 0, 0.3)
}

// 桌位选择checker
.checker-item {
  border: 1px solid #ececec;
  padding:10px 25px;
  margin: 0 4px 4px 0;
  
}
.checker-item-selected {
  border: 1px solid green;
}
// 提交栏
.bottom-box{
  bottom:0;
  position:fixed;
  margin-top:0;
  width:100%;
}
.bottom-box /deep/ .weui-cells{
  margin-top:0;
  width:100%;
  background: #333333;
  color: #ffffff
}
.bottom-box /deep/ .weui-cells .weui-cell{
  padding:0;
  height: 50px;
}
.bottom-box /deep/ .weui-cells .weui-cell .weui-cell__ft{
  height:100%;
}
.bottom-box /deep/ .weui-cells .weui-cell .weui-cell__ft .weui-btn_mini{
  color:#333333;
  background-color:rgb(247, 202, 23);
  border-radius: 0;
  height:100%;
}
</style>

