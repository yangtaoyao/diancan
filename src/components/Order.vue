<template>
  <div class="order-box" style="height:100%;padding-bottom: 50px;">
    <tab :line-width="1" custom-bar-width="30px" v-model="indexActive">
      <tab-item selected>全部订单</tab-item>
      <tab-item>已完成</tab-item>
      <tab-item>退款</tab-item>
    </tab>
    <swiper v-model="indexActive" height="100%"  :show-dots="false" direction="horizontal">
      <swiper-item >
        <div style="height:auto;top:0">
          <!-- 订单列表 -->
            <group v-for="item in orderList" :key="item" class="card">
              <cell title="订单" value="" is-link @click.native="gotoDetail(item)"></cell>
              <cell class="content">
                <span slot="icon" style="color:#666666;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width:100%">
                  {{item.list | getOrderNameStr}}
                </span>
                <span slot="after-title" style="color:#666666">{{item.list.length}}件菜品</span>
              </cell>
              <cell>
                <!-- <x-button  type="default" style="border-color:#000000;background:#ffffff;color:#333333" mini>再来一单</x-button> -->
                <x-button  type="primary" style="background:#f7ca17;color:#333333" mini>退单</x-button>
                <x-button  type="primary" style="background:#f7ca17;color:#333333" mini>催单</x-button>
              </cell>
            </group>
        </div>
      </swiper-item>
      <swiper-item>
        <div style="height:auto;top:0">
        </div>
      </swiper-item>
      <swiper-item>
        <div style="height:auto;top:0">
        </div>
      </swiper-item>
    </swiper>

  </div>
</template>

<script>
import { Tab, TabItem, Swiper, SwiperItem, Group, Cell, CellBox, XButton } from 'vux'
import { getOrder, doReminder, doChargeBack } from '../api/index.js'
import { getUserInfo } from '../assets/js/auth'

export default {
  name: 'Order',
  components: {
    Tab, TabItem, Swiper, SwiperItem, Group, Cell, CellBox, XButton
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
      // list.forEach(item => {
      //   name = item.dishName + ' + ' + name
      // })
      return name
    }
  },
  methods: {
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
    async doReminder () {
      try {
        const response = await doReminder({
          orderId: '55160111'
        })
        console.log(response.data)
        if (response.data.code === 1) {

        } else {
          this.$vux.toast.show({
            text: '催单失败!',
            position: 'middle',
            type: 'cancel'
          })
        }
      } catch (err) {
        console.error(err)
        this.$vux.toast.show({
          text: '催单失败,网络错误!',
          position: 'middle',
          type: 'cancel'
        })
      }
    },
    // 退单
    async doChargeBack () {
      try {
        const response = await doChargeBack({
          orderId: '55160111'
        })
        console.log(response.data)
        if (response.data.code === 1) {

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
    }

  },
  computed: {

  },
  created: function () {
    this.getMyOder()
  },
  data () {
    return {
      indexActive: 0,
      list: [ '精选', '美食', '电影' ],
      orderList: [
        {
          OrderNum: '101',
          Time: '2018-10-18',
          DishName: '鸡腿包',
          TableNum: '001',
          UserId: '55160131'
        },
        {
          OrderNum: '101',
          Time: '2018-10-18',
          DishName: '鸡腿包',
          TableNum: '001',
          UserId: '55160131'
        },
        {
          OrderNum: '101',
          Time: '2018-10-18',
          DishName: '鸡腿包',
          TableNum: '001',
          UserId: '55160131'
        }
      ]
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
