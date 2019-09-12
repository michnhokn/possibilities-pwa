<template>
    <main class="camera">
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
        <canvas class="camera__canvas" ref="canvas"></canvas>
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
            this.setupCamera()
        },
        methods: {
            switchCamera() {
                let _this = this;
                if (_this.cameraIsSwitchable) {
                    if (_this.currentFacingMode === 'environment') {
                        _this.setupCamera('user')
                    } else {
                        _this.setupCamera('environment')
                    }
                }
            },
            setupCamera(facingMode = 'environment') {
                let _this = this;
                _this.getVideoCapabilities(facingMode).then(track => {
                    let capabilities = track.getCapabilities(), settings = track.getSettings();
                    // eslint-disable-next-line no-console
                    console.log("Capabilities:", capabilities);
                    // eslint-disable-next-line no-console
                    console.log("Settings:", settings);
                    _this.currentAspectRatio = _this.$refs['video'].clientWidth / _this.$refs['video'].clientHeight;
                    _this.cameraIsSwitchable = capabilities.facingMode.length > 0;
                    _this.initCamera(
                        settings.height * _this.currentAspectRatio,
                        settings.height,
                        facingMode
                    )
                });
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
                                width: {
                                    min: width,
                                    max: width
                                },
                                height: {
                                    min: height,
                                    max: height
                                },
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
                let _this = this;
                _this.imageCapture.grabFrame().then(imageBitmap => {
                    _this.$refs['canvas'].width = imageBitmap.width;
                    _this.$refs['canvas'].height = imageBitmap.height;
                    _this.$refs['canvas'].getContext('2d').drawImage(imageBitmap, 0, 0);
                    _this.imageSrc = _this.$refs['canvas'].toDataURL();
                });
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