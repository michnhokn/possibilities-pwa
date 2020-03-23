<template>
    <div class="navigation__items">
        <NavigationItem icon="home" to="/">Homepage</NavigationItem>
        <NavigationItem icon="box" to="/overview">Feature Overview</NavigationItem>
        <NavigationItem icon="activity" to="/system">System Information</NavigationItem>
        <NavigationItem icon="camera" to="/camera" v-if="camera" :disabled="!camera">
            Camera
        </NavigationItem>
        <NavigationItem icon="smartphone" to="/push-notifications" :disabled="!notification">
            Push Notifications
        </NavigationItem>
        <NavigationItem icon="map-pin" to="/geolocation" :disabled="!geolocation">
            Geo Location
        </NavigationItem>
        <NavigationItem icon="move" to="/touch-gestures" :disabled="!ontouchstart">
            Touch Gestures
        </NavigationItem>
    </div>
</template>

<script>
    import NavigationItem from "./NavigationItem";

    export default {
        name: "NavigationItems",
        components: {NavigationItem},
        computed: {
            camera() {
                return 'ImageCapture' in window && 'getUserMedia' in navigator && 'mediaDevices' in navigator
            },
            notification() {
                return 'Notification' in window
            },
            geolocation() {
                return 'geolocation' in navigator
            },
            ontouchstart() {
                return 'ontouchstart' in window
            }
        }
    }
</script>
