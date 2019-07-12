import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import FeatherIcon from './components/FeatherIcon'
import Benchmark, {Suite} from 'asyncmark'

Vue.component('feather-icon', FeatherIcon);
Vue.prototype.$benchmark = Benchmark;
Vue.prototype.$suite = Suite;

new Vue({
    el: '#possibilities-pwa',
    router: router,
    store: store,
    render: h => h(App),
});
