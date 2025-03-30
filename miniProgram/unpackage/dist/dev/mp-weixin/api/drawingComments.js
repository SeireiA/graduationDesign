"use strict";
const utils_request = require("../utils/request.js");
function reqDeleteComments(data) {
  return utils_request.service({
    url: "/drawing-comments/delete/comments",
    method: "post",
    data
  });
}
function reqCreateComments(data) {
  return utils_request.service({
    url: "/drawing-comments/create/comments",
    method: "post",
    data
  });
}
function reqGetCommentsPage(data) {
  const { pageNum, workflowsId } = data;
  return utils_request.service({
    url: "/drawing-comments/get/comments/page?pageNum=" + pageNum + "&workflowsId=" + workflowsId,
    method: "GET"
  });
}
exports.reqCreateComments = reqCreateComments;
exports.reqDeleteComments = reqDeleteComments;
exports.reqGetCommentsPage = reqGetCommentsPage;
