<template>
    <svg>
        <use :xlink:href="iconPath"></use>
    </svg>
</template>

<script>
    import feather from './../../node_modules/feather-icons/dist/feather-sprite.svg';

    export default {
        name: "FeatherIcon",
        props: {
            name: {
                type: String,
                required: true
            }
        },
        computed: {
            iconPath() {
                return feather + '#' + this.name;
            }
        }
    }
</script>

<style scoped>
    svg {
        width: 20px;
        height: 20px;
        fill: none;
        stroke: currentColor;
        stroke-width: 2px;
        stroke-linecap: round;
        stroke-linejoin: round;
    }
</style>