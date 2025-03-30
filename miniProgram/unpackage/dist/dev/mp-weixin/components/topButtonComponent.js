"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
const _sfc_main = {
  __name: "topButtonComponent",
  props: {
    isShow: {
      type: Boolean
    }
  },
  emits: ["clickTop"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    const props = __props;
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$11,
        b: props.isShow ? 1 : 0,
        c: common_vendor.o(($event) => emits("clickTop"))
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d3bd852e"]]);
wx.createComponent(Component);
