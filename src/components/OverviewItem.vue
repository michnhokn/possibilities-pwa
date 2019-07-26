<template>
    <a class="overview-item" :href="url" target="_blank">
        <feather-icon :name="iconName" :class="{true:inNavigator}"></feather-icon>
        <slot></slot>
        <feather-icon v-if="url" name="external-link" class="external"></feather-icon>
    </a>
</template>

<script>
    export default {
        name: "OverviewItem",
        props: {
            serviceName: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: false,
                default: null
            }
        },
        computed: {
            iconName() {
                if (this.serviceName in navigator || this.serviceName in window || this.serviceName in document) {
                    return 'check-circle';
                }
                return 'x-circle';
            },
            inNavigator() {
                return this.serviceName in navigator || this.serviceName in window || this.serviceName in document
            }
        }
    }
</script>