<template>
    <main class="system">
        <h3>Network</h3>
        <template v-if="connection">
            <p v-if="connection.effectiveType"><span>Network Effective Type:</span>{{ connection.effectiveType }}</p>
            <p v-if="connection.type"><span>Network Type:</span>{{ connection.type }}</p>
            <p v-if="connection.downlink"><span>Downlink:</span>{{ connection.downlink }} mbit/s</p>
            <p v-if="connection.downlinkMax"><span>Downlink Max:</span>{{ connection.downlinkMax }} mbit/s</p>
            <p v-if="online"><span>Online:</span>{{ online }}</p>
        </template>
        <h3>Device</h3>
        <p @click="vibrate" class="button ta-left">Vibrate for 500ms</p>
        <p><span>Device Memory:</span>{{ deviceMemory }} GB</p>
        <template v-if="battery">
            <p v-if="battery.level"><span>Battery Level:</span>{{ battery.level }}</p>
            <p v-if="battery.dischargingTime"><span>Battery discharging time:</span>{{ battery.dischargingTime }} s</p>
            <p v-if="battery.charging"><span>Battery is charging:</span>{{ battery.charging }}</p>
            <p v-if="battery.chargingTime"><span>Battery charging time:</span>{{ battery.chargingTime }} s</p>
        </template>
        <h3>Location & Position</h3>
        <p v-if="hidden"><span>Visible:</span>{{ hidden }}</p>
        <p v-if="orientation"><span>Orientation:</span>{{ orientation }}</p>
        <template v-if="longitude && latitude">
            <u><span>Geolocation</span></u>
            <p><span>Longitude:</span>{{ longitude }}</p>
            <p><span>Latitude:</span>{{ latitude}}</p>
        </template>
        <template v-if="tiltLR && tiltFB && dir">
            <u><span>Device Position</span></u>
            <p><span>Tilt Left/Right:</span>{{ tiltLR }}</p>
            <p><span>Tilt Front/Back:</span>{{ tiltFB }}</p>
            <p><span>Direction:</span>{{ dir }}</p>
        </template>
        <h3>Permissions</h3>
    </main>
</template>

<script>
    export default {
        name: "System",
        data() {
            return {
                connection: navigator.connection || navigator.mozConnection ||
                    navigator.webkitConnection || navigator.msConnection,
                online: navigator.onLine,
                deviceMemory: navigator.deviceMemory || 'unknown',
                battery: null,
                latitude: 0.0,
                longitude: 0.0,
                tiltLR: 0.0,
                tiltFB: 0.0,
                dir: 0.0,
                hidden: '',
                orientation: window.screen.orientation.type,
            }
        },
        mounted() {
            let _this = this;
            if ('getBattery' in navigator) {
                (navigator.getBattery()).then(battery => _this.battery = battery);
            }
            if ('geolocation' in navigator) {
                navigator.geolocation.watchPosition(function (position) {
                    _this.latitude = position.coords.latitude;
                    _this.longitude = position.coords.longitude;
                });
            }
            if ('DeviceOrientationEvent' in window) {
                window.addEventListener('deviceorientation', _this.deviceOrientationHandler, false);
            }
            if ('hidden' in document) {
                _this.hidden = document['hidden'] ? 'hidden' : 'visible';
            }
            window.screen.orientation.addEventListener('change', function () {
                _this.orientation = window.screen.orientation.type
            })
        },
        methods: {
            vibrate() {
                navigator.vibrate(500)
            },
            deviceOrientationHandler(eventData) {
                this.tiltLR = eventData.gamma;
                this.tiltFB = eventData.beta;
                this.dir = eventData.alpha;
            }
        }
    }
</script>
