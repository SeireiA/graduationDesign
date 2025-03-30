"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
const _sfc_main = {
  __name: "uploadChooseComponent",
  emits: ["upload-image", "upload-file"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const emits = __emit;
    const popupRef = common_vendor.ref(null);
    const open = () => {
      popupRef.value.open();
    };
    const close = () => {
      popupRef.value.close();
    };
    const chooseMessageFile = () => {
      common_vendor.index.vibrateShort();
      emits("upload-file");
    };
    const chooseSystemImage = () => {
      common_vendor.index.vibrateShort();
      emits("upload-image");
    };
    __expose(
      { open, close }
    );
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$13,
        b: common_vendor.o(chooseMessageFile),
        c: common_assets._imports_1$1,
        d: common_vendor.o(chooseSystemImage),
        e: common_vendor.sr(popupRef, "8b980060-0", {
          "k": "popupRef"
        }),
        f: common_vendor.p({
          type: "bottom",
          ["background-color"]: "#171717"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8b980060"]]);
wx.createComponent(Component);
