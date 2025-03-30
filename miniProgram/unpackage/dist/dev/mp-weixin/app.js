"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const store_index = require("./store/index.js");
const components_share_share = require("./components/share/share.js");
if (!Math) {
  "./pages/dialogue/dialogue.js";
  "./pages/drawing/drawing.js";
  "./pages/user/user.js";
  "./pages/drawing/view/drawingPreviewView.js";
  "./pages/drawing/view/drawingExecutionView.js";
  "./pages/drawing/view/drawingFormView.js";
  "./pages/drawing/view/drawingDetailsView.js";
  "./pages/setting/setting.js";
  "./pages/dialogue/view/chatTopicView.js";
  "./pages/dialogue/view/settingView.js";
  "./pages/dialogue/view/changeModelView.js";
  "./pages/setting/view/userAgreementView.js";
  "./pages/setting/view/privacyPolicyView.js";
  "./pages/setting/view/personalInformationView.js";
}
const _sfc_main = {
  onLaunch: async function() {
    store_index.store.commit("initState");
    await store_index.store.dispatch("fetchDisguiseStatus");
    await store_index.store.dispatch("fetchUserInfo");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.mixin(components_share_share.share);
  app.use(store_index.store);
  return {
    app,
    Vuex: common_vendor.index$1
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
