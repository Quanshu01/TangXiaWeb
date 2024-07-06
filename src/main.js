import Vue from 'vue';
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import Router from 'vue-router'

import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts;

import Echarts from 'vue-echarts'
import FullpageModal from 'vue-fullpage-modal'
// import axios from 'axios';
import global from '@/global/global.js'

import store from './store'
Vue.config.productionTip = false
Vue.prototype.global = global
// Vue.use(axios);
import axios from 'axios'
Vue.prototype.$http = axios

// 引入导出excel的插件
import FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
Vue.prototype.$FileSaver = FileSaver; //设置全局
Vue.prototype.$XLSX = XLSX; //设置全局

Vue.use(ElementUI);
Vue.component('v-chart',Echarts)
Vue.use(FullpageModal)

Vue.config.devtools = true;

new Vue({
  el: '#app',
  router,
  Router,
  store,
  render: h => h(App)
});


function setRem() {
  // 默认使用100px作为基准大小
  const baseSize = 19.6;
  const baseVal = baseSize / 1920;
  const vW = window.innerWidth; // 当前窗口的宽度
  const rem = vW * baseVal // 以默认比例值乘以当前窗口宽度,得到该宽度下的相应font-size值
  window.$size = rem / 100;
  document.documentElement.style.fontSize = rem + "px";
}
// 初始化
setRem();

  // 窗口大小变化时重置 rem
window.onresize = function() {
  setRem();
};

//钩子函数，访问路由前调用
router.beforeEach((to, from, next) => {
  //路由需要认证
  if (to.meta.requireAuth) {
    //判断store里是否有token
    if (store.state.token) {
      next()
    }
    else {
      next({
        path: '',
        query: { redirect: to.fullPath }
      })
    }
  }
  else {
    next()
  }
})