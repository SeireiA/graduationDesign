"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_chatConfig = require("../../../api/chatConfig.js");
const store_index = require("../../../store/index.js");
const _sfc_main = {
  __name: "changeModelView",
  setup(__props) {
    const modelList = common_vendor.ref([]);
    common_vendor.onLoad(() => {
      getModelList();
    });
    const change = async (index) => {
      try {
        common_vendor.index.vibrateShort();
        common_vendor.index.showLoading({
          title: "正在加载中"
        });
        const valueElement = modelList.value[index];
        const userSetting = store_index.store.getters.userSetting;
        userSetting.model = valueElement.model;
        store_index.store.commit("setUserSetting", userSetting);
      } catch (e) {
        console.log(e);
      } finally {
        common_vendor.index.hideLoading();
      }
    };
    const getModelList = async () => {
      try {
        common_vendor.index.showLoading({
          title: "正在加载中"
        });
        const { data } = await api_chatConfig.reqGetModelList();
        modelList.value = data;
      } catch (e) {
        console.log(e);
      } finally {
        common_vendor.index.hideLoading();
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(modelList.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: common_vendor.unref(store_index.store).getters.userSetting && common_vendor.unref(store_index.store).getters.userSetting.model !== item.model
          }, common_vendor.unref(store_index.store).getters.userSetting && common_vendor.unref(store_index.store).getters.userSetting.model !== item.model ? {
            c: common_vendor.o(($event) => change(index), index)
          } : {}, {
            d: index
          });
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-919938ac"]]);
wx.createPage(MiniProgramPage);
