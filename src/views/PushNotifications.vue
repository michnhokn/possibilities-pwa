<template>
    <main class="push-notifications">
        <button @click="grantNotification">Grant Notification Permission</button>
        <button @click="sendNotification">Send Notification</button>
    </main>
</template>

<script>
    export default {
        name: "PushNotifications",
        methods: {
            grantNotification() {
                Notification.requestPermission();
            },
            sendNotification() {
                new Notification('This is a demo notification.', {
                    lang: 'en',
                    body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
                    icon: '/img/icons/192x192.png'
                });
            }
        }
    }
</script>