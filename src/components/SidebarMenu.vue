<template>
    <nav class="sidebar-menu" :class="{'sidebar-menu--open':menuOpen}">
        <NavItem icon="home" to="/">Startseite</NavItem>
    </nav>
</template>

<script>
    import NavItem from "./Sidebar/NavItem";

    export default {
        name: "SidebarMenu",
        components: {NavItem},
        props: {
            menuOpen: {
                type: Boolean,
                required: true,
                default: false
            }
        }
    }
</script>