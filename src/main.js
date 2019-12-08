// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './stores'

//使用element组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//使用axios
import axios from 'axios'
import VueAxios from 'vue-axios'
//使用vuex
import Vuex from 'vuex'
// import Vue from 'vue'

// Vue.prototype.axios = axios;
Vue.use(VueAxios, axios)
Vue.use(ElementUI)
Vue.use(Vuex)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
