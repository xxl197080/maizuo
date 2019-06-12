import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/base.less'
// 使用第三放vant插件
import { Tabbar, TabbarItem, Swipe, SwipeItem, Tab, Tabs, NavBar } from 'vant'

Vue.config.productionTip = false
Vue.use(Tabbar).use(TabbarItem).use(Swipe).use(SwipeItem).use(Tab).use(Tabs).use(NavBar)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
