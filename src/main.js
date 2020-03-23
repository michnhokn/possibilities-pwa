import Vue from 'vue'
import App from './App'
import 'babel-polyfill'
import router from './router'
import store from './store'
import FeatherIcon from './components/FeatherIcon'
import './registerServiceWorker'
import {VueHammer} from 'vue2-hammer'
import VDragged from 'v-dragged'
import Toasted from 'vue-toasted'

Vue.use(Toasted);
Vue.use(VDragged);
Vue.use(VueHammer);
Vue.component('feather-icon', FeatherIcon);
VueHammer.config.swipe = {
    threshold: 250
};

new Vue({
    el: '#possibilities-pwa',
    router: router,
    store: store,
    render: h => h(App)
});
