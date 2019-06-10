<template>
  <div>
    <router-view></router-view>
    <Tabbar :tabs="tabs" />

    <!-- <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">电影</van-tabbar-item>
      <van-tabbar-item icon="search" dot>影院</van-tabbar-item>
      <van-tabbar-item icon="friends-o" info="5">优惠</van-tabbar-item>
      <van-tabbar-item icon="setting-o" info="20">我的</van-tabbar-item>
    </van-tabbar> -->
  </div>
</template>

<script>
// import '../../components/Tabbar.vue'  // 可以使用下面@这种方法引入
import Tabbar from '@/components/Tabbar.vue'

export default {
  data () {
    return {
      tabs: [
        { id: 1, name: '电影', icon: 'icon-dianying', href: '/film' },
        { id: 2, name: '影院', icon: 'icon-yingyuana', href: '/cinema' },
        { id: 3, name: '优惠', icon: 'icon-youhui', href: '/youhui' },
        { id: 4, name: '我的', icon: 'icon-iconfuzhi', href: '/center' }
      ]
    }
  },
  components: {
    Tabbar
  }
}
</script>
