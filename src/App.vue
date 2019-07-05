<template>
    <div class="possibilities-pwa">
        <Header></Header>
        <router-view></router-view>
        <NavigationToggle></NavigationToggle>
        <Navigation></Navigation>
    </div>
</template>

<script>
    import Header from "./components/Header";
    import NavigationToggle from "./components/NavigationToggle";
    import Navigation from "./components/Navigation";

    export default {
        name: "App",
        components: {Navigation, NavigationToggle, Header},
    }
</script>

<style lang="scss">
    @import "scss/styles";
</style>
