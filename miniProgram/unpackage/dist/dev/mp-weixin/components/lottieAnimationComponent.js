"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  name: "lottie-animation",
  props: {
    width: {
      type: [Number, String],
      default: 48
    },
    height: {
      type: [Number, String],
      default: 48
    },
    frames: {
      type: Object,
      required: true,
      default: void 0
    },
    loop: {
      type: Boolean,
      default: true
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    speed: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      lottieId: `lottie-${Math.floor(Math.random() * 99999999)}`
    };
  },
  computed: {
    style() {
      const style = {
        "--zui-animator-width": typeof this.width === "number" ? `${this.width}rpx` : this.width,
        "--zui-animator-height": typeof this.height === "number" ? `${this.height}rpx` : this.height
      };
      return Object.keys(style).map((key) => `${key}:${style[key]}`).join("; ");
    }
  },
  watch: {
    frames() {
      this.initialAni();
    },
    speed() {
      this.setSpeed(this.speed);
    }
  },
  mounted() {
    this.initialAni();
  },
  unmounted() {
    if (!this.lottie)
      return;
    this.lottie.stop();
    this.lottie.destroy();
  },
  methods: {
    async initialAni() {
      if (this.lottie) {
        this.lottie.destroy();
      }
      if (!this.frames)
        return;
      this.createSelectorQuery().select("." + this.lottieId).node((res) => {
        const canvas = res.node;
        canvas.width = parseInt(this.width);
        canvas.height = parseInt(this.height);
        common_vendor.Lottie.setup(canvas);
        this.launchLottie({
          renderer: "canvas",
          rendererSettings: {
            context: canvas.getContext("2d")
          }
        });
      }).exec();
    },
    launchLottie(opts) {
      this.lottie = common_vendor.Lottie.loadAnimation({
        ...opts,
        loop: this.loop,
        autoplay: this.autoplay,
        animationData: this.frames
      });
      this.lottie.setSpeed(this.speed);
    },
    play() {
      if (!this.lottie)
        return;
      this.lottie.play();
    },
    stop() {
      if (!this.lottie)
        return;
      this.lottie.stop();
    },
    pause() {
      if (!this.lottie)
        return;
      this.lottie.pause();
    },
    setLocationHref(locationHref) {
      if (!this.lottie)
        return;
      this.lottie.setLocationHref(locationHref);
    },
    setSpeed(speed) {
      if (!this.lottie)
        return;
      this.lottie.setSpeed(speed);
    },
    gotoAndStop(value, isFrame) {
      if (!this.lottie)
        return;
      this.lottie.goToAndStop(value, isFrame);
    },
    gotoAndPlay(value, isFrame) {
      if (!this.lottie)
        return;
      this.lottie.goToAndPlay(value, isFrame);
    },
    setDirection(direction) {
      if (!this.lottie)
        return;
      this.lottie.setDirection(direction);
    },
    playSegments(segments, forceFlag) {
      if (!this.lottie)
        return;
      this.lottie.playSegments(segments, forceFlag);
    },
    setSubframe(flag) {
      if (!this.lottie)
        return;
      this.lottie.setSubframe(flag);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.n(`wrapper ${$data.lottieId}`),
    b: common_vendor.s($options.style)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f41e3f68"]]);
wx.createComponent(Component);
