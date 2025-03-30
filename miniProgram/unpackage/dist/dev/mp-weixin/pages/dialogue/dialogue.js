"use strict";
const common_vendor = require("../../common/vendor.js");
const store_index = require("../../store/index.js");
const api_chatConfig = require("../../api/chatConfig.js");
const store_chatTopic = require("../../store/chatTopic.js");
const store_token = require("../../store/token.js");
if (!Math) {
  (NavigationComponent + common_vendor.unref(ChatComponent) + LevitationComponent + DialogueDisguiseComponent)();
}
const ChatComponent = () => "./component/chatComponent.js";
const LevitationComponent = () => "./component/levitationComponent.js";
const NavigationComponent = () => "./component/navigationComponent.js";
const DialogueDisguiseComponent = () => "../../components/disguise/dialogueDisguiseComponent.js";
const _sfc_main = {
  __name: "dialogue",
  setup(__props) {
    const chatRef = common_vendor.ref(null);
    const newChatTopic = () => {
      common_vendor.index.vibrateShort();
      if (store_token.getTokenValue()) {
        const chatTopic = store_chatTopic.getChatTopic();
        const { index, array } = chatTopic;
        const arrayElement = array[index];
        if (arrayElement.content.length <= 0) {
          common_vendor.index.showToast({ icon: "none", duration: 3e3, title: "当前已经是最新会话了" });
        } else {
          let now = /* @__PURE__ */ new Date();
          let year = now.getFullYear();
          let month = now.getMonth() + 1;
          let date = now.getDate();
          month = month.toString().padStart(2, "0");
          date = date.toString().padStart(2, "0");
          let hours = now.getHours();
          let minutes = now.getMinutes();
          hours = hours.toString().padStart(2, "0");
          minutes = minutes.toString().padStart(2, "0");
          let currentTime = hours + ":" + minutes;
          const id = generateRandom();
          chatTopic.array.unshift({
            id,
            title: "",
            date: year + "-" + month + "-" + date,
            time: currentTime,
            content: []
          });
          chatRef.value.html([]);
          store_chatTopic.setChatTopic(chatTopic);
        }
      } else {
        common_vendor.index.reLaunch({
          url: "/pages/user/user"
        });
      }
    };
    const generateRandom = () => {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      const charactersLength = characters.length;
      for (let i = 0; i < 12; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    };
    const templateHTML = (data) => {
      chatRef.value.html(data);
    };
    const init = async () => {
      if (!store_index.store.getters.userSetting) {
        try {
          const { data } = await api_chatConfig.reqGetModelList();
          store_index.store.commit("setUserSetting", {
            model: data[0].model
          });
        } catch (e) {
          common_vendor.index.showToast({ icon: "none", duration: 3e3, title: "初始化用户数据失败" });
        }
      }
      if (!store_token.getTokenValue()) {
        return;
      }
      const chatTopic = store_chatTopic.getChatTopic();
      if (!chatTopic) {
        let now = /* @__PURE__ */ new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        let date = now.getDate();
        month = month.toString().padStart(2, "0");
        date = date.toString().padStart(2, "0");
        let hours = now.getHours();
        let minutes = now.getMinutes();
        hours = hours.toString().padStart(2, "0");
        minutes = minutes.toString().padStart(2, "0");
        let currentTime = hours + ":" + minutes;
        const id = generateRandom();
        store_chatTopic.setChatTopic({
          index: 0,
          array: [
            {
              id,
              title: "",
              date: year + "-" + month + "-" + date,
              time: currentTime,
              content: []
            }
          ]
        });
      } else {
        const { index, array } = chatTopic;
        const arrayElement = array[index];
        setTimeout(() => {
          templateHTML(arrayElement.content);
        }, 500);
      }
    };
    common_vendor.onLoad(() => {
      init();
      common_vendor.index.$on("dialogue_template_html", function(data) {
        templateHTML(data);
      });
    });
    common_vendor.onUnload(() => {
      common_vendor.index.$off("dialogue_template_html");
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.sr(chatRef, "ac5f3f68-1", {
          "k": "chatRef"
        }),
        b: common_vendor.o(newChatTopic),
        c: common_vendor.unref(store_index.store).getters.disguiseStatus,
        d: !common_vendor.unref(store_index.store).getters.disguiseStatus
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ac5f3f68"]]);
wx.createPage(MiniProgramPage);
