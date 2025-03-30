"use strict";
const utils_request = require("../utils/request.js");
function reqGetModelList() {
  return utils_request.service({
    url: "/chat-config/get/model/list",
    method: "GET"
  });
}
exports.reqGetModelList = reqGetModelList;
