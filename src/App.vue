<template>
    <div class="possibilities-pwa">
        <NavBar @toggleMenu="menuOpen = !menuOpen"></NavBar>
        <SidebarMenu :menuOpen="menuOpen"></SidebarMenu>
        <router-view></router-view>
    </div>
</template>

<script>
    import NavBar from "./components/NavBar";
    import SidebarMenu from "./components/SidebarMenu";

    export default {
        name: "App",
        components: {SidebarMenu, NavBar},
        data() {
            return {
                menuOpen: false,
            }
        }
    }
</script>

<style lang="scss">
    @import "scss/styles";
</style>
