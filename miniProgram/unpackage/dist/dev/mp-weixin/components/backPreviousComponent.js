"use strict";
const common_vendor = require("../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "backPreviousComponent",
  props: {
    barTop: {
      type: Number
    },
    barHeight: {
      type: Number
    }
  },
  setup(__props) {
    const props = __props;
    const backPreviousPage = () => {
      try {
        common_vendor.index.navigateBack();
      } catch (e) {
        common_vendor.index.reLaunch({
          url: "/pages/user/user"
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "left",
          size: "26rpx",
          color: "black"
        }),
        b: props.barTop + "px",
        c: props.barHeight + "px",
        d: common_vendor.o(backPreviousPage)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9b80432b"]]);
wx.createComponent(Component);
