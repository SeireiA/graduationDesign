"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const store_index = require("../../../store/index.js");
const utils_date = require("../../../utils/date.js");
const api_drawingWorkflows = require("../../../api/drawingWorkflows.js");
const api_drawingComments = require("../../../api/drawingComments.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (TopButtonComponent + BackPreviousComponent + LoadingDataComponent + LoadingPageComponent + _easycom_uni_icons + EmptyDataComponent)();
}
const LoadingPageComponent = () => "../../../components/loadingPageComponent.js";
const BackPreviousComponent = () => "../../../components/backPreviousComponent.js";
const LoadingDataComponent = () => "../../../components/loadingDataComponent.js";
const EmptyDataComponent = () => "../../../components/emptyDataComponent.js";
const TopButtonComponent = () => "../../../components/topButtonComponent.js";
const _sfc_main = {
  __name: "drawingDetailsView",
  setup(__props) {
    const obj = common_vendor.ref({
      title: "",
      originalImage: "",
      nowImage: "",
      introduced: "",
      visited: void 0,
      createTime: ""
    });
    const workflowsId = common_vendor.ref(void 0);
    const isLoading = common_vendor.ref(true);
    const isLoadingComments = common_vendor.ref(false);
    const barTop = common_vendor.ref(0);
    const barHeight = common_vendor.ref(0);
    const pageNum = common_vendor.ref(1);
    const comments = common_vendor.ref([]);
    const input = common_vendor.ref("");
    const isTopButtonShow = common_vendor.ref(false);
    const scrollTop = common_vendor.ref(0);
    const contentTop = common_vendor.ref(0);
    const handlePageScroll = (e) => {
      scrollTop.value = e.detail.scrollTop;
      isTopButtonShow.value = e.detail.scrollTop > 600;
    };
    const handleBackToTop = () => {
      contentTop.value = scrollTop.value;
      common_vendor.nextTick$1(() => {
        contentTop.value = 0;
      });
    };
    const handleToPage = (url) => {
      if (!store_index.store.getters.userInfo) {
        common_vendor.index.reLaunch({
          url: "/pages/user/user"
        });
        return;
      }
      common_vendor.index.navigateTo({
        url,
        animationType: "pop-in",
        animationDuration: 200
      });
    };
    const handleGetCommentsPage = async () => {
      if (!isLoadingComments.value) {
        try {
          isLoadingComments.value = true;
          const { data } = await api_drawingComments.reqGetCommentsPage({
            pageNum: pageNum.value,
            workflowsId: workflowsId.value
          });
          if (data.records && data.records.length > 0) {
            pageNum.value = pageNum.value + 1;
            comments.value.push(...data.records);
          }
        } catch (e) {
          console.log(e);
        } finally {
          setTimeout(() => {
            isLoadingComments.value = false;
          }, 500);
        }
      }
    };
    const handleScrollToLower = () => {
      handleGetCommentsPage();
    };
    const handleGetWorkflows = async (id) => {
      try {
        isLoading.value = true;
        const { data } = await api_drawingWorkflows.reqGetWorkflows(id);
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
    const handleSendComments = async () => {
      if (!store_index.store.getters.userInfo) {
        common_vendor.index.reLaunch({
          url: "/pages/user/user"
        });
        return;
      }
      if (!input.value.trim()) {
        common_vendor.index.showToast({
          title: "评论内容不能为空",
          icon: "none",
          duration: 2e3
        });
        return;
      }
      try {
        common_vendor.index.showLoading({
          title: "正在回复 ing~",
          mask: true
        });
        await api_drawingComments.reqCreateComments({
          content: input.value,
          workflowsId: workflowsId.value
        });
        input.value = "";
        pageNum.value = 1;
        comments.value = [];
        await handleGetCommentsPage();
        common_vendor.index.showToast({ icon: "none", duration: 3e3, title: "发送成功!长按自己发布的评论可以删除哦!" });
      } catch (e) {
        console.log(e);
      } finally {
        setTimeout(() => {
          common_vendor.index.hideLoading();
        }, 500);
      }
    };
    const handleDeleteComments = async (id, permissions, index) => {
      if (permissions) {
        common_vendor.index.showModal({
          title: "提示",
          content: "确定删除这条评论？",
          success: async function(res) {
            if (res.confirm) {
              common_vendor.index.showLoading({
                title: "正在删除 ing~",
                mask: true
              });
              try {
                await api_drawingComments.reqDeleteComments({
                  workflowsCommentsId: id
                });
                comments.value.splice(index, 1);
                common_vendor.index.hideLoading();
                common_vendor.index.showToast({
                  icon: "none",
                  duration: 2e3,
                  title: "删除成功"
                });
              } catch (e) {
                console.log(e);
              }
            }
          }
        });
      }
    };
    common_vendor.onLoad((option) => {
      workflowsId.value = Number(option.workflowsId);
      let menuButtonBoundingClientRect = common_vendor.index.getMenuButtonBoundingClientRect();
      barTop.value = menuButtonBoundingClientRect.top;
      barHeight.value = menuButtonBoundingClientRect.height;
      handleGetCommentsPage();
      handleGetWorkflows(workflowsId.value);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(handleBackToTop),
        b: common_vendor.p({
          ["is-show"]: isTopButtonShow.value
        }),
        c: common_vendor.p({
          ["bar-height"]: barHeight.value,
          ["bar-top"]: barTop.value
        }),
        d: isLoadingComments.value
      }, isLoadingComments.value ? {
        e: common_vendor.p({
          top: 200
        })
      } : {}, {
        f: isLoading.value
      }, isLoading.value ? {} : {}, {
        g: obj.value.originalImage,
        h: obj.value.nowImage,
        i: common_assets._imports_0,
        j: common_vendor.t(obj.value.title),
        k: common_vendor.p({
          type: "paperplane",
          size: "30rpx",
          color: "#a6a6a6"
        }),
        l: common_vendor.t(common_vendor.unref(utils_date.conversionTime)(obj.value.createTime)),
        m: common_vendor.p({
          type: "star-filled",
          size: "30rpx",
          color: "#a6a6a6"
        }),
        n: common_vendor.t(obj.value.visited),
        o: common_vendor.t(obj.value.introduced),
        p: common_vendor.o(($event) => handleToPage("/pages/drawing/view/drawingFormView?workflowsId=" + obj.value.workflowsId)),
        q: common_vendor.p({
          type: "chat",
          size: "55rpx",
          color: "white"
        }),
        r: common_vendor.unref(store_index.store).getters.userInfo && common_vendor.unref(store_index.store).getters.userInfo.avatar ? common_vendor.unref(store_index.store).getters.userInfo.avatar : "/static/avatar/default_user.png",
        s: common_vendor.o(handleSendComments),
        t: input.value,
        v: common_vendor.o(($event) => input.value = $event.detail.value),
        w: common_vendor.o(handleSendComments),
        x: comments.value && comments.value.length > 0
      }, comments.value && comments.value.length > 0 ? {
        y: common_vendor.f(comments.value, (item, index, i0) => {
          return {
            a: item.avatar ? item.avatar : "/static/avatar/default_user.png",
            b: common_vendor.t(item.nickName),
            c: common_vendor.t(item.content),
            d: common_vendor.t(common_vendor.unref(utils_date.conversionTime)(item.createTime)),
            e: index,
            f: common_vendor.o(($event) => handleDeleteComments(item.workflowsCommentsId, item.isCurrentUser, index), index)
          };
        })
      } : {
        z: common_vendor.p({
          msg: "评论区空空如也",
          height: 30
        })
      }, {
        A: !isLoading.value,
        B: common_vendor.o(($event) => handleScrollToLower()),
        C: contentTop.value,
        D: common_vendor.o(handlePageScroll)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3c34045d"]]);
wx.createPage(MiniProgramPage);
