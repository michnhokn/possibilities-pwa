<template>
    <main class="touch-gestures">
        <div class="touch-gestures__inner">
            <div v-hammer:pan="handleDrag"></div>
        </div>
    </main>
</template>

<script>
    export default {
        name: "TouchGestures",
        data() {
            return {
                lastPosX: 0,
                lastPosY: 0,
                isDragging: false
            }
        },
        methods: {
            handleDrag(ev) {
                let _this = this;

                let elem = ev.target;
                if (!_this.isDragging) {
                    _this.isDragging = true;
                    _this.lastPosX = elem.offsetLeft;
                    _this.lastPosY = elem.offsetTop;
                }

                let posX = ev.deltaX + _this.lastPosX;
                let posY = ev.deltaY + _this.lastPosY;

                elem.style.left = posX + "px";
                elem.style.top = posY + "px";

                if (ev.isFinal) {
                    _this.isDragging = false;
                }
            }

        }
    }
</script>