"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_drawingWorks = require("../../../api/drawingWorks.js");
if (!Array) {
  const _component_xr_start = common_vendor.resolveComponent("xr-start");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_component_xr_start + _easycom_uni_icons2)();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (LoadingPageComponent + BackPreviousComponent + _easycom_uni_icons)();
}
const BackPreviousComponent = () => "../../../components/backPreviousComponent.js";
const LoadingPageComponent = () => "../../../components/loadingPageComponent.js";
const _sfc_main = {
  __name: "drawingPreviewView",
  setup(__props) {
    const barTop = common_vendor.ref(0);
    const barHeight = common_vendor.ref(0);
    const isLoading = common_vendor.ref(false);
    const renderWidth = common_vendor.ref(100);
    const renderHeight = common_vendor.ref(100);
    const obj = common_vendor.ref({
      workflowsWorksId: void 0,
      workflowsId: void 0,
      url: "",
      resultType: "",
      isCurrentUser: false
    });
    const handlePreviewImage = (url) => {
      common_vendor.index.previewImage({
        urls: [url]
      });
    };
    const handleRebuild = () => {
      common_vendor.index.navigateTo({
        url: "/pages/drawing/view/drawingDetailsView?workflowsId=" + obj.value.workflowsId,
        animationType: "pop-in",
        animationDuration: 200
      });
    };
    const handleGetWorkflowsWorks = async (id) => {
      try {
        isLoading.value = true;
        const { data } = await api_drawingWorks.reqGetWorkflowsWorks(id);
        obj.value = data;
      } catch (e) {
        console.log(e);
      } finally {
        setTimeout(() => {
          isLoading.value = false;
        }, 1e3);
      }
    };
    const handleDeleteWorkflowsWorks = async () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定删除这个作品?",
        success: async function(res) {
          if (res.confirm) {
            common_vendor.index.showLoading({
              title: "正在删除 ing~",
              mask: true
            });
            try {
              await api_drawingWorks.reqDeleteWorkflowsWorks({
                workflowsWorksId: obj.value.workflowsWorksId
              });
              common_vendor.index.hideLoading();
              common_vendor.index.$emit("WORKFLOWS_WORKS:REFRESH");
              common_vendor.index.showToast({
                icon: "none",
                duration: 1e3,
                title: "删除成功"
              });
            } catch (e) {
              console.log(e);
            } finally {
              setTimeout(() => {
                common_vendor.index.navigateBack();
              }, 500);
            }
          }
        }
      });
    };
    const handleSaveImage = (url) => {
      common_vendor.index.showLoading({
        title: "请稍等",
        mask: true
      });
      common_vendor.index.downloadFile({
        url,
        success: function(res) {
          common_vendor.index.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function() {
              common_vendor.index.hideLoading();
              common_vendor.index.showToast({
                title: "保存成功",
                icon: "none",
                duration: 4e3
              });
            },
            fail(e) {
              console.log(e);
            },
            complete() {
              common_vendor.index.hideLoading();
            }
          });
        }
      });
    };
    const handleSaveMedia = (url) => {
      common_vendor.index.showLoading({
        title: "请稍等",
        mask: true
      });
      common_vendor.index.downloadFile({
        url,
        success: function(res) {
          common_vendor.index.saveVideoToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function(data) {
              common_vendor.index.hideLoading();
              common_vendor.index.showToast({
                title: "保存成功",
                icon: "none",
                duration: 4e3
              });
            },
            fail(e) {
              console.log(e);
            },
            complete(res2) {
              common_vendor.index.hideLoading();
            }
          });
        }
      });
    };
    const handleDownloadFile = (url) => {
      common_vendor.index.getSetting({
        success(res) {
          if (!res.authSetting["scope.writePhotosAlbum"]) {
            common_vendor.index.authorize({
              scope: "scope.writePhotosAlbum",
              success() {
                if (obj.resultType !== "IMAGE") {
                  handleSaveMedia(url);
                } else
                  handleSaveImage(url);
              }
            });
          } else {
            handleSaveImage(url);
          }
        }
      });
    };
    common_vendor.onLoad((option) => {
      let menuButtonBoundingClientRect = common_vendor.index.getMenuButtonBoundingClientRect();
      barTop.value = menuButtonBoundingClientRect.top - 93;
      barHeight.value = menuButtonBoundingClientRect.height;
      const dpi = common_vendor.index.getWindowInfo().pixelRatio;
      const width = common_vendor.index.getWindowInfo().windowWidth;
      const height = common_vendor.index.getWindowInfo().windowHeight;
      renderWidth.value = width * dpi;
      renderHeight.value = height * dpi;
      handleGetWorkflowsWorks(option.workflowsWorksId);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isLoading.value
      }, isLoading.value ? {} : {}, {
        b: common_vendor.p({
          ["bar-top"]: barTop.value,
          ["bar-height"]: barHeight.value
        }),
        c: obj.value.resultType !== "MODEL"
      }, obj.value.resultType !== "MODEL" ? common_vendor.e({
        d: obj.value.resultType === "IMAGE"
      }, obj.value.resultType === "IMAGE" ? {
        e: obj.value.url,
        f: common_vendor.o(($event) => handlePreviewImage(obj.value.url))
      } : {}, {
        g: obj.value.resultType === "VIDEO" || obj.value.resultType === "AUDIO"
      }, obj.value.resultType === "VIDEO" || obj.value.resultType === "AUDIO" ? {
        h: obj.value.url
      } : {}) : {
        i: obj.value.url,
        j: renderWidth.value,
        k: renderHeight.value
      }, {
        l: common_vendor.p({
          type: "reload",
          size: "40rpx",
          color: "#d5d5d5"
        }),
        m: common_vendor.o(handleRebuild),
        n: obj.value.isCurrentUser
      }, obj.value.isCurrentUser ? {
        o: common_vendor.p({
          type: "trash",
          size: "40rpx",
          color: "#d5d5d5"
        }),
        p: common_vendor.o(handleDeleteWorkflowsWorks)
      } : {}, {
        q: obj.value.resultType !== "MODEL"
      }, obj.value.resultType !== "MODEL" ? {
        r: common_vendor.p({
          type: "download",
          size: "40rpx",
          color: "#d5d5d5"
        }),
        s: common_vendor.o(($event) => handleDownloadFile(obj.value.url))
      } : {}, {
        t: !isLoading.value
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-66ed37df"]]);
wx.createPage(MiniProgramPage);
