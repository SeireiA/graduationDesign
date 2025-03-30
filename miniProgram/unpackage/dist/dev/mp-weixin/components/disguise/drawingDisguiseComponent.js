"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  common_vendor.unref(mpHtml)();
}
const mpHtml = () => "../mp-html/components/mp-html/mp-html.js";
const _sfc_main = {
  __name: "drawingDisguiseComponent",
  setup(__props) {
    const isArticle = common_vendor.ref(true);
    const content = common_vendor.ref("### Spring Boot 实现 Redis 锁\n \n在分布式系统中，为了确保多个实例对共享资源的互斥访问，常常需要使用分布式锁。Redis 提供了一个简单且有效的分布式锁实现。以下是如何在 Spring Boot 应用中利用 Redis 实现分布式锁的指南。\n \n## 添加依赖\n \n首先，你需要在项目的 `pom.xml` 文件中添加 Spring Boot 和 Redis 的相关依赖。\n \n```xml\n<dependencies>\n    <!-- Spring Boot Starter Web -->\n    <dependency>\n        <groupId>org.springframework.boot</groupId>\n        <artifactId>spring-boot-starter-web</artifactId>\n    </dependency>\n    \n    <!-- Spring Boot Starter Data Redis -->\n    <dependency>\n        <groupId>org.springframework.boot</groupId>\n        <artifactId>spring-boot-starter-data-redis</artifactId>\n    </dependency>\n    \n    <!-- Jedis 连接池（可选，Lettuce 也是支持的）-->\n    <dependency>\n        <groupId>redis.clients</groupId>\n        <artifactId>jedis</artifactId>\n    </dependency>\n</dependencies>");
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isArticle.value
      }, isArticle.value ? {
        b: common_vendor.o(($event) => isArticle.value = false)
      } : {}, {
        c: !isArticle.value
      }, !isArticle.value ? {
        d: common_vendor.o(($event) => isArticle.value = true),
        e: common_vendor.p({
          content: content.value,
          selectable: true,
          ["lazy-load"]: true,
          ["copy-link"]: true,
          markdown: true
        })
      } : {});
    };
  }
};
wx.createComponent(_sfc_main);
