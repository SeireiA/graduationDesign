"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const store_index = require("../../../store/index.js");
const env = require("../../../env.js");
const store_token = require("../../../store/token.js");
const store_chatTopic = require("../../../store/chatTopic.js");
if (!Math) {
  (FilePreviewComponent + common_vendor.unref(mpHtml) + AiLoadingComponent + UploadChooseComponent + InputComponent)();
}
const mpHtml = () => "../../../components/mp-html/components/mp-html/mp-html.js";
const FilePreviewComponent = () => "./filePreviewComponent.js";
const AiLoadingComponent = () => "./aiLoadingComponent.js";
const UploadChooseComponent = () => "./uploadChooseComponent.js";
const InputComponent = () => "./inputComponent.js";
const _sfc_main = {
  __name: "chatComponent",
  setup(__props, { expose: __expose }) {
    const instance = common_vendor.getCurrentInstance();
    let isDisplaying = false;
    const messageQueue = common_vendor.reactive([]);
    const messageList = common_vendor.ref([]);
    const isLoading = common_vendor.ref(false);
    const inputRef = common_vendor.ref(null);
    const uploadRef = common_vendor.ref(null);
    const scrollTop = common_vendor.ref(0);
    const wssAddress = common_vendor.ref(env.env.baseWss + "/chat/" + store_token.getTokenValue());
    const file = common_vendor.ref(void 0);
    const send = (text) => {
      let files = file.value;
      if (!store_token.getTokenValue()) {
        common_vendor.index.reLaunch({
          url: "/pages/user/user"
        });
        return;
      }
      messageList.value.push({
        issue: text,
        answer: "",
        isError: false,
        file: files ? files : void 0
      });
      isLoading.value = true;
      file.value = void 0;
      inputRef.value.clear();
      const index = messageList.value.length - 1;
      setTimeout(() => {
        scrollToBottom();
      }, 100);
      const conversionList = conversionDataFormat(index);
      const sendMessagesData = compressArray(conversionList, 1e4);
      common_vendor.index.connectSocket({
        url: wssAddress.value
      });
      common_vendor.index.onSocketOpen(function() {
        common_vendor.index.sendSocketMessage({
          data: JSON.stringify({
            messages: sendMessagesData,
            model: store_index.store.getters.userSetting.model,
            isFiltration: false
          })
        });
      });
      common_vendor.index.onSocketMessage(function(res) {
        messageQueue.push({
          msg: res.data,
          index
        });
        displayMessages();
      });
      common_vendor.index.onSocketError(function() {
        common_vendor.index.showToast({
          icon: "none",
          duration: 1e3,
          title: "当前登录信息已过期,请重新登录"
        });
        store_token.removeTokenValue();
        common_vendor.index.reLaunch({
          url: "/pages/user/user"
        });
      });
      common_vendor.index.onSocketClose(function() {
        socketClose(index);
      });
    };
    const stop = () => {
      messageQueue.value = [];
      common_vendor.index.closeSocket({
        success: function() {
        },
        fail: function(err) {
        }
      });
    };
    const previewFileOrImage = (src) => {
      const imageExtensions = ["png", "jpg", "jpeg", "gif", "bmp", "webp", "svg", "ico"];
      let filename = src.split("/").pop().split("?")[0].split("#")[0];
      let extension = filename.split(".").pop().toLowerCase();
      if (imageExtensions.includes(extension)) {
        common_vendor.index.previewImage({
          urls: [src]
        });
        console.log(src);
      } else {
        common_vendor.index.downloadFile({
          url: src,
          // 文件网络地址
          success: function(res) {
            if (res.statusCode === 200) {
              common_vendor.index.openDocument({
                filePath: res.tempFilePath,
                // 下载后的文件路径
                success: function(openRes) {
                  console.log("文件打开成功");
                }
              });
            }
          }
        });
      }
    };
    const socketClose = (index) => {
      let interval = setInterval(() => {
        let isError = false;
        if (messageQueue.length === 0) {
          const answer = messageList.value[index].answer;
          if (!answer) {
            messageList.value.splice(index, 1);
            isError = true;
          } else if (answer === "é") {
            messageList.value[index].isError = true;
            messageList.value[index].answer = "当前会话出现了点问题,请稍后重试";
          }
          const chatTopic = store_chatTopic.getChatTopic();
          if (!chatTopic.array[chatTopic.index].title && !isError) {
            chatTopic.array[chatTopic.index].title = messageList.value[index].issue.substring(0, 20);
          }
          chatTopic.array[chatTopic.index].content = messageList.value;
          inputRef.value.clear();
          isLoading.value = false;
          store_chatTopic.setChatTopic(chatTopic);
          clearInterval(interval);
        }
      }, 50);
    };
    const displayMessages = () => {
      if (isDisplaying) {
        return;
      }
      isDisplaying = true;
      const message = messageQueue.shift();
      if (message) {
        let displayNextCharacter = function() {
          const character = msg.charAt(i++);
          if (character) {
            messageList.value[index].answer += character;
            if (i === msg.length) {
              scrollToBottom();
              setTimeout(displayNextCharacter, 20);
            } else {
              setTimeout(displayNextCharacter, 20);
            }
          } else {
            isDisplaying = false;
            displayMessages();
          }
        };
        let i = 0;
        const { index, msg } = message;
        displayNextCharacter();
      } else {
        isDisplaying = false;
      }
    };
    const conversionDataFormat = (index) => {
      const messages = [];
      messageList.value.forEach((c, itemIndex) => {
        const { isError, issue, answer, file: file2 } = c;
        if (!isError) {
          messages.push({
            role: "user",
            content: file2 ? issue + "[" + file2.fileName + "](" + file2.fileUrl + ")" : issue
          });
          if (itemIndex !== index) {
            messages.push({
              role: "assistant",
              content: answer
            });
          }
        }
      });
      return messages;
    };
    const compressArray = (messages, threshold) => {
      const totalLength = messages.reduce((acc, cur) => acc + cur.content.length, 0);
      if (totalLength <= threshold) {
        return messages;
      }
      const compressed = [];
      for (let i = messages.length - 1; i >= 0; i--) {
        const currentLength = messages[i].content.length;
        if (currentLength <= threshold) {
          compressed.push(messages[i]);
          threshold -= currentLength;
        } else {
          compressed.push({
            role: messages[i].role,
            content: messages[i].content.substr(0, threshold)
          });
          break;
        }
      }
      return compressed.reverse();
    };
    const scrollToBottom = () => {
      common_vendor.index.createSelectorQuery().in(instance).select("#scroll-content").boundingClientRect((dom) => {
        if (dom.height > 0) {
          scrollTop.value = dom.height;
        }
      }).exec();
    };
    const showUpload = () => {
      if (store_token.getTokenValue()) {
        uploadRef.value.open();
      } else {
        common_vendor.index.reLaunch({
          url: "/pages/user/user"
        });
      }
    };
    const chooseMessageFile = () => {
      common_vendor.wx$1.chooseMessageFile({
        // 只能选取微信聊天框中的文件
        count: 1,
        // 最多选择一个文件
        type: "file",
        // 选择文件类型
        success: async function(res) {
          const { name, size, path } = res.tempFiles[0];
          await upload(path, name, size);
        }
      });
    };
    const chooseSystemImage = () => {
      common_vendor.index.chooseImage({
        count: 1,
        // 最多只能选择一张图片
        success: async (res) => {
          const { size, path } = res.tempFiles[0];
          await upload(path, "图片", size);
        }
      });
    };
    const upload = (path, name, size) => {
      common_vendor.index.showLoading({
        title: "正在上传中"
      });
      common_vendor.wx$1.uploadFile({
        url: `${env.env.baseHttps}/oss/upload/file`,
        //服务器地址
        filePath: path,
        //文件临时路径
        name: "file",
        header: {
          "Authorization": "Bearer " + store_token.getTokenValue(),
          "Content-Type": "multipart/form-data"
        },
        success: (res) => {
          const data = JSON.parse(res.data);
          if (data.code !== 200) {
            common_vendor.index.showToast({ icon: "none", duration: 3e3, title: data.msg });
            return;
          }
          const number = Math.round(parseInt(size) / 1024);
          file.value = {
            fileName: name,
            fileSize: number,
            fileUrl: data.data.fileUrl,
            fileType: data.data.fileType
          };
          common_vendor.index.hideLoading();
          uploadRef.value.close();
        }
      });
    };
    const html = (data) => {
      messageList.value = data;
    };
    common_vendor.onLoad(() => {
      setTimeout(() => {
        scrollTop.value = 99999;
      }, 800);
    });
    __expose(
      { html }
    );
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !(messageList.value.length > 0)
      }, !(messageList.value.length > 0) ? {
        b: common_assets._imports_0$4
      } : {
        c: common_vendor.f(messageList.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.issue),
            b: item.file
          }, item.file ? {
            c: common_vendor.o(previewFileOrImage, index),
            d: "bb0f8800-0-" + i0,
            e: common_vendor.p({
              ["file-name"]: item.file.fileName,
              ["file-type"]: item.file.fileType,
              ["file-url"]: item.file.fileUrl,
              ["file-size"]: item.file.fileSize
            })
          } : {}, {
            f: item.answer
          }, item.answer ? {
            g: "bb0f8800-1-" + i0,
            h: common_vendor.p({
              content: item.answer,
              selectable: true,
              ["lazy-load"]: true,
              ["copy-link"]: true,
              markdown: true
            })
          } : {
            i: "bb0f8800-2-" + i0
          }, {
            j: index
          });
        }),
        d: common_vendor.unref(store_index.store).getters.userInfo && common_vendor.unref(store_index.store).getters.userInfo.avatar ? common_vendor.unref(store_index.store).getters.userInfo.avatar : "/static/avatar/default_user.png",
        e: common_assets._imports_0$4,
        f: scrollTop.value
      }, {
        g: file.value
      }, file.value ? {
        h: common_vendor.p({
          ["file-name"]: file.value.fileName,
          ["file-type"]: file.value.fileType,
          ["file-size"]: file.value.fileSize
        })
      } : {}, {
        i: common_vendor.sr(uploadRef, "bb0f8800-4", {
          "k": "uploadRef"
        }),
        j: common_vendor.o(chooseMessageFile),
        k: common_vendor.o(chooseSystemImage),
        l: common_vendor.sr(inputRef, "bb0f8800-5", {
          "k": "inputRef"
        }),
        m: common_vendor.o(send),
        n: common_vendor.o(stop),
        o: common_vendor.o(showUpload),
        p: common_vendor.p({
          ["is-prompt"]: !(messageList.value.length > 0),
          ["is-loading"]: isLoading.value
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bb0f8800"]]);
wx.createComponent(Component);
