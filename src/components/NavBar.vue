<template>
    <header class="nav-bar">
        <div class="nav-bar__menu-toggle" @click="toggleMenu">
            <feather-icon :name="toggleIcon"/>
        </div>
        <div class="nav-bar__title">
            {{ title }}
        </div>
        <p class="nav-bar__version">0.1.0</p>
    </header>
</template>

<script>
    export default {
        name: "NavBar",
        data() {
            return {
                title: 'Possibilities',
                menuOpen: false,
                toggleIcon: 'menu'
            }
        },
        methods: {
            toggleMenu() {
                let _this = this;
                _this.menuOpen = !_this.menuOpen;
                _this.toggleIcon = _this.menuOpen ? 'x' : 'menu';
                _this.$emit('toggleMenu', {open: _this.menuOpen});
            }
        }
    }
</script>