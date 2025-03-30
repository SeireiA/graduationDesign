"use strict";
const common_vendor = require("../common/vendor.js");
const key = "DISGUISE_STATUS";
function getDisguiseStatus() {
  const storageSync = common_vendor.index.getStorageSync(key);
  if (storageSync) {
    return JSON.parse(storageSync);
  }
  return void 0;
}
function setDisguiseStatus(data) {
  return common_vendor.index.setStorageSync(key, JSON.stringify(data));
}
exports.getDisguiseStatus = getDisguiseStatus;
exports.setDisguiseStatus = setDisguiseStatus;
