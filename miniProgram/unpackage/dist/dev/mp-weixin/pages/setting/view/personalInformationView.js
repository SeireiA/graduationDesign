"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const store_index = require("../../../store/index.js");
const env = require("../../../env.js");
const store_token = require("../../../store/token.js");
const api_user = require("../../../api/user.js");
const _sfc_main = {
  __name: "personalInformationView",
  setup(__props) {
    const nickName = common_vendor.ref("");
    const onBlurNickName = async (e) => {
      if (nickName.value.length > 0) {
        try {
          common_vendor.index.showLoading({
            title: "加载中"
          });
          await api_user.reqUploadNickName({
            nickName: nickName.value
          });
          await store_index.store.dispatch("fetchUserInfo");
          common_vendor.index.showToast({
            title: "修改成功",
            icon: "none",
            duration: 4e3
          });
        } catch (e2) {
          console.log(e2);
        } finally {
          common_vendor.index.hideLoading();
        }
      } else {
        common_vendor.index.showToast({
          title: "用户昵称不能为空",
          icon: "none",
          duration: 4e3
        });
      }
    };
    const uploadAvatar = (e) => {
      common_vendor.index.showLoading({
        title: "正在上传中"
      });
      common_vendor.wx$1.uploadFile({
        url: `${env.env.baseHttps}/user/upload/avatar`,
        //服务器地址
        filePath: e.detail.avatarUrl,
        name: "file",
        header: {
          "Authorization": "Bearer " + store_token.getTokenValue()
        },
        async success(res) {
          const data = JSON.parse(res.data);
          if (data.code !== 200) {
            common_vendor.index.showToast({ icon: "none", duration: 3e3, title: data.msg });
            return;
          }
          await store_index.store.dispatch("fetchUserInfo");
          common_vendor.index.showToast({
            title: "上传头像成功",
            icon: "none",
            duration: 2e3
          });
        },
        fail(res) {
          common_vendor.index.showToast({
            title: "上传头像失败,请稍后重试",
            icon: "none",
            duration: 2e3
          });
        }
      });
    };
    common_vendor.onLoad(() => {
      nickName.value = store_index.store.getters.userInfo.nickName;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !common_vendor.unref(store_index.store).getters.userInfo.avatar
      }, !common_vendor.unref(store_index.store).getters.userInfo.avatar ? {
        b: common_assets._imports_0$3,
        c: common_vendor.o(uploadAvatar)
      } : {
        d: common_vendor.unref(store_index.store).getters.userInfo.avatar,
        e: common_vendor.o(uploadAvatar)
      }, {
        f: nickName.value,
        g: common_vendor.o(($event) => nickName.value = $event.detail.value),
        h: common_vendor.o(onBlurNickName)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-43117f8d"]]);
wx.createPage(MiniProgramPage);
