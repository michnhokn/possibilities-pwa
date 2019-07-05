import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import FeatherIcon from './components/FeatherIcon'

Vue.component('feather-icon', FeatherIcon);

Vue.directive('click-outside', {
    bind() {
        this.event = event => this.vm.$emit(this.expression, event)
        this.el.addEventListener('click', this.stopProp)
        document.body.addEventListener('click', this.event)
    },
    unbind() {
        this.el.removeEventListener('click', this.stopProp)
        document.body.removeEventListener('click', this.event)
    },

    stopProp(event) {
        event.stopPropagation()
    }
})

new Vue({
    el: '#possibilities-pwa',
    router: router,
    store: store,
    render: h => h(App),
});
