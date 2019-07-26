<template>
    <div class="navigation__toggle" @click="toggleMenu">
        <feather-icon :name="toggleIcon"/>
    </div>
</template>

<script>
    export default {
        name: "NavigationToggle",
        computed: {
            showNavigation() {
                return this.$store.getters.showNavigation
            },
            toggleIcon() {
                return this.showNavigation ? 'x' : 'menu'
            }
        },
        methods: {
            toggleMenu() {
                this.$store.commit('toggleMenu', !this.showNavigation)
            }
        }
    }
</script>
