"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_date = require("../../../utils/date.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (CompareImageComponent + _easycom_uni_icons)();
}
const CompareImageComponent = () => "../../../components/compareImageComponent.js";
const _sfc_main = {
  __name: "workflowsComponent",
  props: {
    workflowsData: {
      type: Array
    }
  },
  setup(__props) {
    const toPage = (url) => {
      common_vendor.index.navigateTo({
        url,
        animationType: "pop-in",
        animationDuration: 200
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.workflowsData, (item, index, i0) => {
          return {
            a: "508d0c33-0-" + i0,
            b: common_vendor.p({
              width: "680",
              height: "600",
              beforeImageUrl: item.originalImage,
              ["after-image-url"]: item.nowImage
            }),
            c: common_vendor.t(item.title),
            d: "508d0c33-1-" + i0,
            e: common_vendor.t(common_vendor.unref(utils_date.conversionTime)(item.createTime)),
            f: "508d0c33-2-" + i0,
            g: common_vendor.t(item.visited),
            h: common_vendor.o(($event) => toPage("/pages/drawing/view/drawingDetailsView?workflowsId=" + item.workflowsId), index),
            i: index,
            j: common_vendor.o(() => {
            }, index)
          };
        }),
        b: common_vendor.p({
          type: "paperplane",
          size: "26rpx",
          color: "#a6a6a6"
        }),
        c: common_vendor.p({
          type: "star-filled",
          size: "26rpx",
          color: "#a6a6a6"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-508d0c33"]]);
wx.createComponent(Component);
