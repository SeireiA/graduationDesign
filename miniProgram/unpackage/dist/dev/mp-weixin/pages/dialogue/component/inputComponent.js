"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  __name: "inputComponent",
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  emits: ["send", "stop", "upload"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const emits = __emit;
    const animationInput = common_vendor.ref({});
    const text = common_vendor.ref("");
    const props = __props;
    const send = () => {
      if (text.value.trim()) {
        common_vendor.index.vibrateShort();
        emits("send", text.value);
      }
    };
    const stop = () => {
      common_vendor.index.vibrateShort();
      emits("stop");
    };
    const upload = () => {
      common_vendor.index.vibrateShort();
      emits("upload");
    };
    const clear = () => {
      text.value = "";
    };
    common_vendor.onLoad(() => {
      const animation = common_vendor.index.createAnimation({
        duration: 900,
        timingFunction: "ease-in-out"
      });
      animation.translate(0, -85).step();
      animationInput.value = animation.export();
    });
    __expose(
      { clear }
    );
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$14,
        b: common_vendor.o(upload),
        c: props.isLoading,
        d: props.isLoading ? "请稍等片刻..." : "有什么需要我帮忙的吗?",
        e: text.value,
        f: common_vendor.o(($event) => text.value = $event.detail.value),
        g: !props.isLoading
      }, !props.isLoading ? {
        h: common_assets._imports_1$2,
        i: common_vendor.o(send)
      } : {
        j: common_vendor.o(stop)
      }, {
        k: animationInput.value ? animationInput.value : ""
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dfc26d6a"]]);
wx.createComponent(Component);
