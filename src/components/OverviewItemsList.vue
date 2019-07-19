<template>
    <div class="overview-items-list">
        <div class="name" @click="show = !show">
            <span>{{ category.name }}</span>
            <feather-icon :name="show ? 'chevron-up' : 'chevron-down'"></feather-icon>
        </div>
        <div class="overview-items" v-show="show">
            <OverviewItem v-for="possibility in category.possibilities"
                          :service-name="possibility.service"
                          :url="possibility.url">
                {{ possibility.name }}
            </OverviewItem>
        </div>
    </div>
</template>

<script>
    import OverviewItem from "../components/OverviewItem";

    export default {
        name: "OverviewItemsList",
        components: {OverviewItem},
        props: {
            category: {
                type: Object,
                required: true
            },
            showItems: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        data() {
            return {
                show: false
            }
        },
        mounted() {
            this.show = this.showItems
        }
    }
</script>