<template>
    <div class="navigation__items">
        <NavigationItem icon="home" to="/">Homepage</NavigationItem>
        <NavigationItem icon="box" to="/overview">Feature Overview</NavigationItem>
        <NavigationItem icon="activity" to="/system">System Information</NavigationItem>
        <NavigationItem icon="camera" to="/camera">Camera</NavigationItem>
        <NavigationItem icon="smartphone" to="/push-notifications">Push Notifications</NavigationItem>
        <NavigationItem icon="map-pin" to="/geolocation">Geo Location</NavigationItem>
        <NavigationItem icon="move" to="/touch-gestures">Touch Gestures</NavigationItem>
    </div>
</template>

<script>
    import NavigationItem from "./NavigationItem";

    export default {
        name: "NavigationItems",
        components: {NavigationItem},
    }
</script>
