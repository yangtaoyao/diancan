<template>
  <div class="viewbox">
    <!--详情弹出框-->
    <div v-transfer-dom>
      <x-dialog v-model="showDetail" class="dialog-demo" :hide-on-blur="true">
        <div class="weui-media-box__bd" style="flex: 1;">
          <h4 style="color:red"><span>detailData.name</span>￥detailData.price</h4>
        </div>
        <div @click="showDetail=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
    <div class="mai-box">
      <h3 style="padding-left:16px;color:#333333;">桌位状态</h3>
      <group label-width="5em" :title="'桌号'" class="box">
        <cell primary="content">
          <checker slot="inline-desc" v-model="tableSelected" type="radio" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
            <checker-item :disabled="false" @click.prevent.native="itemClick(item)" 
              :value="item" v-for="(item, index) in tablesNoSelected" 
              :key="index">{{item.value}}
            </checker-item>
          </checker>
        </cell>
      </group>
    </div>
   

    <group class="cart-box">
      <cell>
        <div slot="icon" >
          <span>已选桌号 ：</span>
        </div>
        <span slot="title">{{tableSelected.value}}</span>
        <x-button @click.native="gotoMenu()"  type="primary" mini>去选菜</x-button>
      </cell>
    </group>
   
  </div>
</template>


<script>
import { ViewBox, Sticky, Divider, XButton, Panel, Card, XDialog, XInput, Popup, Group, Cell,
TransferDomDirective as TransferDom, Search, Checker,
    CheckerItem,
    Confirm
     } from 'vux'
// import { hub } from '../assets/js/hub'
import { getTables } from '../api/index.js'

export default {
  name: 'Table',
  directives: {
    TransferDom
  },
  components: {

    Sticky,
    Divider,
    XButton,
    ViewBox,
    Panel,
    Card,
    XDialog,
    Search,
    XInput,
    Popup,
    Group,
    Cell,
    Checker,
    CheckerItem,
    Confirm
  },
  methods: {
    itemClick (item) {

    },
    gotoMenu () {
      this.$router.push({path: '/menu', query: {tablenum: this.tableSelected.value}})
    },
    show_detail ($event, item02) {
      console.log('show_detail')
      this.showDetail = true
      this.detailData = item02
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
    }
  },
  computed: {
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
  created: function () {
    this.getTables()
  },
  data () {
    return {
      showDetail: false, // 打开详情x-dialog
      detailData: { },
      tablesGeted: [],
      tableSelected: {}
    }
  }

}
</script>

<style lang="less" scoped>
@import '~vux/src/styles/close';
.viewbox{
  position: relative;
  height: 100%;
  width: 100%;
}
.viewbox /deep/ .weui-tab__panel{
  position: relative;
}

 /*详情弹出框
 */
.dialog-demo {
  .img-box {
    height: 350px;
    overflow: hidden;
  }
  .number-box{
    padding: 20px 15px;
  }
  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
}
/*
*搜索
*/
.search-box /deep/ .weui-search-bar{
  background: #ffffff;
}
.search-box /deep/ .weui-search-bar .weui-search-bar__box,.search-box /deep/ .weui-search-bar .weui-search-bar__label,{
  background: #f2f2f2;
}

/*
*/
.cart-box{
  bottom:50px;
  position:fixed;
  margin-top:0;
  width:100%;
}
.cart-box /deep/ .weui-cells{
  margin-top:0;
  width:100%;
}
.cart-box /deep/ .weui-cells .weui-cell .weui-cell__ft .weui-btn_mini{
  color:#333333;
  background-color:rgb(247, 202, 23);
}

.mai-box{
  height: 100%;
  // width:100%;
  /* width:calc(100% - 32px); */
  padding-top: 0;
  /* padding: 50px 16px; */
}
.mai-box .box{
  overflow-y:scroll;
  position:fixed;
  top:76px;
  bottom:100px;
  width:100%;
  // height: 100%;
}
// checker
.box /deep/ .vux-checker-box{
  margin: 8px 0;
}
.demo1-item {
  border: 1px solid #ececec;
  padding:10px 25px;
  margin: 0 4px 4px 0;
  
}
.demo1-item-selected {
  border: 1px solid green;
}
.demo2-item {
  width: 40px;
  height: 40px;
  border: 1px solid #ccc;
  display: inline-block;
  border-radius: 50%;
  line-height: 40px;
  text-align: center;
}
.demo2-item-selected {
  border-color: green;
}

</style>
