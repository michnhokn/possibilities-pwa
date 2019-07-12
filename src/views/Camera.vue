<template>
    <main>
        <div class="test">
            <video ref="video" autoplay muted></video>
            <img v-if="imageSrc" ref="image" :src="imageSrc" alt="Test image">
        </div>
        <div class="results" v-if="result">
            <p><strong>Resolution:</strong>{{ photoWidth }} x {{ photoHeight }}</p>
            <p><strong>Total:</strong>{{ result.total | fixed }} ms</p>
            <p><strong>Average:</strong>{{ result.average | fixed }} ms</p>
            <p><strong>Ops/Second:</strong>{{result.opsPerSec | fixed }}</p>
            <p><strong>Fastest:</strong>{{ result.fastest | fixed }} ms</p>
            <p><strong>Slowest:</strong>{{ result.slowest | fixed }} ms</p>
        </div>
        <button @click="startBenchmark" v-if="imageCapture">{{ buttonText }}</button>
        <pre v-if="capabilities">{{ capabilities }}</pre>
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
                buttonText: 'Take photo',
                photoWidth: 0,
                photoHeight: 0,
                capabilities: null
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

            _this.getUserMedia().then(() => {

            }).catch(error => reject(error));

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
                                _this.buttonText = 'Photo taken';
                                resolve()
                            }).catch(error => reject(error));
                        }).catch(error => reject(error));
                    });
                },
                after(result) {
                    _this.result = result;
                    _this.buttonText = 'Take new photo';
                }
            });
        },
        methods: {
            startBenchmark() {
                this.benchMark.run().catch(err => console.table(err));
            },
            getUserMedia() {
                let _this = this;
                return new Promise((resolve, reject) => {
                    navigator.mediaDevices.getUserMedia({video: true}).then(mediaStream => {
                        _this.$refs['video'].srcObject = mediaStream;
                        _this.imageCapture = new ImageCapture(mediaStream.getVideoTracks()[0]);
                        resolve()
                    }).catch(error => reject(error));
                });
            },
            takePhoto() {
                let _this = this;
                return new Promise((resolve, reject) => {
                    let photoCapablilities = _this.imageCapture.getPhotoCapabilities();
                    photoCapablilities.then(capabilities => {
                        console.log(capabilities);
                        _this.imageCapture.takePhoto({
                            imageWidth: (_this.photoWidth = capabilities.imageWidth.max),
                            imageHeight: (_this.photoHeight = capabilities.imageHeight.max)
                        }).then(blob => {
                            let reader = new FileReader();
                            reader.readAsDataURL(blob);
                            reader.onloadend = function () {
                                _this.imageSrc = reader.result;
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
    h2 {
        margin-bottom: 20px;
    }

    .test {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: row;
        background-color: #ededed;
        width: 100%;
        margin-bottom: 20px;

        img, video {
            display: block;
            max-width: 50%;
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

    button {
        padding: 8px 20px;
        border: 1px solid #111111;
        border-radius: 3px;
        font-size: 1rem;
        width: 100%;
    }
</style>