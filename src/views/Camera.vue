<template>
    <main class="camera">
        <div class="camera__last" v-if="showLastImage">
            <div @click="closeLastImage">
                <feather-icon name="x"/>
            </div>
            <img :src="imageSrc" alt="" v-if="imageSrc">
        </div>
        <video ref="video" class="camera__stream" autoplay muted></video>
        <button class="camera__open-last" v-if="imageSrc" @click="openLastImage">
            <img :src="imageSrc" alt="">
        </button>
        <button class="camera__take-photo" @click="takePhoto" v-if="imageCapture">
            <feather-icon name="camera"/>
        </button>
        <button class="camera__switch" @click="switchCamera" v-if="cameraIsSwitchable">
            <feather-icon :name="currentFacingMode === 'user' ? 'image' : 'user'"/>
        </button>
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
                showLastImage: false,
                currentAspectRatio: null
            }
        },
        computed: {
            currentFacingMode() {
                return this.imageCapture.track.getConstraints()['facingMode']
            },
            cameraIsSwitchable() {
                return this.imageCapture ? this.imageCapture.track.getCapabilities()['facingMode'].length > 0 : false
            }
        },
        mounted() {
            this.setupCamera();
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
            setupCamera(facingMode = 'user') {
                let _this = this;
                _this.getVideoCapabilities(facingMode).then(track => {
                    let settings = track.getSettings();
                    _this.currentAspectRatio = _this.$refs['video'].clientWidth / _this.$refs['video'].clientHeight;
                    _this.initCamera(
                        settings.height * _this.currentAspectRatio,
                        settings.height,
                        facingMode
                    )
                });
            },
            getVideoCapabilities(facingMode = 'user') {
                return new Promise((resolve, reject) => {
                        navigator.mediaDevices.getUserMedia({video: {facingMode: facingMode}}).then(mediaStream => {
                            let imageCapture = new ImageCapture(mediaStream.getVideoTracks()[0]);
                            resolve(imageCapture.track)
                        }).catch(error => reject(error));
                    }
                );
            },
            initCamera(width, height, facingMode = 'user') {
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