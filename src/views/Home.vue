<template>
    <main>
        <NavigationItems/>
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