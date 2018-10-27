<template>
<!-- <transition name="slide-up"> -->
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <div v-transfer-dom>
      <loading v-model="isLoading"></loading>
    </div>
  </div>
  <!-- </transition>p -->
</template>

<script>
import { Loading, TransferDomDirective as TransferDom } from 'vux'
import {mapState} from 'vuex'

export default {
  name: 'app',
  directives: {
    TransferDom
  },
  components: {
    Loading
  },
  data () {
    return {
      // isLoading: true
    }
  },
  computed: {
    ...mapState({
     // isLoading: state => state.isLoading
      isLoading () {
        return this.$store.state.isLoading
      }
    })
    // isLoading () {
    //   return this.$store.state.isLoading
    // }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
#app {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
</style>
