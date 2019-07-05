<template>
    <nav class="navigation" :class="{'navigation--open':showNavigation}">
        <div class="navigation__items">
            <NavigationItem icon="home" to="/">Homepage</NavigationItem>
            <NavigationItem icon="camera" to="/camera">Camera</NavigationItem>
            <NavigationItem icon="smartphone" to="/push-notifications">Push Notifications</NavigationItem>
        </div>
    </nav>
</template>

<script>
    import NavigationItem from "./NavigationItem";

    export default {
        name: "Navigation",
        components: {NavigationItem},
        computed: {
            showNavigation() {
                return this.$store.getters.showNavigation
            },
        }
    }
</script>