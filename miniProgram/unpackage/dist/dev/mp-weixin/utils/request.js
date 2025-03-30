"use strict";
const common_vendor = require("../common/vendor.js");
const env = require("../env.js");
const store_token = require("../store/token.js");
const store_index = require("../store/index.js");
function service(options = {}) {
  options.url = `${env.env.baseHttps}${options.url}`;
  options.timeout = 1e5;
  const tokenValue = store_token.getTokenValue();
  if (tokenValue) {
    options.header = {
      "content-type": "application/json",
      "Authorization": `Bearer ${tokenValue}`
    };
  }
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      ...options,
      success: function(res) {
        if (res.statusCode === 200) {
          const response = res.data;
          if (response.code === 200) {
            resolve(response);
          } else if (response.code === 401) {
            store_index.store.commit("logout");
            common_vendor.index.reLaunch({
              url: "/pages/user/user"
            });
          } else {
            reject(response);
          }
        } else {
          reject("与服务器建立连接失败");
        }
      },
      fail: function(e) {
        console.log(e);
        reject("请检查您的网络环境是否正常");
      }
    });
  });
}
exports.service = service;
