"use strict";
const utils_request = require("../utils/request.js");
function reqGetDisguiseStatus() {
  return utils_request.service({
    url: "/disguise/status",
    method: "GET"
  });
}
exports.reqGetDisguiseStatus = reqGetDisguiseStatus;
