<template>
<transition name="fade">
  <div class="search-box">
    <x-header  slot="header" style="width:100%;left:0;top:0;z-index:100; background:#ffffff;"
    :left-options="{backText: '搜索'}"
    > 
    </x-header>
    <search
      autofocus="autofocus"
      @result-click="resultClick"
      @on-change="getResult"
      :results="results"
      v-model="search_value"
      position="fixed"
      auto-scroll-to-top
      top="46px"
      @on-cancel="onCancel"
      @on-submit="onSubmit"
      ref="search"></search>
    <div v-for="i in 10">search{{i}}</div>
  </div>
</transition>
</template>

<script>
import { Tab, TabItem, Swiper, SwiperItem, Search, XHeader } from 'vux'
import { hub } from '../assets/js/hub'
export default {
  name: 'SearchP',
  components: {
    Tab, TabItem, Swiper, SwiperItem, Search, XHeader
  },
  methods: {
    resultClick () {},
    getResult () {},
    onCancel () {},
    onSubmit () {}
  },
  data () {
    return {
      search_value: '',
      results: []

    }
  },
  mounted: function () {
    console.log('mounted')
    hub.$on('setFocus', (data) => {
      console.log('created setFocus' + data)
    })
  }
}
</script>
<style lang="less" scoped>
.search-box{
  height: 100%;
}
.search-box /deep/ .vux-header .vux-header-left .vux-header-back,.search-box /deep/ .vux-header .vux-header-left .left-arrow{
color:#333333
}
</style>

