<template>
  <div class="settle-box">
    <x-header  slot="header" style="width:100%;left:0;top:0;z-index:100; background:#ffffff;"
    :left-options="{backText: '订单详情'}"></x-header>
    <div class="group-box" style="height: calc(100% - 116px);width:calc(100% - 20px);">
     <group>
      <cell :title="'菜品列表'"  :value="orderList.ordernum"></cell>
      <cell-form-preview :list="list"></cell-form-preview>
    </group>
    <group style="margin-top:10px;">
      <cell title="桌位" :value="tablenum">
      </cell>
    </group>

    </div>
  </div>
</template>

<script>
import { XHeader, FormPreview, Group, Cell, XButton, CellFormPreview, Popup, XSwitch, Checker, CheckerItem, Datetime } from 'vux'

export default {
  name: 'OrderDetail',
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

  },
  computed: {
    list: function () {
      let arr = []
      if (this.orderList.list === undefined || this.orderList.list.length === 0) { return [] }
      for (let i = 0, len = this.orderList.list.length; i < len; i++) {
        let obj = {}
        obj.label = this.orderList.list[i].dishName
        // obj.value =
        arr.push(obj)
      }
      return arr
    },
    tablenum: function () {
      if (this.orderList.list === undefined || this.orderList.list.length === 0) { return '' }
      return this.orderList.list[0].tableNumber
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
      tablesGeted: []
    }
  },
  mounted: function () {
    this.orderList = this.$route.query.orderList
    console.log(this.orderList)
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

