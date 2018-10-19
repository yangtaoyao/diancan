<template>
  <div class="order-box" style="height:100%;padding-bottom: 50px;">
    <tab :line-width="1" custom-bar-width="30px" v-model="indexActive">
      <tab-item selected>全部订单</tab-item>
      <tab-item>已完成</tab-item>
      <tab-item>退款</tab-item>
    </tab>
    <swiper v-model="indexActive" height="100%"  :show-dots="false" direction="horizontal">
      <swiper-item v-for="(item, index) in orderList" :key="index">
        <div style="height:auto;top:0">
          <!-- 订单列表 -->
            <group v-for="i in 20" :key="i" class="card">
              <cell title="订单" value="已完成" is-link></cell>
              <cell class="content">
                <span slot="icon" style="color:#333333；overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width:100%">
                  鸡腿包+鸡腿包+鸡腿包鸡腿包
                </span>
                <span slot="after-title" style="color:#666666">3件菜品</span>
                <span>￥30</span>
              </cell>
              <cell>
                <x-button  type="default" style="border-color:#000000;background:#ffffff;color:#333333" mini>再来一单</x-button>
                <x-button  type="primary" style="background:#f7ca17;color:#333333" mini>退单</x-button>
                <x-button  type="primary" style="background:#f7ca17;color:#333333" mini>催单</x-button>
              </cell>
            </group>
        </div>
      </swiper-item>
    </swiper>

  </div>
</template>

<script>
import { Tab, TabItem, Swiper, SwiperItem, Group, Cell, CellBox, XButton } from 'vux'
import { getOrder, doReminder, doChargeBack } from '../api/index.js'

export default {
  name: 'Order',
  components: {
    Tab, TabItem, Swiper, SwiperItem, Group, Cell, CellBox, XButton
  },
  methods: {
    // 获取订单列表
    async getMyOder () {
      try {
        const response = await getOrder({
          userId: '55160111'
        })
        console.log(response.data)
        if (response.data.code === 1) {

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
  padding: 0 16px;
  width: calc(100% - 32px);
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
