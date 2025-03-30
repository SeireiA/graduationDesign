"use strict";
const common_vendor = require("../common/vendor.js");
const store_token = require("./token.js");
const store_userInfo = require("./userInfo.js");
const store_userSetting = require("./userSetting.js");
const api_user = require("../api/user.js");
const api_disguise = require("../api/disguise.js");
const store_disguiseStatus = require("./disguiseStatus.js");
const store = common_vendor.createStore({
  state: {
    userInfo: void 0,
    userSetting: void 0,
    disguiseStatus: void 0
  },
  getters: {
    userInfo: (state) => state.userInfo,
    userSetting: (state) => state.userSetting,
    disguiseStatus: (state) => state.disguiseStatus
  },
  mutations: {
    logout(state) {
      state.userInfo = void 0;
      store_token.removeTokenValue();
    },
    setDisguiseStatus(state, info) {
      state.disguiseStatus = info;
      store_userSetting.setUserSetting(info);
    },
    setUserInfo(state, info) {
      state.userInfo = info;
      store_userInfo.setUserInfo(info);
    },
    setUserSetting(state, info) {
      state.userSetting = info;
      store_userSetting.setUserSetting(info);
    },
    initState(state) {
      let tokenValue = store_token.getTokenValue();
      if (tokenValue) {
        state.userInfo = store_userInfo.getUserInfo();
        state.usetSetting = store_userSetting.getUserSetting();
        state.disguiseStatus = store_disguiseStatus.getDisguiseStatus();
      }
    }
  },
  actions: {
    async fetchUserInfo({ commit }) {
      try {
        const res = await api_user.reqGetCurrentUserInfo();
        commit("setUserInfo", res.data);
      } catch (error) {
        common_vendor.index.showToast({
          icon: "none",
          duration: 1500,
          title: "获取用户信息失败"
        });
      }
    },
    async fetchDisguiseStatus({ commit }) {
      try {
        let { data } = await api_disguise.reqGetDisguiseStatus();
        commit("setDisguiseStatus", data);
      } catch (e) {
        store_disguiseStatus.setDisguiseStatus(false);
      }
    }
  }
});
exports.store = store;
