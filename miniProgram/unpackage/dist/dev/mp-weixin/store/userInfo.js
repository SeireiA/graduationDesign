"use strict";
const common_vendor = require("../common/vendor.js");
const key = "USER_INFO";
function getUserInfo() {
  const storageSync = common_vendor.index.getStorageSync(key);
  if (storageSync) {
    return JSON.parse(storageSync);
  }
  return void 0;
}
function setUserInfo(data) {
  return common_vendor.index.setStorageSync(key, JSON.stringify(data));
}
exports.getUserInfo = getUserInfo;
exports.setUserInfo = setUserInfo;
