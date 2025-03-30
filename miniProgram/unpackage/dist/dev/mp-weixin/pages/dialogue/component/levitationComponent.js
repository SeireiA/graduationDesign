"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const store_token = require("../../../store/token.js");
const _sfc_main = {
  __name: "levitationComponent",
  emits: ["new-chat-topic"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    const handleNewChat = () => {
      emits("new-chat-topic");
    };
    const toTopicPage = () => {
      if (store_token.getTokenValue()) {
        common_vendor.index.navigateTo({
          url: "/pages/dialogue/view/chatTopicView",
          animationType: "pop-in",
          animationDuration: 200
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/user/user",
          animationType: "pop-in",
          animationDuration: 200
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$5,
        b: common_vendor.o(handleNewChat),
        c: common_vendor.o(toTopicPage)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c11e3c36"]]);
wx.createComponent(Component);
