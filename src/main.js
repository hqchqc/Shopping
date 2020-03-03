import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import Toast from './components/common/Toast/index'
import fastClick from 'fastclick'
import vueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

// 弹窗插件
Vue.use(Toast)
// 事件总线
Vue.prototype.$bus = new Vue()
// 移动端300ms的延迟
fastClick.attach(document.body)
// 使用图片懒加载插件
Vue.use(vueLazyLoad,{
  loading: require('./assets/image/common/placeholder.png')
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
