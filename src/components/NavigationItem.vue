<template>
    <router-link tag="div" class="navigation__item" :to="to" @click.native="closeMenu">
        <feather-icon :name="icon"></feather-icon>
        <span><slot></slot></span>
    </router-link>
</template>

<script>
    export default {
        name: "NavigationItem",
        props: {
            to: {
                type: String,
                required: true
            },
            icon: {
                type: String,
                required: false,
                default: 'file-text'
            }
        },
        methods: {
            closeMenu() {
                let _this = this;
                setTimeout(function () {
                    _this.$store.commit('toggleMenu', false)
                }, 120);
            }
        }
    }
</script>