"use strict";
const common_vendor = require("../common/vendor.js");
const star = require("../star.js");
if (!Math) {
  LottieAnimationComponent();
}
const LottieAnimationComponent = () => "./lottieAnimationComponent.js";
const _sfc_main = {
  __name: "submitButtonComponent",
  props: {
    title: {
      type: String
    }
  },
  emits: ["onClick"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.title),
        b: common_vendor.p({
          frames: common_vendor.unref(star.StarLottie),
          width: 300,
          height: 200
        }),
        c: common_vendor.o(($event) => emits("onClick"))
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a8cb7132"]]);
wx.createComponent(Component);
