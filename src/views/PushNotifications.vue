<template>
    <main class="push-notifications">
        <button @click="grantNotification">Grant Notification Permission</button>
        <button @click="sendNotification">Send Notification</button>
    </main>
</template>

<script>
    export default {
        name: "PushNotifications",
        data() {
            return {
                notificationTitle: 'This is a demo notification.',
                notificationOptions: {
                    lang: 'en',
                    body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
                    icon: '/img/icons/192x192.png',
                    requireInteraction: true
                }
            }
        },
        methods: {
            grantNotification() {
                Notification.requestPermission();
            },
            sendNotification() {
                let _this = this;
                navigator.serviceWorker.ready.then(function (registration) {
                    registration.showNotification(_this.notificationTitle, _this.notificationOptions)
                });
            }
        }
    }
</script>