<template>
    <main class="touch-gestures" v-hammer:swipe.up="onSwipeUp">
        <feather-icon name="chevrons-up"></feather-icon>
        <strong>
            Swipe from line 1 to line 2 to open the main navigation
        </strong>
        <hr class="two">
        <hr class="one">
    </main>
</template>

<script>
    export default {
        name: "TouchGestures",
        methods: {
            onSwipeUp() {
                this.$store.commit('toggleMenu', true)
            }
        }
    }
</script>