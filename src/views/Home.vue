<template>
    <main class="home">
        <NavigationItems/>
        <div class="home__navigation-info">
            You can swipe to the right on any subpage to go back to the main navigation.
        </div>
    </main>
</template>

<script>
    import NavigationItems from "../components/NavigationItems";

    export default {
        name: "Home",
        components: {NavigationItems}
    }
</script>


<style lang="scss" scoped>
    main {
        padding: 0;
    }
</style>