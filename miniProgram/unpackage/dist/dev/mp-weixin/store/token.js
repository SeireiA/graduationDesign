"use strict";
const common_vendor = require("../common/vendor.js");
const key = "TOKEN_VALUE";
function getTokenValue() {
  const storageSync = common_vendor.index.getStorageSync(key);
  if (storageSync) {
    return JSON.parse(storageSync);
  }
  return void 0;
}
function removeTokenValue() {
  common_vendor.index.removeStorageSync(key);
}
function setTokenValue(data) {
  return common_vendor.index.setStorageSync(key, JSON.stringify(data));
}
exports.getTokenValue = getTokenValue;
exports.removeTokenValue = removeTokenValue;
exports.setTokenValue = setTokenValue;
