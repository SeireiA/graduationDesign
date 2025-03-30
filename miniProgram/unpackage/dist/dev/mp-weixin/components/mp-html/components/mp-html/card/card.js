"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const _sfc_main = {
  props: {
    mode: {
      type: Boolean,
      default: false
    },
    src: String,
    title: String,
    desc: String,
    url: String,
    color: String,
    bgcolor: String,
    border: String
  },
  data() {
    return {};
  },
  computed: {
    customStyle() {
      return {
        "background-color": this.bgColor || "#a4d0ff",
        border: this.border || "1px solid #FFF",
        color: this.color || "#000"
      };
    }
  },
  methods: {
    onClick(e) {
      if (this.url && this.url.trim().length > 6 && !this.mode) {
        common_vendor.index.navigateTo({
          url: this.url,
          animationType: "pop-in",
          animationDuration: 200
        });
      }
      this.$emit("click", e);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.src,
    b: !!$props.desc
  }, !!$props.desc ? {
    c: common_vendor.t($props.title),
    d: common_vendor.t($props.desc)
  } : {
    e: common_vendor.t($props.title)
  }, {
    f: common_vendor.o((...args) => $options.onClick && $options.onClick(...args)),
    g: common_vendor.s($options.customStyle),
    h: _ctx.$attrs["data-i"]
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
