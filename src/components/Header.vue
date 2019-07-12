<template>
    <header class="header">
        <div class="header__title">
            <router-link to="/" tag="span">{{ title }}</router-link>
            {{ getRouteName() }}
        </div>
        <p class="header__version">0.1.6</p>
    </header>
</template>

<script>
    import Navigation from "./Navigation";

    export default {
        name: "Header",
        components: {Navigation},
        data() {
            return {
                title: 'Possibilities PWA',
                menuOpen: false
            }
        },
        methods: {
            getRouteName() {
                return this.$route.name !== 'Home' ? (' - ' + this.$route.name) : null
            }
        }
    }
</script>