"use strict";
const utils_request = require("../utils/request.js");
function reqGetTaskProgress(data) {
  return utils_request.service({
    url: "/drawing-task/get/task/progress?taskId=" + data,
    method: "GET"
  });
}
function reqGetTaskProgressList() {
  return utils_request.service({
    url: "/drawing-task/get/task/progress/list",
    method: "GET"
  });
}
function reqSubmitTask(data) {
  return utils_request.service({
    url: "/drawing-task/submit/task",
    method: "POST",
    data
  });
}
exports.reqGetTaskProgress = reqGetTaskProgress;
exports.reqGetTaskProgressList = reqGetTaskProgressList;
exports.reqSubmitTask = reqSubmitTask;
