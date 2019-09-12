<template>
    <main class="system">

        <div class="system__vibration">
            <h3>Vibration</h3>
            <div class="system__not-supported" v-if="!canVibrate">
                <p>Sorry, the Vibration API is not supported on your device.</p>
            </div>
            <div class="vibration__wrapper" v-if="canVibrate">
                <div class="vibration__item button button--left" @click="vibrate(100)">Vibrate for 100ms</div>
                <div class="vibration__item button button--left" @click="vibrate(500)">Vibrate for 500ms</div>
                <div class="vibration__item button button--left" @click="vibrate(1000)">Vibrate for 1s</div>
                <div class="vibration__item button button--left" @click="vibrate(3000)">Vibrate for 3s</div>
            </div>
        </div>

        <div class="system__permissions">
            <h3>Permissions</h3>
            <div class="system__not-supported" v-if="!permissionsCalculated">
                <p>Sorry the Permission API is not supported on your device.</p>
            </div>
            <div class="permissions__wrapper" v-if="permissionsCalculated">
                <div class="permissions__item" v-for="(permission, key) in availablePermissions"
                     :key="key" :class="permission.status">
                    <feather-icon :name="permission.icon || 'box'"></feather-icon>
                    <span>{{ permission.title }}</span>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
    export default {
        name: "System",
        data() {
            return {
                canVibrate: 'vibrate' in navigator,
                permissionsCalculated: false,
                availablePermissions: {
                    geolocation: {
                        title: 'Geolocation',
                        status: 'denied',
                        icon: 'map-pin'
                    },
                    notifications: {
                        title: 'Notifications',
                        status: 'denied',
                        icon: 'bell'
                    },
                    push: {
                        title: 'Push Notifications',
                        status: 'denied',
                        icon: 'bell'
                    },
                    midi: {
                        title: 'MIDI Devices️️',
                        status: 'denied',
                        icon: 'speaker'
                    },
                    camera: {
                        title: 'Camera',
                        status: 'denied',
                        icon: 'camera'
                    },
                    microphone: {
                        title: 'Microphone️',
                        status: 'denied',
                        icon: 'mic'
                    },
                    'background-sync': {
                        title: 'Background Sync️',
                        status: 'denied',
                        icon: 'upload'
                    },
                    accelerometer: {
                        title: 'Accelerometer️',
                        status: 'denied',
                        icon: 'move'
                    },
                    gyroscope: {
                        title: 'Gyroscope️',
                        status: 'denied',
                        icon: 'rotate-cw'
                    },
                    magnetometer: {
                        title: 'Magnetometer️️',
                        status: 'denied',
                        icon: 'compass'
                    },
                    'clipboard-read': {
                        title: 'Clipboard read',
                        status: 'denied',
                        icon: 'clipboard'
                    },
                    'clipboard-write': {
                        title: 'Clipboard write',
                        status: 'denied',
                        icon: 'clipboard'
                    },
                    'payment-handler': {
                        title: 'Payment Handler',
                        status: 'denied',
                        icon: 'dollar-sign'
                    },
                    'persistent-storage': {
                        title: 'Persistent Storage',
                        status: 'denied',
                        icon: 'database'
                    },
                }
            }
        },
        mounted() {
            if ('permissions' in navigator) {
                this.calculatePermissions()
            }
        },
        methods: {
            vibrate(duration = 500) {
                navigator.vibrate(duration)
            },
            calculatePermissions() {
                let _this = this,
                    permissionKeys = Object.keys(_this.availablePermissions);
                permissionKeys.forEach(key => {
                    navigator.permissions.query({
                        name: key,
                        userVisibleOnly: true
                    }).then(status => {
                        let newStatus = "denied";
                        switch (status.state) {
                            case "denied":
                                newStatus = "denied";
                                break;
                            case "granted":
                                newStatus = "granted️";
                                break;
                            case "prompt":
                                newStatus = "prompt️";
                                break;
                        }
                        _this.availablePermissions[key].status = newStatus
                    })
                });
                _this.permissionsCalculated = true
            }
        }
    }
</script>
