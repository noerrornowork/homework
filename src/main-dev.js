import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'
import TreeTable from 'vue-table-with-tree-grid'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import $axios from 'axios'
// 配置请求的根路径
$axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 配置axios请求拦截器权限字段
$axios.interceptors.request.use(config => {
  NProgress.start()
  config.headers.Authorization = sessionStorage.getItem('token')
  return config
})

$axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})
Vue.prototype.$axios = $axios

Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)
// 注册富文本编辑器
Vue.use(VueQuillEditor /* { default global options } */)

// 自定义过滤器
Vue.filter('dateFormat', function(originalVal) {
  const dt = new Date(originalVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
