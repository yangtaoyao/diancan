<template>
<transition name="fade">
  <div class="main-box">
    <x-header  slot="header" style="width:100%;left:0;top:0;z-index:100; background:#ffffff;"
    :left-options="{backText: '返回'}"
    >
    <span>模糊查询</span>
    </x-header>
    <!-- 搜索 -->
    <group class="search-box">
      <popup-radio :options="options1" v-model="searchType">
        <p slot="popup-header" class="vux-1px-b demo3-slot">选择搜索类型</p>
      </popup-radio>
      <search
        position="fix"
        auto-scroll-to-top
        top="0"
        autofocus="autofocus"
        :auto-fixed="false"

        @result-click="resultClick"
        @on-change="getResult"
        v-model="search_value"
        @on-cancel="onCancel"
        @on-submit="onSubmit"
        ref="search">
      </search>
    </group>
    <!-- 结果列表 -->
    <div class="list-box" style="width:calc(100% - 32px)">
      <card v-for="(item02, index) in list" :key="index">
        <a slot="content"  class="weui-media-box weui-media-box_appmsg foot-box" 
        style="display: flex;
              -webkit-box-align: center;
              -webkit-align-items: center;
              align-items: center;"
              >
          <div class="" style="margin-right: .8em;"  @click.stop="show_detail(item02)">
            <img  style="width:80px;height:80px" :src="item02.imagine">
          </div>
          <div class="weui-media-box__bd" style="flex: 1;">
            {{item02.dishName}}
            <h6 style="color:red">{{item02.introduction}}</h6>
            <h4 style="color:red">￥{{item02.price}}</h4>
            <x-number v-model="item02.num" button-style="round" :min="0" :max="20"></x-number>
          </div>
        </a>
      </card>
    </div>
     <!--详情弹出框-->
    <div v-transfer-dom>
      <x-dialog v-model="showDetail" class="dialog-demo" :hide-on-blur="true">
        <div class="img-box">
          <img :src="detailData.imagine" style="max-width:100%">
        </div>
        <div class="weui-media-box__bd" style="flex: 1;">
          <h4 style="color:red"><span style="color:#333333;font-weight:600">{{detailData.dishName+'  '}}</span>￥{{detailData.price}}</h4>
          <p>{{detailData.type +"   "+detailData.cuisine}}</p>
          <x-number v-model="detailData.num" button-style="round" :min="0" :max="20"></x-number>
        </div>
        <div @click="showDetail=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
     <!-- 
      购物车
     -->
    <group class="cart-box">
      <cell>
        <div class="badge-value" slot="icon" @click.stop="showCart = true">
          <span  class="iconfont icon-gouwuche"></span>
          <badge :text="cartNum"></badge>
        </div>
        <span slot="title">&emsp;&emsp;&emsp;总计:￥{{accoutNum}}&emsp;桌号:{{tablenum}}</span>
        <x-button @click.native="settlement()"  type="primary" mini>去结算</x-button>
      </cell>
    </group>
    <div v-transfer-dom>
      <popup v-model="showCart" position="bottom" max-height="50%" class="cart-popup">
        <p @click.stop="clearCart" type="default" style="width:calc(100% - 16px);text-align:right;padding:8px 16px 4px 0;color:#666666">清空</p>
        <group style="padding-bottom:50px">
          <!-- 已选列表 -->
          <cell v-for="(item,index) in accoutArray" :key="index">
            <div slot="icon">
              <span >{{item.dishName}}</span>
              <span >￥{{parseFloat(item.price)*item.num}}</span>
            </div>
            <x-number v-model="item.num" button-style="round" :min="0" :max="20"></x-number>
          </cell>
        </group>
        <group class="cart-box" style="bottom:0px">
          <cell>
            <div class="badge-value" slot="icon" @click.stop="showCart = false">
              <span  class="iconfont icon-gouwuche"></span>
              <badge :text="cartNum"></badge>
            </div>
            <x-button @click.native="settlement()" type="primary" mini>去结算</x-button>
          </cell>
        </group>
      </popup>
    </div>
    
  </div>
</transition>
</template>

<script>
import { Tab, TabItem, Swiper, SwiperItem, Search, XHeader, Group, Cell, Card, XButton, XNumber, XDialog, PopupRadio,
Popup, Badge, TransferDomDirective as TransferDom
} from 'vux'
import { hub } from '../assets/js/hub'
import { doSearch } from '../api/index.js'

export default {
  name: 'SearchP',
  components: {
    Tab, TabItem, Swiper, SwiperItem, Search, XHeader, Group, Cell, Card, XButton, XNumber, XDialog, PopupRadio, Popup, Badge
  },
  directives: {
    TransferDom
  },
  computed: {
    // 购物车菜品（不重复）数组
    accoutArray: function () {
      let list = this.list
      let arr = []
      if (list !== undefined && list.length !== 0) {
        list.forEach(item => {
          if (item.num > 0) {
            arr.push(item)
          }
        })
      }
      console.log('购物车菜品数组' + JSON.stringify(this._accoutArray))
      console.log(JSON.stringify(arr))
      return arr
    },
    // 菜品个数
    cartNum: function () {
      let sum = 0
      if (this.accoutArray === undefined || this.accoutArray.length === 0) { return 0 }
      for (let i = 0, len = this.accoutArray.length; i < len; i++) {
        sum += parseInt(this.accoutArray[i].num)
      }
      console.log('菜品个数' + sum)
      return sum
    },
    // 购物车总计
    accoutNum: function () {
      let sum = 0
      if (this.accoutArray === undefined || this.accoutArray.length === 0) { return 0 }
      for (let i = 0, len = this.accoutArray.length; i < len; i++) {
        sum += parseFloat(this.accoutArray[i].price) * parseInt(this.accoutArray[i].num)
      }
      console.log('购物车总计' + sum)
      return sum
    }
  },
  methods: {
    settlement () {
      console.log(JSON.stringify(this.accoutArray))
      if (this.accoutArray === undefined || this.accoutArray.length === 0) {
        this.$vux.toast.show({
          text: '购物车为空！',
          position: 'middle',
          type: 'cancel'
        })
      } else {
        this.$router.push({path: '/settlement', query: { orderList: this.accoutArray, tablenum: this.tablenum }})
      }
    },
    show_detail (item02) {
      console.log('show_detail')
      this.showDetail = true
      this.detailData = item02
    },
    resultClick () {},
    getResult () {},
    onCancel () {},
    async onSubmit () {
      if (this.search_value.trim() === undefined || this.search_value.trim() === null) {
        this.$vux.toast.show({
          text: '输入框为空！',
          position: 'middle',
          type: 'cancel'
        })
      } else if (this.searchType === undefined || this.searchType === null) {
        this.$vux.toast.show({
          text: '未选择搜索类型！',
          position: 'middle',
          type: 'cancel'
        })
      } else {
        try {
          const response = await doSearch({
            search: encodeURI(this.search_value.trim()),
            type: encodeURI(this.searchType)
          })
          console.log(response.data)
          if (response.data.code === 1) {
            this.list = response.data.data
          } else {
            this.$vux.toast.show({
              text: '搜索失败!',
              position: 'middle',
              type: 'cancel'
            })
          }
        } catch (err) {
          console.error(err)
          this.$vux.toast.show({
            text: '搜索失败,网络错误!',
            position: 'middle',
            type: 'cancel'
          })
        }
      }
    }
  },
  data () {
    return {
      detailData: { },
      showDetail: false, // 打开详情x-dialog
      // 输入搜索值
      search_value: '',
      // 输入框提示
      results: [],
      // 搜索类型
      searchType: '按菜名',
      options1: ['按菜系', '按菜名'],
      // 搜索结果
      list: '',
      _accoutArray: [],
      showCart: false, // 打开购物车列表
      tablenum: ''
    }
  },
  created: function () {
    this._accoutArray = this.$route.query.accoutArray
    this.tablenum = this.$route.query.tablenum
    console.log('=====created======' + JSON.stringify(this._accoutArray))
    hub.$on('setFocus', (data) => {
      console.log('created setFocus' + data)
    })
  },
  beforeDestroy: function () {
    console.log('beforeDestroy')
  }
}
</script>
<style lang="less" scoped>
@import '~vux/src/styles/close';
.main-box{
  height: 100%;
}
// .main-box /deep/ .vux-header .vux-header-left .vux-header-back,.search-box /deep/ .vux-header .vux-header-left .left-arrow{
// color:#333333
// }
.search-box{
  position: fixed;
  width: 100%;
  top: 46px;
}

.search-box /deep/ .weui-cells{
  margin-top: 0;
  height: 60px;
  // background: #cccccc;
} 
// 搜索类型
.search-box /deep/ .weui-cells .weui-cell.weui-cell_access{
  position: absolute;
  left: 0;
  top:0;
  height: 45px;
  padding: 0;
  width: 80px;
  background:none;
  // display: block;
  margin: 0;
}
.search-box /deep/ .weui-cells .weui-cell.weui-cell_access .weui-cell__ft .vux-cell-value{
  color: #333333;
  font-size: 14px;
  border: #cccccc 1px solid;
  border-radius: 5%;
  height: 46px;
  padding:4px 8px;
  margin: 0;
  background:none
}
.search-box /deep/ .weui-cells .weui-cell.weui-cell_access .weui-cell__ft:after{
  height: 0;
  width: 0;
  
}
// 选搜索类型
.demo3-slot {
  text-align: center;
  padding: 8px 0;
  color: #888;
}
/*
*搜索框
*/
.search-box /deep/ .vux-search-box{
  padding-left: 80px;
  width: auto;
}
.search-box /deep/ .weui-search-bar{
  background: #ffffff;
}
.search-box /deep/ .weui-search-bar .weui-search-bar__box,.search-box /deep/ .weui-search-bar .weui-search-bar__label,{
  background: #f2f2f2;
}

// 结果
.list-box{
  position: fixed;
  bottom: 50px;
  width: 100%;
  top: 100px;
  padding:0 16px;
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

// 购物车列表
.cart-popup.vux-popup-dialog{
  border-radius: 15px 15px 0 0;
}
.cart-popup.vux-popup-dialog /deep/ .weui-cells.vux-no-group-title{
  margin-top: 0;
}
.cart-box{
  bottom:0;
  position:fixed;
  margin-top:0;
  width:100%;
}
.cart-box /deep/ .weui-cells{
  margin-top:0;
  width:100%;
}
.cart-box /deep/ .weui-cells .weui-cell .weui-cell__hd{
  position: absolute;
  bottom: 2px;
}
.cart-box /deep/ .weui-cells .weui-cell .weui-cell__hd .iconfont{
  font-size: 35px;
  color: rgb(247, 202, 23);
}
.cart-box /deep/ .weui-cells .weui-cell .weui-cell__hd .vux-badge{
  position: absolute;
  top: 10px;
  left:30px
}
.cart-box /deep/ .weui-cells .weui-cell .weui-cell__ft .weui-btn_mini{
  color:#333333;
  background-color:rgb(247, 202, 23);
}
</style>

