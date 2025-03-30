"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "topComponent",
  props: {
    workflowsCategoryData: {
      type: Array
    },
    workflowsCategoryId: {
      type: String
    },
    prompt: {
      type: String
    }
  },
  emits: ["queryByCategory", "queryByPrompt"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const barTop = common_vendor.ref(0);
    const barHeight = common_vendor.ref(0);
    const workflowsCategoryId = common_vendor.ref("");
    const prompt = common_vendor.ref("");
    const handleQueryByPromptClear = () => {
      emits("queryByPrompt", "");
    };
    common_vendor.onLoad(() => {
      let menuButtonBoundingClientRect = common_vendor.index.getMenuButtonBoundingClientRect();
      barTop.value = menuButtonBoundingClientRect.top;
      barHeight.value = menuButtonBoundingClientRect.height;
    });
    common_vendor.watch(() => props.workflowsCategoryId, (e) => {
      workflowsCategoryId.value = e;
    }, {
      immediate: true
    });
    common_vendor.watch(() => props.prompt, (e) => {
      prompt.value = e;
    }, {
      immediate: true
    });
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$7,
        b: common_vendor.p({
          type: "search",
          size: "50rpx",
          color: "#676767"
        }),
        c: common_vendor.o(handleQueryByPromptClear),
        d: common_vendor.o(($event) => emits("queryByPrompt", prompt.value)),
        e: prompt.value,
        f: common_vendor.o(($event) => prompt.value = $event.detail.value),
        g: common_vendor.f(__props.workflowsCategoryData, (item, index, i0) => {
          return {
            a: common_vendor.t(item.categoryName),
            b: common_vendor.n(item.workflowsCategoryId === workflowsCategoryId.value ? "scroll-item-active" : "scroll-item"),
            c: index,
            d: common_vendor.o(($event) => emits("queryByCategory", item.workflowsCategoryId), index)
          };
        }),
        h: barTop.value + "px",
        i: barHeight.value + "px"
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f20ff04e"]]);
wx.createComponent(Component);
