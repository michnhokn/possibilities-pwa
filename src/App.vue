<template>
    <div class="possibilities-pwa">
        <Header></Header>
        <router-view></router-view>
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
