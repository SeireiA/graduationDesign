"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  __name: "loadingDataComponent",
  props: {
    isLoading: {
      type: Boolean,
      default: true
    },
    top: {
      type: Number,
      default: 80
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return {
        a: props.isLoading ? 1 : 0,
        b: props.top + "rpx"
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c1f16291"]]);
wx.createComponent(Component);
