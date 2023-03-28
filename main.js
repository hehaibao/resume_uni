import Vue from 'vue'
import App from './App'

import * as comm from './util/common.js';
import * as Api from './util/api.js';
import store from './store';
import validate from './util/validate.js';

import filterObj from './util/filter.js'; // 全局过滤引入

import headCustom from './components/head-custom/head-custom.vue' // 通用自定义头部
Vue.component('head-custom', headCustom)

Vue.prototype.$comm = comm;
Vue.prototype.$api = Api;
Vue.prototype.$store = store;
Vue.prototype.$validate = validate;

Object.keys(filterObj).forEach(filterItem => Vue.filter(filterItem, filterObj[filterItem]))

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
