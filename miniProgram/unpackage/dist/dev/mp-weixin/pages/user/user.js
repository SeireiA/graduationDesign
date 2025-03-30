"use strict";
const common_vendor = require("../../common/vendor.js");
const store_token = require("../../store/token.js");
const store_index = require("../../store/index.js");
const api_auth = require("../../api/auth.js");
const api_drawingWorks = require("../../api/drawingWorks.js");
const api_drawingTask = require("../../api/drawingTask.js");
const env = require("../../env.js");
const api_ad = require("../../api/ad.js");
if (!Math) {
  (LoginComponent + TopButtonComponent + LoadingDataComponent + UserInfoComponent + WorkspaceComponent)();
}
const UserInfoComponent = () => "./component/userInfoComponent.js";
const LoginComponent = () => "./component/loginComponent.js";
const WorkspaceComponent = () => "./component/workspaceComponent.js";
const LoadingDataComponent = () => "../../components/loadingDataComponent.js";
const TopButtonComponent = () => "../../components/topButtonComponent.js";
const _sfc_main = {
  __name: "user",
  setup(__props) {
    let videoAd = null;
    const isLoginLoading = common_vendor.ref(false);
    const isWorkflowsWorksLoading = common_vendor.ref(false);
    const workspaceActive = common_vendor.ref(0);
    const workflowsWorksPageNum = common_vendor.ref(1);
    const workflowsWorksData = common_vendor.ref([]);
    const intervalId = common_vendor.ref(null);
    const isTaskStop = common_vendor.ref(false);
    const drawingTaskData = common_vendor.ref([]);
    const isTopButtonShow = common_vendor.ref(false);
    const workspaceRef = common_vendor.ref(null);
    const scrollTop = common_vendor.ref(0);
    const contentTop = common_vendor.ref(0);
    const handleAdLoad = () => {
      if (common_vendor.wx$1.createRewardedVideoAd) {
        console.log("加载广告");
        videoAd = common_vendor.wx$1.createRewardedVideoAd({
          adUnitId: env.env.adId
        });
        videoAd.onError((err) => {
          console.log(err);
        });
        videoAd.onClose(async (status) => {
          if (status && status.isEnded || status === void 0) {
            try {
              await api_ad.reqRewarded();
              common_vendor.index.showToast({
                title: "奖励已发放",
                icon: "none"
              });
              await store_index.store.dispatch("fetchUserInfo");
            } catch (e) {
              console.log(e);
              common_vendor.index.showToast({
                title: "获取奖励失败",
                icon: "none"
              });
            }
          } else {
            common_vendor.index.showToast({
              icon: "none",
              duration: 3e3,
              title: `请重新观看视频获得奖励`
            });
          }
        });
      }
    };
    const handleScrollToLower = () => {
      if (workspaceActive.value === 0) {
        handleGetWorkflowsWorksPage();
      }
    };
    const handleBackToTop = () => {
      contentTop.value = scrollTop.value;
      common_vendor.nextTick$1(() => {
        contentTop.value = 0;
      });
    };
    const handlePageScroll = (e) => {
      scrollTop.value = e.detail.scrollTop;
      isTopButtonShow.value = e.detail.scrollTop > 600;
    };
    const handleChangeWorkspaceActive = (e) => {
      workspaceActive.value = e;
    };
    const handleGetWorkflowsWorksPage = async () => {
      if (!isWorkflowsWorksLoading.value) {
        try {
          isWorkflowsWorksLoading.value = true;
          const { data } = await api_drawingWorks.reqGetWorkflowsWorksPage(workflowsWorksPageNum.value);
          if (data.records && data.records.length > 0) {
            workflowsWorksPageNum.value = workflowsWorksPageNum.value + 1;
            let map = handleTreatmentWorkflowsWorks(data);
            workflowsWorksData.value.push(...map);
          }
        } catch (e) {
          console.log(e);
        } finally {
          setTimeout(() => {
            isWorkflowsWorksLoading.value = false;
          }, 1e3);
        }
      }
    };
    const handleTreatmentWorkflowsWorks = (data) => {
      return data.records.map((c) => {
        if (c.resultType === "VIDEO") {
          return {
            workflowsWorksId: c.workflowsWorksId,
            image: c.image += "?x-oss-process=video/snapshot,t_1,f_jpg",
            resultType: c.resultType
          };
        } else if (c.resultType === "MODEL") {
          return {
            workflowsWorksId: c.workflowsWorksId,
            image: "/static/svg/model.svg",
            resultType: c.resultType
          };
        } else if (c.resultType === "AUDIO") {
          return {
            workflowsWorksId: c.workflowsWorksId,
            image: "/static/svg/music.svg",
            resultType: c.resultType
          };
        } else if (c.resultType === "IMAGE") {
          return {
            workflowsWorksId: c.workflowsWorksId,
            image: c.image + "?x-oss-process=image/resize,m_lfit,w_300,h_300/quality,q_80",
            resultType: c.resultType
          };
        }
        return c;
      });
    };
    const handleWechatLogin = () => {
      common_vendor.index.vibrateShort();
      isLoginLoading.value = true;
      common_vendor.index.login({
        async success(res) {
          try {
            const { data } = await api_auth.reqWechatLogin({
              code: res.code
            });
            store_token.setTokenValue(data);
            await store_index.store.dispatch("fetchUserInfo");
            await handleGetWorkflowsWorksPage();
            await handleListeningTask();
            common_vendor.index.showToast({ icon: "none", duration: 3e3, title: "欢迎使用 TYPE STARTS" });
          } catch (e) {
            common_vendor.index.showToast({
              icon: "none",
              duration: 6e3,
              title: e.msg
            });
          } finally {
            isLoginLoading.value = false;
          }
        }
      });
    };
    const handleListeningTask = async () => {
      intervalId.value = setInterval(async () => {
        if (!isTaskStop.value) {
          isTaskStop.value = true;
          try {
            const { data } = await api_drawingTask.reqGetTaskProgressList();
            drawingTaskData.value = data.map((c) => {
              if (c.resultType === "VIDEO") {
                c.url += "?x-oss-process=video/snapshot,t_1,f_jpg";
              } else if (c.resultType === "MODEL") {
                c.url = "/static/svg/model.svg";
              } else if (c.resultType === "AUDIO") {
                c.url = "/static/svg/audio.svg";
              }
              return c;
            });
          } catch (e) {
            console.log(e);
          } finally {
            isTaskStop.value = false;
          }
        }
      }, 3e3);
    };
    const handleRewardedAds = async () => {
      if (videoAd) {
        videoAd.show().catch(() => {
          videoAd.load().then(() => {
            videoAd.show();
          });
        });
      }
    };
    common_vendor.onLoad(async () => {
      handleAdLoad();
      if (store_index.store.getters.userInfo) {
        await handleListeningTask();
        await store_index.store.dispatch("fetchUserInfo");
        await handleGetWorkflowsWorksPage();
      }
      common_vendor.index.$on("WORKFLOWS_WORKS:REFRESH", async () => {
        workflowsWorksPageNum.value = 1;
        workflowsWorksData.value = [];
        workspaceRef.value.handleWorkflowsWorksRefresh();
        if (!isWorkflowsWorksLoading.value) {
          try {
            isWorkflowsWorksLoading.value = true;
            const { data } = await api_drawingWorks.reqGetWorkflowsWorksPage(workflowsWorksPageNum.value);
            if (data.records && data.records.length > 0) {
              workflowsWorksPageNum.value = workflowsWorksPageNum.value + 1;
              let map = handleTreatmentWorkflowsWorks(data);
              workflowsWorksData.value.push(...map);
              workspaceRef.value.handleWorkflowsWorksRefresh();
            }
          } catch (e) {
            console.log(e);
          } finally {
            setTimeout(() => {
              isWorkflowsWorksLoading.value = false;
            }, 1e3);
          }
        }
      });
    });
    common_vendor.onUnload(() => {
      clearInterval(intervalId);
      common_vendor.index.$off("WORKFLOWS_WORKS:REFRESH");
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !common_vendor.unref(store_index.store).getters.userInfo,
        b: common_vendor.o(handleWechatLogin),
        c: common_vendor.p({
          isLoading: isLoginLoading.value
        }),
        d: common_vendor.o(handleBackToTop),
        e: common_vendor.p({
          isShow: isTopButtonShow.value
        }),
        f: common_vendor.p({
          ["is-loading"]: isWorkflowsWorksLoading.value
        }),
        g: common_vendor.o(handleRewardedAds),
        h: common_vendor.unref(store_index.store).getters.disguiseStatus
      }, common_vendor.unref(store_index.store).getters.disguiseStatus ? {
        i: common_vendor.sr(workspaceRef, "0f7520f0-4", {
          "k": "workspaceRef"
        }),
        j: common_vendor.o(handleChangeWorkspaceActive),
        k: common_vendor.p({
          drawingTaskData: drawingTaskData.value,
          workflowsWorksData: workflowsWorksData.value,
          workspaceActive: workspaceActive.value
        })
      } : {}, {
        l: common_vendor.unref(store_index.store).getters.userInfo,
        m: contentTop.value,
        n: common_vendor.o(handlePageScroll),
        o: common_vendor.o(($event) => handleScrollToLower())
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7520f0"]]);
wx.createPage(MiniProgramPage);
