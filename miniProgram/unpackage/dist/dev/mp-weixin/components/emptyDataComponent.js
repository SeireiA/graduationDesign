"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
const _sfc_main = {
  __name: "emptyDataComponent",
  props: {
    msg: {
      type: String,
      default: "这里空空如也"
    },
    height: {
      type: Number,
      default: 100
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$8,
        b: common_vendor.t(__props.msg),
        c: props.height + "vh"
      };
    };
  }
};
wx.createComponent(_sfc_main);
