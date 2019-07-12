<template>
    <div class="overview-item">
        <feather-icon :name="iconName" :class="{true:inNavigator}"></feather-icon>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "OverviewItem",
        props: {
            serviceName: {
                type: String,
                required: true
            }
        },
        computed: {
            iconName() {
                if (this.serviceName in navigator || this.serviceName in window) {
                    return 'check-circle';
                }
                return 'x-circle';
            },
            inNavigator() {
                return this.serviceName in navigator || this.serviceName in window
            }
        }
    }
</script>