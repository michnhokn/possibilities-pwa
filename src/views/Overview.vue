<template>
    <main class="overview">
        <OverviewItem service-name="bluetooth">Bluetooth</OverviewItem>
        <OverviewItem service-name="nfc">Near Field Communication (NFC)</OverviewItem>
        <OverviewItem service-name="ondevicelight">Ambient Light</OverviewItem>
        <OverviewItem service-name="ontouchstart">Touch Gestures</OverviewItem>
        <OverviewItem service-name="getWakeLock">Wake Lock</OverviewItem>
    </main>
</template>

<script>
    import OverviewItem from "../components/OverviewItem";

    export default {
        name: "Overview",
        components: {OverviewItem},
    }
</script>