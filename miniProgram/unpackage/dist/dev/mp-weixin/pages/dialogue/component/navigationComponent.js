"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  __name: "navigationComponent",
  props: {
    // 显示文本
    title: {
      type: String,
      default: "TypeScript"
    },
    // 模型版本
    modelVersion: {
      type: String,
      default: ""
    },
    //详细信息
    details: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const navBarHeight = common_vendor.ref(0);
    const toSetting = () => {
      common_vendor.index.navigateTo({
        url: "/pages/dialogue/view/settingView",
        animationType: "pop-in",
        animationDuration: 200
      });
    };
    common_vendor.onLoad(() => {
      let {
        top
      } = common_vendor.index.getMenuButtonBoundingClientRect();
      navBarHeight.value = top - 15;
    });
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$6,
        b: common_vendor.o(toSetting),
        c: navBarHeight.value + "px"
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b510a51d"]]);
wx.createComponent(Component);
