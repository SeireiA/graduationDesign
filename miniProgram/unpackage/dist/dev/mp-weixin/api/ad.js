"use strict";
const utils_request = require("../utils/request.js");
function reqRewarded() {
  return utils_request.service({
    url: "/ad/rewarded",
    method: "POST"
  });
}
exports.reqRewarded = reqRewarded;
