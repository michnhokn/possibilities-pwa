<template>
    <main class="geolocation">
        <div class="geolocation__controls" v-if="map && canGetLocation">
            <button class="track" v-if="!locationIsTracked" @click="trackLocation">Track Location</button>
            <button class="stop-track" v-if="locationIsTracked" @click="stopTracking">Stop Tracking</button>
            <button v-if="trackingPath" @click="showWholeTrack">Show whole track</button>
        </div>
        <div id="map"></div>
    </main>
</template>

<script>
    import L from 'leaflet'

    export default {
        name: "Geolocation",
        data() {
            return {
                map: null,
                trackingPath: null,
                tileLayer: null,
                locationIsTracked: false,
                trackingInterval: null,
                startPosition: null,
                canGetLocation: false
            }
        },
        mounted() {
            let _this = this;
            if ('permissions' in navigator && 'geolocation' in navigator) {
                navigator.permissions.query({name: "geolocation"}).then(result => {
                    if (result.state === "granted") {
                        navigator.geolocation.getCurrentPosition(location => {
                            _this.initMap([location.coords.latitude, location.coords.longitude], 18, true)
                        });
                        _this.canGetLocation = true
                    } else {
                        _this.initMap()
                    }
                })
            } else {
                _this.initMap()
            }
        },
        methods: {
            initMap(center = [49.1391695, 9.2143145], zoom = 13, showCurrentPosition = false) {
                let _this = this;
                _this.map = L.map('map', {center: center, zoom: zoom});
                _this.tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(_this.map);
                if (showCurrentPosition) {
                    _this.startPosition = L.circleMarker(center, {radius: 8, color: '#ff0314'}).addTo(_this.map)
                    _this.startPosition.on('click', () => {
                        _this.map.setView(center, zoom, {animate: true})
                    })
                }
            },
            trackLocation() {
                let _this = this;
                _this.locationIsTracked = true;
                _this.trackingPath = L.polyline([], {
                    color: '#ff0314',
                    weight: 6
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