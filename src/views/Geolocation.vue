<template>
    <main class="geolocation">
        <button v-if="!locationIsTracked" @click="trackLocation">Track Location</button>
        <button v-if="locationIsTracked" @click="stopTracking">Stop Tracking</button>
        <div id="map"></div>
    </main>
</template>

<script>
    import L from 'leaflet'
    import Random from "../utility/random";

    export default {
        name: "Geolocation",
        data() {
            return {
                map: null,
                trackingPath: null,
                tileLayer: null,
                locationIsTracked: false,
                trackingInterval: null
            }
        },
        mounted() {
            let _this = this;

            _this.map = L.map('map', {
                center: [49.1391695, 9.2143145],
                zoom: 13
            });
            _this.tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
                foo: 'bar',
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
            }).addTo(_this.map);
        },
        methods: {
            trackLocation() {
                let _this = this;

                _this.locationIsTracked = true;
                _this.trackingPath = L.polyline([], {
                    color: Random.getRandomColor()
                }).addTo(_this.map);
                _this.addCurrentGeolocation();
                _this.trackingInterval = setInterval(() => {
                    _this.addCurrentGeolocation()
                }, 3600)
            },
            stopTracking() {
                let _this = this;

                _this.locationIsTracked = false;
                clearInterval(_this.trackingInterval)
            },
            addCurrentGeolocation() {
                let _this = this;

                navigator.geolocation.getCurrentPosition((position => {
                    // eslint-disable-next-line no-console
                    console.log(_this.trackingPath);
                    _this.trackingPath.addLatLng(L.latLng(
                        position.coords.latitude,
                        position.coords.longitude
                    ));
                    _this.map.fitBounds(_this.trackingPath.getBounds());
                }))
            }
        }
    }
</script>

<style>
    @import "~leaflet/dist/leaflet.css";
</style>