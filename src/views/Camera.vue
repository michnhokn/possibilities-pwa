<template>
    <main class="camera">
        <pre class="camera__info">{{ cameraInfo }}</pre>
        <div class="camera__last" v-if="showLastImage">
            <div @click="closeLastImage">
                <feather-icon name="x"/>
            </div>
            <img :src="imageSrc" alt="" v-if="imageSrc">
        </div>
        <video ref="video" class="camera__stream" autoplay muted></video>
        <div class="camera__controls">
            <button @click="takePhoto">
                <feather-icon name="camera"/>
            </button>
            <button class="image" v-if="imageSrc" @click="openLastImage">
                <img :src="imageSrc" alt="">
            </button>
            <button @click="switchCamera" v-if="cameraIsSwitchable" class="secondary">
                <feather-icon :name="currentFacingMode === 'user' ? 'image' : 'user'"/>
            </button>
        </div>
    </main>
</template>

<script>
    export default {
        name: "Camera",
        data() {
            return {
                imageCapture: null,
                imageSrc: null,
                cameraIsSwitchable: false,
                showLastImage: false,
                currentAspectRatio: null
            }
        },
        computed: {
            currentFacingMode() {
                return this.imageCapture.track.getConstraints()['facingMode']
            },
            cameraInfo() {
                return this.imageCapture ? this.imageCapture.track.getSettings() : ''
            }
        },
        mounted() {
            let _this = this;
            _this.getVideoCapabilities().then(track => {
                let capabilities = track.getCapabilities(), settings = track.getSettings();
                _this.currentAspectRatio = _this.$refs['video'].clientWidth / _this.$refs['video'].clientHeight;
                _this.cameraIsSwitchable = capabilities.facingMode.length > 0;
                _this.initCamera(
                    capabilities.height.max * _this.currentAspectRatio,
                    capabilities.height.max
                )
            });
        },
        methods: {
            switchCamera() {
                let _this = this;
                if (_this.cameraIsSwitchable) {
                    if (_this.currentFacingMode === 'environment') {
                        this.setUserMedia('user');
                    } else {
                        this.setUserMedia();
                    }
                }
            },
            getVideoCapabilities(facingMode = 'environment') {
                return new Promise((resolve, reject) => {
                        navigator.mediaDevices.getUserMedia({video: {facingMode: facingMode}}).then(mediaStream => {
                            let imageCapture = new ImageCapture(mediaStream.getVideoTracks()[0]);
                            resolve(imageCapture.track)
                        }).catch(error => reject(error));
                    }
                );
            },
            initCamera(width, height, facingMode = 'environment') {
                let _this = this;
                return new Promise((resolve, reject) => {
                        navigator.mediaDevices.getUserMedia({
                            video: {
                                width: width,
                                height: height,
                                facingMode: facingMode,
                                frameRate: {
                                    ideal: 60
                                }
                            }
                        }).then(mediaStream => {
                            _this.$refs['video'].srcObject = mediaStream;
                            _this.imageCapture = new ImageCapture(mediaStream.getVideoTracks()[0]);
                            resolve()
                        }).catch(error => reject(error));
                    }
                );
            },
            takePhoto() {
                let _this = this,
                    // settings = _this.imageCapture.track.getSettings(),
                    reader = new FileReader();
                _this.imageCapture.takePhoto().then(blob => {
                    reader.readAsDataURL(blob);
                    reader.onloadend = function () {
                        _this.imageSrc = reader.result;
                    }
                })
            },
            openLastImage() {
                this.showLastImage = true;
            },
            closeLastImage() {
                this.showLastImage = false;
            }
        }
    }
</script>