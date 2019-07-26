<template>
    <nav class="navigation" :class="{'navigation--open':showNavigation}">
        <NavigationItems/>
    </nav>
</template>

<script>
    import NavigationItems from "./NavigationItems";

    export default {
        name: "Navigation",
        components: {NavigationItems},
        computed: {
            showNavigation() {
                return this.$store.getters.showNavigation
            },
        }
    }
</script>