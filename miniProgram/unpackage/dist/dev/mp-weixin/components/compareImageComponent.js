"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  props: {
    width: {
      type: String,
      default: "750"
    },
    height: {
      type: String,
      default: "850"
    },
    beforeImageUrl: {
      type: String
    },
    afterImageUrl: {
      type: String
    },
    beforeText: {
      type: String,
      default: "参考图"
    },
    afterText: {
      type: String,
      default: "生成"
    }
  },
  data() {
    return {
      isPressDown: false,
      //鼠标是否正按住
      x: this.width / 2
      //设置位置
    };
  },
  methods: {
    handleTouchStart(event) {
      this.isPressDown = true;
      this.x = event.target.offsetLeft * 2;
      if (this.x <= 0) {
        this.x = this.width / 2;
      }
    },
    handleTouchMove(event) {
      if (!this.isPressDown) {
        return;
      }
      this.x = event.touches[0].clientX * 2;
      if (this.x >= this.width) {
        this.x = this.width;
      } else if (this.x <= 0) {
        this.x = 0;
      }
    },
    handleTouchEnd(event) {
      this.isPressDown = false;
      return false;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.beforeImageUrl,
    b: common_vendor.s("width:" + $props.width + "rpx;height:" + $props.height + "rpx"),
    c: $props.beforeText
  }, $props.beforeText ? {
    d: common_vendor.t($props.beforeText)
  } : {}, {
    e: common_vendor.s("width:" + $data.x + "rpx"),
    f: $props.afterImageUrl,
    g: common_vendor.s("width:" + $props.width + "rpx;height:" + $props.height + "rpx"),
    h: $props.afterText
  }, $props.afterText ? {
    i: common_vendor.t($props.afterText)
  } : {}, {
    j: common_vendor.s("left:" + $data.x + "rpx"),
    k: common_vendor.o((...args) => $options.handleTouchMove && $options.handleTouchMove(...args)),
    l: common_vendor.o((...args) => $options.handleTouchStart && $options.handleTouchStart(...args)),
    m: common_vendor.o((...args) => $options.handleTouchEnd && $options.handleTouchEnd(...args)),
    n: common_vendor.s("width:" + $props.width + "rpx;height:" + $props.height + "rpx")
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-53dcd9d0"]]);
wx.createComponent(Component);
