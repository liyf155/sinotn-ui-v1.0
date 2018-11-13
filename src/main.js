import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Cookies from 'js-cookie'
import 'normalize.css/normalize.css'
// Element
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 全局样式
import '@/styles/index.scss'
// 数据存储
// import store from './store'
// 图标
import './icons'
// 错误日志
import './errorLog'
// 权限控制
import './permission'
// 全局过滤器 
import * as filters from './filters'
// 国际化
import i18n from './i18n'

Vue.config.productionTip = false

Vue.use(Element, {
  size: Cookies.get('size') || 'medium',
  i18n: (key, value) => i18n.t(key, value)
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
