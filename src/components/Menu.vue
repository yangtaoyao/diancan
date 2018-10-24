<template>
  <div class="viewbox">
    <!--详情弹出框-->
    <div v-transfer-dom>
      <x-dialog v-model="showDetail" class="dialog-demo" :hide-on-blur="true">
        <div class="img-box">
          <img :src="detailData.imagine" style="max-width:100%">
        </div>
        <div class="weui-media-box__bd" style="flex: 1;">
          
          <h4 style="color:red"><span>{{detailData.name}}</span>￥{{detailData.price}}</h4>
          <x-number v-model="detailData.num" button-style="round" :min="0" :max="20"></x-number>
        </div>
        <div @click="showDetail=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>

    <search class="search-box"
      position="absolute"
      auto-scroll-to-top
      top="46px"
      @on-focus="search_onFocus"
      ref="search"></search>

    <tab class="tab" :line-width=2 active-color='red' v-model="indexActive" custom-bar-width="0">
      <tab-item class="vux-center" v-for="(item, index) in menu" :selected="demo2===item.type" @click.native="clickItem(item,index)" :key="index">{{item.type}}</tab-item>
    </tab>
    <swiper v-model="indexActive" height="100%"  :show-dots="false" direction="horizontal" :duration="10">
      <swiper-item v-for="(item, index) in menu" :key="index" >
        <div style="height:auto">
          <card v-for="(item02, index) in item.list" :key="index">
              <a slot="content"  class="weui-media-box weui-media-box_appmsg foot-box" 
              style="display: flex;
                    -webkit-box-align: center;
                    -webkit-align-items: center;
                    align-items: center;"
                    >
                <div class="" style="margin-right: .8em;"  @click.stop="show_detail($event,item02)">
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
      </swiper-item>
    </swiper>
    <!-- 
      购物车
     -->
    <group class="cart-box">
      <cell>
        <div class="badge-value" slot="icon" @click.stop="showCart = true">
          <span  class="iconfont icon-gouwuche"></span>
          <badge :text="cartNum"></badge>
        </div>
        <span slot="title">&emsp;&emsp;&emsp;总计：￥{{accoutNum}}</span>
        <x-button @click.native="settlement()"  type="primary" mini>去结算</x-button>
      </cell>
    </group>
    <div v-transfer-dom>
      <popup v-model="showCart" position="bottom" max-height="50%" class="cart-popup">
        <p @click.stop="clearCart" type="default" style="width:calc(100% - 16px);text-align:right;padding:8px 16px 4px 0;color:#666666">清空</p>
        <group style="padding-bottom:50px">
          <!-- 已选列表 -->
          <cell v-for="(item,index) in accoutArry" :key="index" :title="index">
            <div slot="icon">
              <span >{{item.dishName}}</span>
              <span >￥{{item.price}}</span>
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
</template>


<script>
import { ViewBox, Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, Panel, Card, XNumber, XDialog, XInput, Popup, Group, Cell, Badge,
TransferDomDirective as TransferDom, Search } from 'vux'
// import { hub } from '../assets/js/hub'
import { getMenu } from '../api/index.js'

export default {
  name: 'Menu',
  directives: {
    TransferDom
  },
  components: {
    Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, ViewBox, Panel, Card, XNumber, XDialog, Search, XInput, Popup, Group, Cell, Badge
  },
  methods: {
    settlement () {
      console.log(JSON.stringify(this.accoutArry))
      if (this.accoutArry === undefined || this.accoutArry.length === 0) {
        this.$vux.toast.show({
          text: '购物车为空！',
          position: 'middle',
          type: 'cancel'
        })
      } else {
        this.$router.push({path: '/settlement', query: { orderList: this.accoutArry }})
      }
    },
    search_onFocus () {
      console.log('search_onFocus')
      this.$router.push('/Search')
    },
    show_detail ($event, item02) {
      console.log('show_detail')
      this.showDetail = true
      this.detailData = item02
    },
    // 点击tabbar
    clickItem (item, index) {
      this.demo2 = item.type
      console.log(this.indexActive)
    },
    clearCart () {
      let m = this.menu
      if (m === undefined || m.length === 0) { return }
      for (let i = 0, len = m.length; i < len; i++) {
        for (let j = 0, len02 = m[i].list.length; j < len02; j++) {
          m[i].list[j].num = 0
        }
      }
      this.showCart = false
      console.log('clearCart')
    },
    async getMenu () {
      try {
        const response = await getMenu()
        console.log(response.data)
        if (response.data.code === 1) {
          this.menu = response.data.data
        } else {
          this.$vux.toast.show({
            text: '获取菜单数据失败!',
            position: 'middle',
            type: 'cancel'
          })
        }
      } catch (err) {
        console.error(err)
        this.$vux.toast.show({
          text: '获取菜单数据失败,网络错误!',
          position: 'middle',
          type: 'cancel'
        })
      }
    }
  },
  computed: {
    // 购物车菜品（不重复）数组
    accoutArry: function () {
      let arr = []
      let m = this.menu
      let a = 0
      if (m === [] || m === undefined) { return [] }
      for (let len = m.length; a < len; a++) {
        for (let j = 0, len02 = m[a].list.length; j < len02; j++) {
          if (m[a].list[j].num > 0) {
            console.log('accoutArry:')
            console.log(m[a].list[j].num)
            arr.push(m[a].list[j])
          }
        }
      }
      console.log('购物车菜品数组' + JSON.stringify(arr))
      return arr
    },
    // 菜品个数
    cartNum: function () {
      let sum = 0
      if (this.accoutArry === undefined || this.accoutArry.length === 0) { return 0 }
      for (let i = 0, len = this.accoutArry.length; i < len; i++) {
        sum += parseInt(this.accoutArry[i].num)
      }
      console.log('菜品个数' + sum)
      return sum
    },
    // 购物车总计
    accoutNum: function () {
      let sum = 0
      if (this.accoutArry === undefined || this.accoutArry.length === 0) { return 0 }
      for (let i = 0, len = this.accoutArry.length; i < len; i++) {
        sum += parseFloat(this.accoutArry[i].price) * parseInt(this.accoutArry[i].num)
      }
      console.log('购物车总计' + sum)
      return sum
    }
  },
  created: function () {
    this.getMenu()
  },
  data () {
    return {
      showDetail: false, // 打开详情x-dialog
      search_value: '',
      type: '5',
      showCart: false, // 打开购物车列表
      indexActive: 0,
      demo2: '包子',
      menu: [
        {
          type: '炒饭',
          list: [{
            dishName: '黑椒牛柳炒饭',
            price: '15',
            cuisine: '',
            supply: '',
            introduction: '鸡腿包',
            imagine: '',
            type: '',
            num: 0
          }]
        }
      ],
      accout: [],
      detailData: { }
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

//
.viewbox /deep/ .tab.vux-tab-wrap{
  overflow: hidden;
  top:91px;
  left:0;
  bottom: 100px;
  width: 25%;
  /* height: calc(100% - 46px) ; */
  padding-top: 0px;
  position: fixed;
}
.viewbox /deep/ .tab.vux-tab-wrap .vux-tab-container{
  height: 100%;
  overflow-y:scroll;;
    overflow-x: hidden;
}
.viewbox /deep/ .tab.vux-tab-wrap .vux-tab-container .vux-tab{
    
    display: block;
    height : auto;
}
.viewbox /deep/ .tab.vux-tab-wrap .vux-tab-container .scrollable.vux-tab .vux-tab-item{
    width: 100%;
    height: 44px;
    float: left;
}

//
.viewbox /deep/ .vux-slider{
  /* height: calc(100% - 46px) ; */
  width: 75%;
  padding: 0;
  position: fixed;
  top:91px;
  right:0;
  bottom: 100px;
} 
.viewbox /deep/ .vux-slider > .vux-swiper{
  height: 100%;
  overflow: scroll;
}

/*
*/
.viewbox /deep/ .vux-slider > .vux-swiper > .vux-swiper-item
 .weui-panel .vux-card-content .foot-box{
   background: #0000;
   display: block;
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

// 购物车列表
.cart-popup.vux-popup-dialog{
  border-radius: 15px 15px 0 0;
}
.cart-popup.vux-popup-dialog /deep/ .weui-cells.vux-no-group-title{
  margin-top: 0;
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
