<template>
  <div class="settle-box">
    <x-header  slot="header" style="width:100%;left:0;top:0;z-index:100; background:#ffffff;"
    :left-options="{backText: '结算'}"></x-header>
    <!-- <form-preview header-label="总计金额" :header-value="'￥'+accoutNum" :body-items="list" :footer-buttons="buttons1">
    </form-preview> -->
     <group>
      <cell :title="'总计金额'" :value="'￥'+accoutNum"></cell>
      <cell-form-preview :list="list"></cell-form-preview>
    </group>
    <br>
    {{orderList}}
    <group class="bottom-box">
      <cell>
        <span slot="title" style="margin-left:16px">总计：￥{{accoutNum}}</span>
        <x-button @click.native="submit()"  type="primary" mini>提交订单</x-button>
      </cell>
    </group>
  </div>
</template>

<script>
import { XHeader, FormPreview, Group, Cell, XButton, CellFormPreview } from 'vux'
import { submitOrder } from '../api/index.js'

export default {
  name: 'Settlement',
  components: {
    XHeader, FormPreview, Group, Cell, XButton, CellFormPreview
  },
  methods: {
    async submit () {
      if (this.tableNum === '' || this.orderList === undefined || this.orderList === null) {
        this.$vux.toast.show({
          text: '订单列表错误！',
          position: 'middle',
          type: 'cancel'
        })
        return
      }
      try {
        const response = await submitOrder({
          userId: '',
          time: '',
          tableNum: this.tableNum,
          orderList: this.orderList
        })
        console.log(response.data)
        if (response.data.code === 1) {
          this.$vux.toast.show({
            text: '提交成功!',
            position: 'middle',
            type: 'success'
          })
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
    }
  },
  computed: {
    // 购物车总计
    accoutNum: function () {
      let sum = 0
      if (this.orderList === undefined || this.orderList.length === 0) { return 0 }
      for (let i = 0, len = this.orderList.length; i < len; i++) {
        sum += parseFloat(this.orderList[i].Price) * parseInt(this.orderList[i].num)
      }
      console.log('购物车总计' + sum)
      return sum
    },
    list: function () {
      let arr = []
      if (this.orderList === undefined || this.orderList.length === 0) { return [] }
      for (let i = 0, len = this.orderList.length; i < len; i++) {
        let obj = {}
        obj.label = this.orderList[i].Name + '  x ' + this.orderList[i].num
        obj.value = '￥' + parseFloat(this.orderList[i].Price) * parseInt(this.orderList[i].num)
        arr.push(obj)
      }
      return arr
    }
  },
  data () {
    return {
      orderList: [],
      tableNum: ''
    }
  },
  mounted: function () {
    this.orderList = this.$route.query.orderList
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
  height: 46px;
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

