"use strict";
const common_vendor = require("../../../common/vendor.js");
const env = require("../../../env.js");
const store_index = require("../../../store/index.js");
const api_drawingTask = require("../../../api/drawingTask.js");
if (!Math) {
  (BackPreviousComponent + SubmitButtonComponent)();
}
const SubmitButtonComponent = () => "../../../components/submitButtonComponent.js";
const BackPreviousComponent = () => "../../../components/backPreviousComponent.js";
const _sfc_main = {
  __name: "drawingExecutionView",
  setup(__props) {
    const barTop = common_vendor.ref(0);
    const barHeight = common_vendor.ref(0);
    const drawingStatus = common_vendor.ref({
      progress: "",
      workflowsWorksId: void 0
    });
    const timer = common_vendor.ref(null);
    const isInvoke = common_vendor.ref(false);
    const handleGetDrawingProgress = async (taskId) => {
      timer.value = setInterval(async () => {
        if (!isInvoke.value) {
          isInvoke.value = true;
          try {
            let { data } = await api_drawingTask.reqGetTaskProgress(taskId);
            const { progress, workflowsWorksId, status, location } = data;
            if (status === "WAIT") {
              drawingStatus.value.progress = "任务正在列队中,当前排在" + location + "位";
              return;
            }
            if (status === "BUILD") {
              if (progress === 99) {
                drawingStatus.value.progress = "正在进行敏感检测";
              } else {
                drawingStatus.value.progress = progress + "%";
              }
              return;
            }
            if (status === "SUCCEED") {
              clearInterval(timer.value);
              common_vendor.index.$emit("WORKFLOWS_WORKS:REFRESH");
              common_vendor.index.redirectTo({
                url: "/pages/drawing/view/drawingPreviewView?workflowsWorksId=" + workflowsWorksId
              });
              return;
            }
            if (status === "FAILED") {
              common_vendor.index.showToast({
                title: "服务貌似出了点问题,请稍后再试",
                icon: "none",
                duration: 2e3
              });
              await store_index.store.dispatch("fetchUserInfo");
              clearInterval(timer.value);
              setTimeout(() => {
                common_vendor.index.navigateBack();
              }, 1e3);
            }
          } catch (e) {
            clearInterval(timer.value);
            common_vendor.index.showToast({ icon: "none", duration: 1e3, title: e.msg });
            common_vendor.index.navigateBack();
          } finally {
            isInvoke.value = false;
          }
        }
      }, 2e3);
    };
    const handleSubscription = async () => {
      let tmplIds = env.env.tmplIds;
      common_vendor.index.requestSubscribeMessage({
        tmplIds,
        success: async function(res) {
          if (res[tmplIds[0]] === "accept") {
            common_vendor.index.showToast({
              title: "作品生成完成后会以微信通知方式发送给您~",
              icon: "none",
              duration: 2e3
            });
          } else {
            common_vendor.index.showModal({
              title: "订阅消息",
              content: "您当前拒绝接收当前作品生成消息通知，是否去开启?",
              confirmText: "开启授权",
              confirmColor: "#345391",
              cancelText: "仍然拒绝",
              cancelColor: "#999999",
              success: (res2) => {
                if (res2.confirm) {
                  common_vendor.index.openSetting({
                    success(res3) {
                      console.log(res3);
                    }
                  });
                }
              }
            });
          }
        }
      });
    };
    common_vendor.onLoad((option) => {
      let menuButtonBoundingClientRect = common_vendor.index.getMenuButtonBoundingClientRect();
      barTop.value = menuButtonBoundingClientRect.top;
      barHeight.value = menuButtonBoundingClientRect.height;
      handleGetDrawingProgress(option.taskId);
    });
    common_vendor.onUnmounted(() => {
      clearInterval(timer.value);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["bar-height"]: barHeight.value,
          ["bar-top"]: barTop.value
        }),
        b: common_vendor.t(drawingStatus.value.progress ? drawingStatus.value.progress : "正在等待加入队列中"),
        c: common_vendor.o(handleSubscription),
        d: common_vendor.p({
          title: "完成后提醒我"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-81a1dad3"]]);
wx.createPage(MiniProgramPage);
