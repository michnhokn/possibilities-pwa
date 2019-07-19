import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home'
import Camera from './views/Camera'
import PushNotifications from "./views/PushNotifications";
import Overview from "./views/Overview";
import System from "./views/System";
import Geolocation from "./views/Geolocation";
import TouchGestures from "./views/TouchGestures";

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
    },
    {
        path: '/system',
        name: 'System',
        component: System
    },
    {
        path: '/geolocation',
        name: 'Geolocation',
        component: Geolocation
    },
    {
        path: '/touch-gestures',
        name: 'Touch Gestures',
        component: TouchGestures
    }
];

export default new VueRouter({routes});