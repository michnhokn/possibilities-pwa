<template>
    <router-link tag="div" class="sidebar-menu__item" :to="to">
        <feather-icon :name="icon"></feather-icon>
        <span><slot></slot></span>
    </router-link>
</template>

<script>
    export default {
        name: "NavItem",
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
        }
    }
</script>