<template>
    <header class="header">
        <div class="header__title">
            <router-link to="/" tag="span">{{ title }}</router-link>
            {{ getRouteName() }}
        </div>
        <p class="header__version">0.1.25</p>
    </header>
</template>

<script>
    export default {
        name: "Header",
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