"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const store_chatTopic = require("../../../store/chatTopic.js");
const _sfc_main = {
  __name: "chatTopicView",
  setup(__props) {
    const data = common_vendor.ref({
      other: [],
      today: [],
      yesterday: []
    });
    const handoffTopic = (id) => {
      const chatTopic = store_chatTopic.getChatTopic();
      const index = chatTopic.array.findIndex((item) => item.id === id);
      chatTopic.index = index;
      const content = chatTopic.array[index].content;
      store_chatTopic.setChatTopic(chatTopic);
      common_vendor.index.$emit("dialogue_template_html", content);
      common_vendor.index.navigateBack();
    };
    common_vendor.onLoad(() => {
      common_vendor.index.showLoading({
        title: "加载中"
      });
      const chatTopic = store_chatTopic.getChatTopic();
      const array = chatTopic.array;
      data.value = groupDates(array);
      common_vendor.index.hideLoading();
    });
    const groupDates = (dates) => {
      const today = /* @__PURE__ */ new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const groupedDates = {
        today: [],
        yesterday: [],
        other: []
      };
      dates.forEach((dateObj) => {
        const date = new Date(dateObj.date);
        if (date.toDateString() === today.toDateString()) {
          groupedDates.today.push(dateObj);
        } else if (date.toDateString() === yesterday.toDateString()) {
          groupedDates.yesterday.push(dateObj);
        } else {
          groupedDates.other.push(dateObj);
        }
      });
      return groupedDates;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: data.value.today.length > 0
      }, data.value.today.length > 0 ? {
        b: common_vendor.f(data.value.today, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title ? item.title : "未命名的会话主题"),
            b: common_vendor.t(item.time),
            c: index,
            d: common_vendor.o(($event) => handoffTopic(item.id), index)
          };
        }),
        c: common_assets._imports_0$1
      } : {}, {
        d: data.value.yesterday.length > 0
      }, data.value.yesterday.length > 0 ? {
        e: common_vendor.f(data.value.yesterday, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title ? item.title : "未命名的会话主题"),
            b: common_vendor.t(item.time),
            c: index,
            d: common_vendor.o(($event) => handoffTopic(item.id), index)
          };
        }),
        f: common_assets._imports_0$1
      } : {}, {
        g: data.value.other.length > 0
      }, data.value.other.length > 0 ? {
        h: common_vendor.f(data.value.yesterday, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title ? item.title : "未命名的会话主题"),
            b: common_vendor.t(item.date),
            c: index,
            d: common_vendor.o(($event) => handoffTopic(item.id), index)
          };
        }),
        i: common_assets._imports_0$1
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5becf820"]]);
wx.createPage(MiniProgramPage);
