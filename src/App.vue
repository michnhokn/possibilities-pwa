<template>
    <div class="possibilities-pwa">
        <Header></Header>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
    import Header from "./components/Header";

    export default {
        name: "App",
        components: {Header},
    }
</script>

<style lang="scss">
    @import "assets/scss/styles";
</style>
