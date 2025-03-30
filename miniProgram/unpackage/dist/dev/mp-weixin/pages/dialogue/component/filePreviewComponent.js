"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  __name: "filePreviewComponent",
  props: {
    fileType: {
      type: String
    },
    fileName: {
      type: String,
      default: ""
    },
    fileSize: {
      type: Number,
      default: ""
    },
    fileUrl: {
      type: String,
      default: ""
    }
  },
  emits: ["preview"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    const props = __props;
    const preview = (src) => {
      emits("preview", src);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: props.fileType === "PDF"
      }, props.fileType === "PDF" ? {
        b: common_assets._imports_0$12
      } : {}, {
        c: props.fileType === "XLSX"
      }, props.fileType === "XLSX" ? {
        d: common_assets._imports_1
      } : {}, {
        e: props.fileType === "DOCX"
      }, props.fileType === "DOCX" ? {
        f: common_assets._imports_2
      } : {}, {
        g: props.fileType === "IMAGE"
      }, props.fileType === "IMAGE" ? {
        h: common_assets._imports_3
      } : {}, {
        i: common_vendor.t(props.fileName),
        j: common_vendor.t(props.fileSize),
        k: common_vendor.o(($event) => preview(props.fileUrl))
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-96b5f5a9"]]);
wx.createComponent(Component);
