"use strict";
const utils_request = require("../utils/request.js");
function reqGetCurrentUserInfo() {
  return utils_request.service({
    url: "/user/get/userInfo",
    method: "GET"
  });
}
function reqUploadNickName(data) {
  return utils_request.service({
    url: "/user/upload/nickName",
    method: "post",
    data
  });
}
exports.reqGetCurrentUserInfo = reqGetCurrentUserInfo;
exports.reqUploadNickName = reqUploadNickName;
