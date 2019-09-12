<template>
    <main class="overview">
        <div class="overview__wrapper">
            <template v-for="category in categories">
                <OverviewItemsList :key="category.category" :category="category"></OverviewItemsList>
            </template>
        </div>
        <a href="https://developer.mozilla.org/en-US/docs/Web/API">https://developer.mozilla.org/en-US/docs/Web/API</a>
        <a href="https://whatwebcando.today/">https://whatwebcando.today/</a>
    </main>
</template>

<script>
    import categories from "../assets/data/possibilities";
    import OverviewItemsList from "../components/OverviewItemsList";

    export default {
        name: "Overview",
        components: {OverviewItemsList},
        computed: {
            categories() {
                return categories;
            }
        }
    }
</script>