import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home'
import Camera from './views/Camera'
import PushNotifications from "./views/PushNotifications";
import Overview from "./views/Overview";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/camera',
        name: 'Camera',
        component: Camera
    },
    {
        path: '/push-notifications',
        name: 'Push Notifications',
        component: PushNotifications
    },
    {
        path: '/overview',
        name: 'Overview',
        component: Overview
    }
];

export default new VueRouter({routes});