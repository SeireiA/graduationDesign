"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_drawingWorkflows = require("../../../api/drawingWorkflows.js");
const store_token = require("../../../store/token.js");
const api_drawingTask = require("../../../api/drawingTask.js");
const store_index = require("../../../store/index.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (BackPreviousComponent + LoadingPageComponent + _easycom_uni_icons + SubmitButtonComponent)();
}
const LoadingPageComponent = () => "../../../components/loadingPageComponent.js";
const BackPreviousComponent = () => "../../../components/backPreviousComponent.js";
const SubmitButtonComponent = () => "../../../components/submitButtonComponent.js";
const _sfc_main = {
  __name: "drawingFormView",
  setup(__props) {
    const obj = common_vendor.ref({
      energy: void 0,
      containers: [],
      workflowsId: void 0,
      workflowsName: ""
    });
    const barTop = common_vendor.ref(0);
    const barHeight = common_vendor.ref(0);
    const isLoading = common_vendor.ref(true);
    const handleGetWorkflowsInterface = async (id) => {
      try {
        isLoading.value = true;
        const { data } = await api_drawingWorkflows.reqGetWorkflowsInterface(id);
        obj.value = data;
      } catch (e) {
        common_vendor.index.showToast({ icon: "none", duration: 1e3, title: e.msg });
        common_vendor.index.navigateBack();
      } finally {
        setTimeout(() => {
          isLoading.value = false;
        }, 500);
      }
    };
    const handleSubmitTask = async () => {
      for (let i = 0; i < obj.value.containers.length; i++) {
        const item = obj.value.containers[i];
        if (!item.nodeValue) {
          common_vendor.index.showToast({
            title: item.tips,
            icon: "none",
            duration: 4e3
          });
          return;
        }
      }
      const map = obj.value.containers.map((c) => {
        return {
          nodeDigital: c.nodeDigital,
          nodeKey: c.nodeKey,
          nodeValue: c.nodeValue
        };
      });
      try {
        common_vendor.index.showLoading({
          title: "正在提交中",
          mask: true
        });
        const { data } = await api_drawingTask.reqSubmitTask({
          workflowsId: obj.value.workflowsId,
          containers: map
        });
        await store_index.store.dispatch("fetchUserInfo");
        common_vendor.index.navigateTo({
          url: "/pages/drawing/view/drawingExecutionView?taskId=" + data + "&workflowsId=" + obj.value.workflowsId.value,
          animationType: "pop-in",
          animationDuration: 200
        });
      } catch (e) {
        common_vendor.index.showToast({
          icon: "none",
          duration: 1500,
          title: e.msg
        });
      } finally {
        common_vendor.index.hideLoading();
      }
    };
    const handleDeleteNodeData = (index) => {
      obj.value.containers[index].nodeValue = "";
      obj.value.containers[index].preview = "";
    };
    const handleUploadVideo = (index) => {
      common_vendor.index.showActionSheet({
        itemList: ["相册中选择"],
        success: () => {
          common_vendor.index.chooseVideo({
            count: 1,
            success: (res) => {
              if (res.size > 12 * 1024 * 1024) {
                common_vendor.index.showToast({
                  title: "视频超过了12MB,请重新选择",
                  icon: "none",
                  duration: 4e3
                });
                return;
              }
              upload(res.tempFilePath, index);
            },
            fail: {}
          });
        }
      });
    };
    const handleUploadImage = (index) => {
      common_vendor.index.showActionSheet({
        itemList: ["相册中选择"],
        success: () => {
          common_vendor.index.chooseImage({
            count: 1,
            success: (res) => {
              if (res.tempFiles[0].size > 4 * 1024 * 1024) {
                common_vendor.index.showToast({
                  title: "图片超过了4MB,请重新选择",
                  icon: "none",
                  duration: 4e3
                });
                return;
              }
              let file = res.tempFiles[0].path;
              upload(file, index);
            },
            fail: {}
          });
        }
      });
    };
    const upload = (file, index) => {
      console.log(file);
      common_vendor.index.showLoading({
        title: "正在上传中",
        mask: true
      });
      common_vendor.index.uploadFile({
        url: api_drawingWorkflows.reqGetUploadWorkflowsComponentFile(),
        filePath: file,
        name: "file",
        header: {
          "Authorization": "Bearer " + store_token.getTokenValue()
        },
        success(res) {
          const { data } = JSON.parse(res.data);
          obj.value.containers[index].nodeValue = data.fileName;
          obj.value.containers[index].preview = data.preview;
          common_vendor.index.hideLoading();
        },
        fail(e) {
          console.log(e);
          common_vendor.index.hideLoading();
          common_vendor.index.showToast({
            title: "上传资源失败",
            icon: "none",
            duration: 4e3
          });
        }
      });
    };
    common_vendor.onLoad((option) => {
      let menuButtonBoundingClientRect = common_vendor.index.getMenuButtonBoundingClientRect();
      barTop.value = menuButtonBoundingClientRect.top;
      barHeight.value = menuButtonBoundingClientRect.height;
      handleGetWorkflowsInterface(option.workflowsId);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          ["bar-height"]: barHeight.value,
          ["bar-top"]: barTop.value
        }),
        b: isLoading.value
      }, isLoading.value ? {} : {}, {
        c: common_vendor.f(obj.value.containers, (item, index, i0) => {
          return common_vendor.e({
            a: item.type === "VIDEO_UPLOAD"
          }, item.type === "VIDEO_UPLOAD" ? common_vendor.e({
            b: "d0703bd5-2-" + i0,
            c: common_vendor.p({
              type: "videocam",
              size: "35rpx",
              color: "white"
            }),
            d: common_vendor.t(item.tips),
            e: item.nodeValue
          }, item.nodeValue ? {
            f: item.preview,
            g: common_vendor.o(($event) => handleDeleteNodeData(index), index)
          } : {
            h: common_vendor.o(($event) => handleUploadVideo(index), index)
          }) : {}, {
            i: item.type === "IMAGE_UPLOAD"
          }, item.type === "IMAGE_UPLOAD" ? common_vendor.e({
            j: "d0703bd5-3-" + i0,
            k: common_vendor.p({
              type: "image",
              size: "35rpx",
              color: "white"
            }),
            l: common_vendor.t(item.tips),
            m: item.nodeValue
          }, item.nodeValue ? {
            n: item.preview,
            o: common_vendor.o(($event) => handleDeleteNodeData(index), index)
          } : {
            p: common_vendor.o(($event) => handleUploadImage(index), index)
          }) : {}, {
            q: item.type === "TEXT_PROMPT"
          }, item.type === "TEXT_PROMPT" ? {
            r: "d0703bd5-4-" + i0,
            s: common_vendor.p({
              type: "compose",
              size: "35rpx",
              color: "white"
            }),
            t: common_vendor.t(item.tips),
            v: item.nodeValue,
            w: common_vendor.o(($event) => item.nodeValue = $event.detail.value, index)
          } : {}, {
            x: index
          });
        }),
        d: common_vendor.o(handleSubmitTask),
        e: common_vendor.p({
          title: "快速生成 消耗" + obj.value.energy + "能量"
        }),
        f: !isLoading.value
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d0703bd5"]]);
wx.createPage(MiniProgramPage);
