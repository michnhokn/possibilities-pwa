import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        showNavigation: false
    },
    mutations: {
        toggleMenu: (state, payload) => {
            state.showNavigation = payload
        }
    },
    actions: {},
    getters: {
        showNavigation: (state) => {
            return state.showNavigation
        }
    }
})