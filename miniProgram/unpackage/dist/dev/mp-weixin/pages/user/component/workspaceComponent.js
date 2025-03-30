"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const utils_date = require("../../../utils/date.js");
if (!Array) {
  const _easycom_custom_waterfalls_flow2 = common_vendor.resolveComponent("custom-waterfalls-flow");
  _easycom_custom_waterfalls_flow2();
}
const _easycom_custom_waterfalls_flow = () => "../../../uni_modules/custom-waterfalls-flow/components/custom-waterfalls-flow/custom-waterfalls-flow.js";
if (!Math) {
  (_easycom_custom_waterfalls_flow + EmptyDataComponent)();
}
const EmptyDataComponent = () => "../../../components/emptyDataComponent.js";
const _sfc_main = {
  __name: "workspaceComponent",
  props: {
    workspaceActive: {
      type: Number
    },
    workflowsWorksData: {
      type: Array
    },
    drawingTaskData: {
      type: Array
    }
  },
  emits: ["changeWorkspaceActive"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const workflowsWorksRef = common_vendor.ref(null);
    const props = __props;
    const emits = __emit;
    const tabSlide = common_vendor.ref({
      startTime: 0,
      startX: 0,
      startY: 0
    });
    const handleChangeWorkspaceActive = (active) => {
      emits("changeWorkspaceActive", active);
    };
    const handleToPreviewPage = (e) => {
      common_vendor.index.navigateTo({
        url: "/pages/drawing/view/drawingPreviewView?workflowsWorksId=" + e.workflowsWorksId
      });
    };
    const handleTouchWorkspaceStart = (e) => {
      tabSlide.value.startTime = Date.now();
      let changedTouch = e.changedTouches[0];
      tabSlide.value.startX = changedTouch.clientX;
      tabSlide.value.startY = changedTouch.clientY;
    };
    const handleTouchWorkspaceEnd = (e) => {
      let endTime = Date.now();
      let changedTouch = e.changedTouches[0];
      let clientX = changedTouch.clientX;
      let clientY = changedTouch.clientY;
      if (endTime - tabSlide.value.startTime > 1e3) {
        return;
      }
      if (Math.abs(clientX - tabSlide.value.startX) > 10 && Math.abs(clientY - tabSlide.value.startY) < 10) {
        if (clientX - tabSlide.value.startX > 0) {
          if (props.workspaceActive !== 0) {
            emits("changeWorkspaceActive", 0);
          }
        } else {
          if (props.workspaceActive !== 1) {
            emits("changeWorkspaceActive", 1);
          }
        }
      }
    };
    const handleWorkflowsWorksRefresh = () => {
      if (workflowsWorksRef.value) {
        workflowsWorksRef.value.refresh();
      }
    };
    __expose(
      { handleWorkflowsWorksRefresh }
    );
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.n(__props.workspaceActive === 0 ? "workspace-view-active" : "workspace-view-default"),
        b: common_vendor.n(__props.workspaceActive === 0 ? "workspace-underline" : ""),
        c: common_vendor.o(($event) => handleChangeWorkspaceActive(0)),
        d: common_vendor.n(__props.workspaceActive === 1 ? "workspace-view-active" : "workspace-view-default"),
        e: common_vendor.n(__props.workspaceActive === 1 ? "workspace-underline" : ""),
        f: common_vendor.o(($event) => handleChangeWorkspaceActive(1)),
        g: props.workflowsWorksData.length > 0
      }, props.workflowsWorksData.length > 0 ? {
        h: common_vendor.f(props.workflowsWorksData, (item, index, i0) => {
          return common_vendor.e({
            a: item.resultType === "VIDEO"
          }, item.resultType === "VIDEO" ? {} : {}, {
            b: item.resultType === "MODEL"
          }, item.resultType === "MODEL" ? {} : {}, {
            c: item.resultType === "AUDIO"
          }, item.resultType === "AUDIO" ? {} : {}, {
            d: item.resultType === "IMAGE"
          }, item.resultType === "IMAGE" ? {} : {}, {
            e: index
          });
        }),
        i: common_vendor.sr(workflowsWorksRef, "eba1d9fd-0", {
          "k": "workflowsWorksRef"
        }),
        j: common_vendor.o(handleToPreviewPage),
        k: common_vendor.p({
          value: props.workflowsWorksData
        })
      } : {
        l: common_vendor.p({
          height: 50,
          msg: "没有绘制过任何作品"
        })
      }, {
        m: __props.workspaceActive === 0,
        n: __props.drawingTaskData.length > 0
      }, __props.drawingTaskData.length > 0 ? {
        o: common_vendor.f(__props.drawingTaskData, (item, index, i0) => {
          return common_vendor.e({
            a: item.status === "SUCCEED"
          }, item.status === "SUCCEED" ? common_vendor.e({
            b: item.resultType === "MODEL" || item.resultType === "AUDIO"
          }, item.resultType === "MODEL" || item.resultType === "AUDIO" ? {
            c: item.url
          } : {
            d: item.url
          }, {
            e: common_vendor.t(item.workflowsName),
            f: item.resultType === "VIDEO"
          }, item.resultType === "VIDEO" ? {} : {}, {
            g: item.resultType === "IMAGE"
          }, item.resultType === "IMAGE" ? {} : {}, {
            h: item.resultType === "MODEL"
          }, item.resultType === "MODEL" ? {} : {}, {
            i: item.resultType === "AUDIO"
          }, item.resultType === "AUDIO" ? {} : {}, {
            j: common_vendor.t(common_vendor.unref(utils_date.conversionTime)(new Date(item.createTime))),
            k: common_vendor.o(($event) => handleToPreviewPage(item), index)
          }) : {}, {
            l: item.status === "WAIT"
          }, item.status === "WAIT" ? {
            m: common_vendor.t(item.workflowsName),
            n: common_vendor.t(item.location),
            o: common_vendor.t(common_vendor.unref(utils_date.conversionTime)(new Date(item.createTime)))
          } : {}, {
            p: item.status === "BUILD"
          }, item.status === "BUILD" ? {
            q: common_vendor.t(item.progress),
            r: common_vendor.t(item.workflowsName),
            s: common_vendor.t(common_vendor.unref(utils_date.conversionTime)(new Date(item.createTime)))
          } : {}, {
            t: item.status === "FAILED"
          }, item.status === "FAILED" ? {
            v: common_assets._imports_0$10,
            w: common_vendor.t(item.workflowsName),
            x: common_vendor.t(common_vendor.unref(utils_date.conversionTime)(new Date(item.createTime)))
          } : {}, {
            y: index
          });
        })
      } : {
        p: common_vendor.p({
          height: 50,
          msg: "单个任务会保留24小时"
        })
      }, {
        q: __props.workspaceActive === 1,
        r: common_vendor.o(handleTouchWorkspaceEnd),
        s: common_vendor.o(handleTouchWorkspaceStart)
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eba1d9fd"]]);
wx.createComponent(Component);
