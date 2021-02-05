import Vue from 'vue'
import App from './App'
import http from '@/common/js/http-promise.js'
import api from '@/common/js/api.js'
import common from '@/common/js/common.js'
import utils from '@/common/js/utils.js'
// import html2canvas from '@/common/js/html2canvas.js'
// import jsPDF from '@/common/js/jsPdf.debug.js'

Vue.config.productionTip = false

Vue.prototype.$http = http
Vue.prototype.$api = api
Vue.prototype.$common = common
Vue.prototype.$utils = utils
// Vue.prototype.$html2canvas = html2canvas
// Vue.prototype.$jsPDF = jsPDF

App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);

const app = new Vue({
    ...App
})
app.$mount()
