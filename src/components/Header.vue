<template>
    <header class="header">
        <router-link to="/" tag="div" class="header__back">
            <template v-if="notHome">
                <feather-icon name="chevron-left"></feather-icon>
            </template>
        </router-link>
        <div class="header__title">
            <template v-if="!notHome">
                {{ title }}
            </template>
            <template v-if="notHome">
                {{ $route.name }}
            </template>
        </div>
        <p class="header__version">0.1.35</p>
    </header>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                title: 'Possibilities'
            }
        },
        computed: {
            notHome() {
                return this.$route.name !== 'Home'
            }
        }
    }
</script>