<template>
    <div class="navigation__items">
        <NavigationItem icon="home" to="/">Homepage</NavigationItem>
        <NavigationItem icon="box" to="/overview">Feature Overview</NavigationItem>
        <NavigationItem icon="camera" to="/camera">Camera</NavigationItem>
        <NavigationItem icon="smartphone" to="/push-notifications">Push Notifications</NavigationItem>
        <NavigationItem icon="map-pin" to="/geo-location">Geo Location</NavigationItem>
        <NavigationItem icon="activity" to="/haptics">Haptics</NavigationItem>
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
