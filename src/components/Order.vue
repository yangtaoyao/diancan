<template>
  <div class="order-box" style="height:100%;padding-bottom: 50px;">
    <tab :line-width="1" custom-bar-width="30px" v-model="indexActive">
      <tab-item selected>全部订单</tab-item>
      <tab-item>已完成</tab-item>
      <tab-item>退单</tab-item>
    </tab>
    <swiper v-model="indexActive" height="100%"  :show-dots="false" direction="horizontal">
      <swiper-item >
        <div style="height:auto;top:0">
          <p v-if="(orderList===undefined||orderList.length===0)" style="width:100%;text-align:center;padding-top:120px">暂无数据</p>
          <!-- 订单列表 -->
            <group v-for="item in orderList" :key="item.ordernum" class="card">
              <cell :title="'订单 '+item.ordernum" value="" is-link @click.native="gotoDetail(item)">{{item|getorderState}}</cell>
              <cell class="content">
                <span slot="icon" style="color:#666666;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width:100%">
                  {{item.list | getOrderNameStr}}
                </span>
                <span slot="after-title" style="color:#666666">{{item.list.length}}件菜品</span>
              </cell>
              <cell>
                <x-button v-if="item.list[0].judge===0||item.list[0].judge===2?true:false"  @click.native="goMenu(item)"  type="default" style="border-color:#000000;background:#ffffff;color:#333333" mini>加菜</x-button>
                <x-button v-if="item.list[0].judge===0||item.list[0].judge===2?true:false" @click.native="itemClick (item)"   type="primary" style="background:#f7ca17;color:#333333" mini>退单</x-button>
                <x-button v-if="item.list[0].judge===0?true:false" @click.native="remindClick (item)" type="primary" style="background:#f7ca17;color:#333333" mini>催单</x-button>
              </cell>
            </group>
        </div>
      </swiper-item>
      <swiper-item>
        <div style="height:auto;top:0">
          <!-- 已完成列表 -->
          <p v-if="(finishList===undefined||finishList.length===0)" style="width:100%;text-align:center;padding-top:120px">暂无数据</p>
            <group v-for="item in finishList" :key="item.ordernum" class="card">
              <cell :title="'订单 '+item.ordernum" value="" is-link @click.native="gotoDetail(item)">{{item|getorderState}}</cell>
              <cell class="content">
                <span slot="icon" style="color:#666666;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width:100%">
                  {{item.list | getOrderNameStr}}
                </span>
                <span slot="after-title" style="color:#666666">{{item.list.length}}件菜品</span>
              </cell>
              <cell>
                <x-button v-if="item.list[0].judge===0?true:false"  @click.native="goMenu(item)"  type="default" style="border-color:#000000;background:#ffffff;color:#333333" mini>加菜</x-button>
             </cell>
            </group>
        </div>
      </swiper-item>
      <swiper-item>
        <div style="height:auto;top:0">
          <!-- 已退单列表 -->
          <p v-if="(chargebackList===undefined||chargebackList.length===0)" style="width:100%;text-align:center;padding-top:120px">暂无数据</p>
            <group v-for="item in chargebackList" :key="item.ordernum" class="card">
              <cell :title="'订单 '+item.ordernum" value="" is-link @click.native="gotoDetail(item)">{{item|getorderState}}</cell>
              <cell class="content">
                <span slot="icon" style="color:#666666;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width:100%">
                  {{item.list | getOrderNameStr}}
                </span>
                <span slot="after-title" style="color:#666666">{{item.list.length}}件菜品</span>
              </cell>
            </group>
        </div>
      </swiper-item>
      
    </swiper>

    <div v-transfer-dom>
      <confirm v-model="showConfirm"
      title="确认退单"
      @on-cancel="showConfirm=false"
      @on-confirm="onConfirm()">
        <p style="text-align:center;">Are you sure?</p>
      </confirm>
    </div>
    <div v-transfer-dom>
      <alert v-model="showAlert" :title="'催单'"> 已催单，请耐心等候~</alert>
    </div>


  </div>
</template>

<script>
import { Tab, TabItem, Swiper, SwiperItem, Group, Cell, CellBox, XButton, Confirm, Alert, TransferDomDirective as TransferDom } from 'vux'
import { getOrder, doReminder, doChargeBack } from '../api/index.js'
import { getUserInfo } from '../assets/js/auth'

export default {
  name: 'Order',
  directives: {
    TransferDom
  },
  components: {
    Tab, TabItem, Swiper, SwiperItem, Group, Cell, CellBox, XButton, Confirm, Alert
  },
  filters: {
    getOrderNameStr: function (list) {
      let name = ''
      if (list === undefined || list.length === 0) { return '' }
      for (let i = 0, len = list.length; i < len; i++) {
        if (i === 0) {
          name = list[i].dishName
        } else {
          name = name + ' + ' + list[i].dishName
        }
      }
      return name
    },
    getorderState: function (item) {
      if (item.list[0].judge === 1) {
        return '已完成'
      } else if (item.list[0].judge === 3) {
        return '已退单'
      } else {
        return '正在进行'
      }
    }
  },
  computed: {
    // 已上菜页面
    finishList: function () {
      let arr = []
      let ol = this.orderList
      if (this.orderList === undefined || this.orderList.length === 0) { return [] }
      for (let i = 0, len = ol.length; i < len; i++) {
        if (ol[i].list[0].judge === 1) {
          arr.push(ol[i])
        }
      }
      console.log('已退单页面数组' + JSON.stringify(arr))
      return arr
    },
    // 已退单页面
    chargebackList: function () {
      let arr = []
      let ol = this.orderList
      if (this.orderList === undefined || this.orderList.length === 0) { return [] }
      for (let i = 0, len = ol.length; i < len; i++) {
        if (ol[i].list[0].judge === 3) {
          arr.push(ol[i])
        }
      }
      console.log('已退单页面数组' + JSON.stringify(arr))
      return arr
    }
  },
  methods: {
    remindClick (item) {
      this.doReminder(item)
    },
    // 确定退单
    onConfirm () {
      if (this.confirmItem != null) {
        this.chargeBack(this.confirmItem)
        console.log('doChargeBack=====' + JSON.stringify(this.confirmItem))
      }
    },
    // 点击弹出提示
    itemClick (item) {
      this.showConfirm = true
      this.confirmItem = item
      console.log('itemClick' + JSON.stringify(item))
    },
    // 详情
    gotoDetail (item) {
      console.log(JSON.stringify(item))
      this.$router.push({path: '/orderDetail', query: { orderList: item }})
    },
    // 获取订单列表
    async getMyOder () {
      try {
        const userinfo = getUserInfo()
        console.log('userinfo:' + userinfo.cus_userid)
        const response = await getOrder({
          userId: userinfo.cus_userid
        })
        console.log(response.data)
        if (response.data.code === 1) {
          this.orderList = response.data.data
        } else {
          this.$vux.toast.show({
            text: '获取订单列表数据失败!',
            position: 'middle',
            type: 'cancel'
          })
        }
      } catch (err) {
        console.error(err)
        this.$vux.toast.show({
          text: '获取订单列表数据失败,网络错误!',
          position: 'middle',
          type: 'cancel'
        })
      }
    },
    // 催单
    async doReminder (item) {
      this.$vux.loading.show({
        text: 'Loading'
      })
      const userinfo = getUserInfo()
      try {
        const response = await doReminder({
          ordernum: item.ordernum,
          userId: userinfo.cus_userid
        })
        console.log(response.data)
        if (response.data.code === 1) {
           // 更新数据
          if (response.data.data !== undefined) {
            this.orderList = response.data.data
          }

          this.$vux.loading.hide()
          this.showAlert = true
          // this.$vux.toast.show({
          //   text: '催单成功!',
          //   position: 'middle',
          //   type: 'success'
          // })
        } else {
          this.$vux.loading.hide()
          this.$vux.toast.show({
            text: '催单失败!',
            position: 'middle',
            type: 'cancel'
          })
        }
      } catch (err) {
        console.error(err)
        this.$vux.loading.hide()
        this.$vux.toast.show({
          text: '催单失败,网络错误!',
          position: 'middle',
          type: 'cancel'
        })
      }
    },
    // 退单
    async chargeBack (item) {
      const userinfo = getUserInfo()
      try {
        const response = await doChargeBack({
          userId: userinfo.cus_userid,
          ordernum: item.ordernum
        })
        console.log(response.data)
        if (response.data.code === 1) {
          // 更新数据
          if (response.data.data !== undefined) {
            this.orderList = response.data.data
          }
          this.$vux.toast.show({
            text: '退单成功!',
            position: 'middle',
            type: 'success'
          })
        } else {
          this.$vux.toast.show({
            text: '退单失败!',
            position: 'middle',
            type: 'cancel'
          })
        }
      } catch (err) {
        console.error(err)
        this.$vux.toast.show({
          text: '退单失败,网络错误!',
          position: 'middle',
          type: 'cancel'
        })
      }
    },
    // 加菜
    goMenu (item) {
      console.log('========goMenu========' + item.list[0].tableNumber)
      this.$router.push({path: '/menu', query: {tablenum: item.list[0].tableNumber}})
    }

  },
  created: function () {
    this.getMyOder()
  },
  data () {
    return {
      // 确认提示
      confirmItem: {},
      showConfirm: false,

      showAlert: false,

      indexActive: 0,
      list: [ '精选', '美食', '电影' ],
      orderList: []
    }
  }
}
</script>

<style lang="css" scoped>
.order-box /deep/ .vux-slider{
  position: fixed;
  top:90px;
  width: 100%;
  bottom: 50px;
}
.order-box /deep/ .vux-slider > .vux-swiper > .vux-swiper-item{
  overflow-y: scroll;
  padding-top: 0;
  padding: 0 10px;
  width: calc(100% - 20px);
}
.order-box /deep/ .vux-slider > .vux-swiper > .vux-swiper-item .card{
	box-shadow:1px 1px 5px 0px rgba(0, 0, 0, .3);
}
.order-box /deep/ .vux-slider > .vux-swiper > .vux-swiper-item .card .weui-cells .content.weui-cell .weui-cell__hd{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 65%;
}
</style>
