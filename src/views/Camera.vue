<template>
    <main>
        <div ref="photo-container" class="photo-container" v-show="imageCapture">
            <video ref="video" autoplay muted></video>
            <button @click="startBenchmark">
                <feather-icon name="camera"/>
            </button>
        </div>
        <img v-if="imageSrc" ref="image" :src="imageSrc" alt="Test image">
        <div class="results" v-if="result">
            <p><strong>Resolution:</strong>{{ photoWidth }} x {{ photoHeight }}</p>
            <p><strong>Total:</strong>{{ result.total | fixed }} ms</p>
            <p><strong>Average:</strong>{{ result.average | fixed }} ms</p>
            <p><strong>Ops/Second:</strong>{{result.opsPerSec | fixed }}</p>
            <p><strong>Fastest:</strong>{{ result.fastest | fixed }} ms</p>
            <p><strong>Slowest:</strong>{{ result.slowest | fixed }} ms</p>
        </div>
        <button @click="prepareBenchmark">Open Camera</button>
    </main>
</template>

<script>
    export default {
        name: "Camera",
        data() {
            return {
                benchMark: null,
                result: null,
                imageCapture: null,
                imageSrc: null,
                photoWidth: 0,
                photoHeight: 0,

            }
        },
        filters: {
            fixed(value) {
                if (!value) return '';
                return Number.parseFloat(value).toFixed(2);
            },
            toPercent(value) {
                if (!value) return '';
                return Number.parseFloat(value * 100).toFixed(1) + ' %';
            }
        },
        mounted() {
            let _this = this;
            document.addEventListener('fullscreenchange', (event) => {
                if (!document.fullscreenElement) {
                    _this.imageCapture = null
                }
            });
            _this.benchMark = new this.$benchmark({
                name: 'Take photo',
                number: 1,
                before() {
                    _this.result = null;
                    _this.imageCapture = null;
                    _this.imageSrc = null
                },
                fun() {
                    return new Promise((resolve, reject) => {
                        _this.getUserMedia().then(() => {
                            _this.takePhoto().then(() => {
                                resolve()
                            }).catch(error => reject(error));
                        }).catch(error => reject(error));
                    });
                },
                after(result) {
                    _this.result = result;
                }
            });
        },
        methods: {
            startBenchmark() {
                this.benchMark.run();
            },
            prepareBenchmark() {
                this.getUserMedia();
                this.$refs['photo-container'].requestFullscreen();
            },
            getUserMedia() {
                let _this = this;
                return new Promise((resolve, reject) => {
                    navigator.mediaDevices.getUserMedia({video: true}).then(mediaStream => {
                        _this.$refs['video'].srcObject = mediaStream;
                        _this.imageCapture = new ImageCapture(mediaStream.getVideoTracks()[0]);
                        console.log(_this.imageCapture.track.getSettings());
                        resolve()
                    }).catch(error => reject(error));
                });
            },
            takePhoto() {
                let _this = this;
                return new Promise((resolve, reject) => {
                    let photoCapablilities = _this.imageCapture.getPhotoCapabilities();
                    photoCapablilities.then(capabilities => {
                        _this.imageCapture.takePhoto({
                            imageWidth: (_this.photoWidth = capabilities.imageWidth.max),
                            imageHeight: (_this.photoHeight = capabilities.imageHeight.max)
                        }).then(blob => {
                            let reader = new FileReader();
                            reader.readAsDataURL(blob);
                            reader.onloadend = function () {
                                _this.imageSrc = reader.result;
                                document.exitFullscreen();
                                _this.imageCapture = null;
                                resolve()
                            }
                        }).catch(error => {
                            reject(error)
                        });
                    });
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    img {
        width: 100%;
        margin-bottom: 20px;
    }

    h2 {
        margin-bottom: 20px;
    }

    .photo-container {
        position: relative;

        video {
            width: 100%;
            height: 100%;
        }

        button {
            position: absolute;
            bottom: 20px;
            left: 0;
            right: 0;
            margin: 0 auto;
            width: 50px;
            padding: 0;
        }
    }

    .results {
        margin-bottom: 20px;

        p {
            display: block;
            border-bottom: 1px solid #ededed;
            margin: 5px 0;
            padding-bottom: 5px;

            strong {
                display: inline-block;
                width: 170px;
            }
        }
    }
</style>