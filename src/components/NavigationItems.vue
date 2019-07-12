<template>
    <div class="navigation__items">
        <NavigationItem icon="home" to="/">Homepage</NavigationItem>
        <NavigationItem icon="camera" to="/camera">Camera</NavigationItem>
        <NavigationItem icon="smartphone" to="/push-notifications">Push Notifications</NavigationItem>
    </div>
</template>

<script>
    import NavigationItem from "./NavigationItem";

    export default {
        name: "NavigationItems",
        components: {NavigationItem},
    }
</script>
