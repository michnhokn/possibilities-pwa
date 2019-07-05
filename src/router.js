import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home'
import Camera from './views/Camera'
import PushNotifications from "./views/PushNotifications";

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
    }
];

export default new VueRouter({routes});