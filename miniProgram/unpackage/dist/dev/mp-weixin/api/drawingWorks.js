"use strict";
const utils_request = require("../utils/request.js");
function reqDeleteWorkflowsWorks(data) {
  return utils_request.service({
    url: "/drawing-works/delete/works",
    method: "POST",
    data
  });
}
function reqGetWorkflowsWorksPage(data) {
  return utils_request.service({
    url: "/drawing-works/get/works/page?pageNum=" + data,
    method: "GET"
  });
}
function reqGetWorkflowsWorks(data) {
  return utils_request.service({
    url: "/drawing-works/get/works?workflowsWorksId=" + data,
    method: "GET"
  });
}
exports.reqDeleteWorkflowsWorks = reqDeleteWorkflowsWorks;
exports.reqGetWorkflowsWorks = reqGetWorkflowsWorks;
exports.reqGetWorkflowsWorksPage = reqGetWorkflowsWorksPage;
