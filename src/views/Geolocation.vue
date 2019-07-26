<template>
    <main class="geolocation">
        <div class="buttons">
            <button v-if="!locationIsTracked" @click="trackLocation">Track Location</button>
            <button v-if="locationIsTracked" @click="stopTracking">Stop Tracking</button>
            <button v-if="trackingPath" @click="showWholeTrack">Show whole track</button>
        </div>
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
            _this.tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
            showWholeTrack() {
                let _this = this;
                _this.map.fitBounds(_this.trackingPath.getBounds());
            },
            addCurrentGeolocation() {
                let _this = this;

                navigator.geolocation.getCurrentPosition((position => {
                    _this.trackingPath.addLatLng(L.latLng(
                        position.coords.latitude,
                        position.coords.longitude
                    ));
                }))
            }
        }
    }
</script>

<style>
    @import "~leaflet/dist/leaflet.css";
</style>