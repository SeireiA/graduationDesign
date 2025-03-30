"use strict";
const common_vendor = require("../common/vendor.js");
const key = "CHAT_TOPIC";
function getChatTopic() {
  const storageSync = common_vendor.index.getStorageSync(key);
  if (storageSync) {
    return JSON.parse(storageSync);
  }
  return void 0;
}
function setChatTopic(data) {
  return common_vendor.index.setStorageSync(key, JSON.stringify(data));
}
exports.getChatTopic = getChatTopic;
exports.setChatTopic = setChatTopic;
