"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "setting",
  setup(__props) {
    const toPage = (url) => {
      common_vendor.index.navigateTo(
        { url, animationType: "pop-in", animationDuration: 200 }
      );
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.o(($event) => toPage("/pages/setting/view/personalInformationView")),
        c: common_assets._imports_0,
        d: common_vendor.o(($event) => toPage("/pages/setting/view/userAgreementView")),
        e: common_assets._imports_0,
        f: common_vendor.o(($event) => toPage("/pages/setting/view/privacyPolicyView")),
        g: common_assets._imports_0
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-018cdf56"]]);
wx.createPage(MiniProgramPage);
