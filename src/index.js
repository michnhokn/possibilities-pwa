import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import FeatherIcon from './components/FeatherIcon'

Vue.component('feather-icon', FeatherIcon);

new Vue({
    el: '#possibilities-pwa',
    router,
    store,
    render: h => h(App),
});
