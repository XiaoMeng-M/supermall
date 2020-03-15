import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import toast from 'components/common/toast'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

//使用toast插件
Vue.use(toast)

///使用懒加载插件
Vue.use(VueLazyLoad,{
  loading:require('./assets/img/common/placeholder.png')
})

//解决移动端300ms的延迟
FastClick.attach(document.body)

//添加事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
