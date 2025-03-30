"use strict";
const utils_request = require("../utils/request.js");
function reqWechatLogin(data) {
  return utils_request.service({
    url: "/auth/wechat/login",
    method: "POST",
    data
  });
}
exports.reqWechatLogin = reqWechatLogin;
