<template>
    <div class="possibilities-pwa">
        <Header></Header>
        <router-view></router-view>
        <NavigationToggle v-if="!isHomeView"></NavigationToggle>
        <Navigation v-if="!isHomeView"></Navigation>
    </div>
</template>

<script>
    import Header from "./components/Header";
    import NavigationToggle from "./components/NavigationToggle";
    import Navigation from "./components/Navigation";

    export default {
        name: "App",
        components: {Navigation, NavigationToggle, Header},
        computed: {
            isHomeView() {
                return this.$route.path === '/'
            }
        }
    }
</script>

<style lang="scss">
    @import "assets/scss/styles";
</style>
