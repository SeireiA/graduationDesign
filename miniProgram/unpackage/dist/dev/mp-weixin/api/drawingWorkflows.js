"use strict";
const utils_request = require("../utils/request.js");
const env = require("../env.js");
function reqGetWorkflowsCategoryList() {
  return utils_request.service({
    url: "/drawing-workflows/get/workflows/category/list",
    method: "get"
  });
}
function reqGetWorkflowsInterface(data) {
  return utils_request.service({
    url: "/drawing-workflows/get/workflows/interface?workflowsId=" + data,
    method: "get"
  });
}
function reqGetWorkflows(data) {
  return utils_request.service({
    url: "/drawing-workflows/get/workflows?workflowsId=" + data,
    method: "get"
  });
}
function reqGetWorkflowsPage(data) {
  return utils_request.service({
    url: "/drawing-workflows/get/workflows/page?pageNum=" + data.pageNum + "&prompt=" + data.prompt + "&workflowsCategoryId=" + data.workflowsCategoryId,
    method: "get",
    data
  });
}
function reqGetUploadWorkflowsComponentFile() {
  return env.env.baseHttps + "/drawing-workflows/upload/file";
}
exports.reqGetUploadWorkflowsComponentFile = reqGetUploadWorkflowsComponentFile;
exports.reqGetWorkflows = reqGetWorkflows;
exports.reqGetWorkflowsCategoryList = reqGetWorkflowsCategoryList;
exports.reqGetWorkflowsInterface = reqGetWorkflowsInterface;
exports.reqGetWorkflowsPage = reqGetWorkflowsPage;
