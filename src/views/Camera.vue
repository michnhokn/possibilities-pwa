<template>
    <main>
        <div ref="photo-container" class="photo-container" v-show="imageCapture">
            <video ref="video" autoplay muted></video>
            <div class="controls">
                <button @click="closeCamera" class="secondary">
                    <feather-icon name="x"/>
                </button>
                <button @click="startBenchmark">
                    <feather-icon name="camera"/>
                </button>
                <button @click="switchCamera" class="secondary">
                    <feather-icon name="rotate-cw"/>
                </button>
            </div>
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
                    _this.imageSrc = null
                },
                fun: () => _this.takePhoto(),
                after: () => _this.result = result
            });
        },
        methods: {
            startBenchmark() {
                this.benchMark.run();
            },
            prepareBenchmark() {
                this.setUserMedia();
                this.$refs['photo-container'].requestFullscreen();
            },
            switchCamera() {
                let facingMode = this.imageCapture.track.getConstraints()['facingMode'];
                if (facingMode !== undefined && facingMode === 'environment') {
                    this.setUserMedia('user');
                } else {
                    this.setUserMedia();
                }
            },
            closeCamera() {
                document.exitFullscreen();
            },
            setUserMedia(facingMode = 'environment') {
                let _this = this;
                return new Promise((resolve, reject) => {
                        navigator.mediaDevices.getUserMedia({
                            video: {
                                width: 1080,
                                height: 1920,
                                aspectRatio: 9 / 16,
                                facingMode: facingMode
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

        .controls {
            position: absolute;
            bottom: 30px;
            left: 0;
            right: 0;
            margin: 0 auto;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: row;

            button {
                width: 50px;
                padding: 0;
                margin: 0 10px;

                &.secondary {
                    opacity: .7;
                    transform: scale(.9);
                }
            }
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