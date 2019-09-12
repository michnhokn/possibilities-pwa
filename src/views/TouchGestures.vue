<template>
    <main class="touch-gestures" v-hammer:swipe.up="onSwipeUp">
        <div class="touch-gestures__inner">
            <h2>Swipe Up!</h2>
        </div>
    </main>
</template>

<script>
    export default {
        name: "TouchGestures",
        methods: {
            onSwipeUp() {
                confirm("Was ist nice")
            }
        }
    }
</script>