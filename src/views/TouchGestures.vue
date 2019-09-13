<template>
    <main class="touch-gestures">
        <div class="touch-gestures__inner">
            <div class="touch-gestures__box" v-hammer:pan="handleDrag">
                <p><span>ClientX:</span> {{ clientX }}</p>
                <p><span>ClientY:</span> {{ clientY }}</p>
                <p><span>PointerX:</span> {{ centerX ? centerX + 'px' : 'null' }}</p>
                <p><span>PointerY:</span> {{ centerY ? centerY + 'px' : 'null' }}</p>
                <p><span>Movement:</span> {{ direction }}</p>
            </div>
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
                clientX: '20px',
                clientY: '70px',
                centerX: '',
                centerY: '',
                isDragging: false,
                direction: 'none'
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

                elem.style.left = _this.clientX = posX + "px";
                elem.style.top = _this.clientY = posY + "px";

                _this.centerX = ev.center.x;
                _this.centerY = ev.center.y;

                switch (ev.direction) {
                    case 1:
                        _this.direction = 'none';
                        break;
                    case 2:
                        _this.direction = 'left';
                        break;
                    case 4:
                        _this.direction = 'right';
                        break;
                    case 8:
                        _this.direction = 'up';
                        break;
                    case 16:
                        _this.direction = 'down';
                        break;
                }

                if (ev.isFinal) {
                    _this.isDragging = false;
                }
            }
        }
    }
</script>