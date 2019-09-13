import Vue from 'vue'
import App from './App'
import 'babel-polyfill'
import router from './router'
import store from './store'
import FeatherIcon from './components/FeatherIcon'
import Benchmark, {Suite} from 'asyncmark'
import './registerServiceWorker'
import {VueHammer} from 'vue2-hammer'
import VDragged from 'v-dragged'

Vue.use(VDragged);
Vue.use(VueHammer);
Vue.component('feather-icon', FeatherIcon);
Vue.prototype.$benchmark = Benchmark;
Vue.prototype.$suite = Suite;

VueHammer.config.swipe = {
    threshold: 250
};

new Vue({
    el: '#possibilities-pwa',
    router: router,
    store: store,
    render: h => h(App),
});
