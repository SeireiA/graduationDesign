"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  __name: "settingView",
  setup(__props) {
    const toRouterPage = (url) => {
      common_vendor.index.navigateTo(
        { url, animationType: "pop-in", animationDuration: 200 }
      );
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$2,
        b: common_vendor.o(($event) => toRouterPage("/pages/dialogue/view/chatTopicView")),
        c: common_assets._imports_0$2,
        d: common_vendor.o(($event) => toRouterPage("/pages/dialogue/view/changeModelView")),
        e: common_assets._imports_0$2
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-674fc2db"]]);
wx.createPage(MiniProgramPage);
