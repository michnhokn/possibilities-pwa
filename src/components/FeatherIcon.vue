<template>
    <svg>
        <use :xlink:href="iconPath"></use>
    </svg>
</template>

<script>
    import feather from 'feather-icons/dist/feather-sprite.svg'

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