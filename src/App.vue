<template>
    <div class="possibilities-pwa" v-hammer:swipe.right="historyBack">
        <Header></Header>
        <router-view></router-view>
    </div>
</template>

<script>
    import Header from "./components/Header";

    export default {
        name: "App",
        components: {Header},
        methods: {
            historyBack(ev) {
                let leftStart = ev.center.x - ev.deltaX;
                if (this.$route.path !== "/" && leftStart < 20) {
                    this.$router.back()
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "assets/scss/styles";
</style>
