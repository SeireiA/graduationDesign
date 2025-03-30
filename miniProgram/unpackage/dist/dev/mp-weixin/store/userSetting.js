"use strict";
const common_vendor = require("../common/vendor.js");
const key = "USER_SETTING";
function getUserSetting() {
  const storageSync = common_vendor.index.getStorageSync(key);
  if (storageSync) {
    return JSON.parse(storageSync);
  }
  return void 0;
}
function setUserSetting(data) {
  return common_vendor.index.setStorageSync(key, JSON.stringify(data));
}
exports.getUserSetting = getUserSetting;
exports.setUserSetting = setUserSetting;
