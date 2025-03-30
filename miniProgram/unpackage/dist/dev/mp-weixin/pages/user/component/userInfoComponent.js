"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const store_index = require("../../../store/index.js");
const _sfc_main = {
  __name: "userInfoComponent",
  emits: ["rewardedAds"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    const barTop = common_vendor.ref(0);
    const barHeight = common_vendor.ref(0);
    const handleToPage = (url) => {
      common_vendor.index.navigateTo({
        url,
        animationType: "pop-in",
        animationDuration: 200
      });
    };
    common_vendor.onLoad(() => {
      let menuButtonBoundingClientRect = common_vendor.index.getMenuButtonBoundingClientRect();
      barTop.value = menuButtonBoundingClientRect.top + 5;
      barHeight.value = menuButtonBoundingClientRect.height;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$9,
        b: common_vendor.o(($event) => handleToPage("/pages/setting/setting")),
        c: barTop.value + "px",
        d: barHeight.value + "px",
        e: common_vendor.unref(store_index.store).getters.userInfo
      }, common_vendor.unref(store_index.store).getters.userInfo ? {
        f: common_vendor.unref(store_index.store).getters.userInfo.avatar ? common_vendor.unref(store_index.store).getters.userInfo.avatar : "/static/avatar/default_user.png",
        g: common_vendor.t(common_vendor.unref(store_index.store).getters.userInfo.nickName),
        h: common_vendor.t(common_vendor.unref(store_index.store).getters.userInfo.energy)
      } : {}, {
        i: common_vendor.o(($event) => emits("rewardedAds")),
        j: common_vendor.o(($event) => emits("rewardedAds"))
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-891032b1"]]);
wx.createComponent(Component);
