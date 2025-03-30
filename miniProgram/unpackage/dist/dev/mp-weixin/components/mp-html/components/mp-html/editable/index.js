"use strict";
const components_mpHtml_components_mpHtml_editable_config = require("./config.js");
const components_mpHtml_components_mpHtml_parser = require("../parser.js");
function Editable(vm) {
  this.vm = vm;
  this.editHistory = [];
  this.editI = -1;
  vm._mask = [];
  vm._setData = function(path, val) {
    const paths = path.split(".");
    let target = vm;
    for (let i = 0; i < paths.length - 1; i++) {
      target = target[paths[i]];
    }
    vm.$set(target, paths.pop(), val);
  };
  const move = (num) => {
    setTimeout(() => {
      const item = this.editHistory[this.editI + num];
      if (item) {
        this.editI += num;
        vm._setData(item.key, item.value);
      }
    }, 200);
  };
  vm.undo = () => move(-1);
  vm.redo = () => move(1);
  vm._editVal = (path, oldVal, newVal, set) => {
    while (this.editI < this.editHistory.length - 1) {
      this.editHistory.pop();
    }
    while (this.editHistory.length > 30) {
      this.editHistory.pop();
      this.editI--;
    }
    const last = this.editHistory[this.editHistory.length - 1];
    if (!last || last.key !== path) {
      if (last) {
        this.editHistory.pop();
        this.editI--;
      }
      this.editHistory.push({
        key: path,
        value: oldVal
      });
      this.editI++;
    }
    this.editHistory.push({
      key: path,
      value: newVal
    });
    this.editI++;
    if (set) {
      vm._setData(path, newVal);
    }
  };
  vm._getItem = function(node, up, down) {
    let items;
    let i;
    if (node === "color") {
      return components_mpHtml_components_mpHtml_editable_config.config.color;
    }
    if (node.name === "img") {
      items = components_mpHtml_components_mpHtml_editable_config.config.img.slice(0);
      if (!vm.getSrc) {
        i = items.indexOf("换图");
        if (i !== -1) {
          items.splice(i, 1);
        }
        i = items.indexOf("超链接");
        if (i !== -1) {
          items.splice(i, 1);
        }
        i = items.indexOf("预览图");
        if (i !== -1) {
          items.splice(i, 1);
        }
      }
      i = items.indexOf("禁用预览");
      if (i !== -1 && node.attrs.ignore) {
        items[i] = "启用预览";
      }
    } else if (node.name === "a") {
      items = components_mpHtml_components_mpHtml_editable_config.config.link.slice(0);
      if (!vm.getSrc) {
        i = items.indexOf("更换链接");
        if (i !== -1) {
          items.splice(i, 1);
        }
      }
    } else if (node.name === "video" || node.name === "audio") {
      items = components_mpHtml_components_mpHtml_editable_config.config.media.slice(0);
      i = items.indexOf("封面");
      if (!vm.getSrc && i !== -1) {
        items.splice(i, 1);
      }
      i = items.indexOf("循环");
      if (node.attrs.loop && i !== -1) {
        items[i] = "不循环";
      }
      i = items.indexOf("自动播放");
      if (node.attrs.autoplay && i !== -1) {
        items[i] = "不自动播放";
      }
    } else if (node.name === "card") {
      items = components_mpHtml_components_mpHtml_editable_config.config.card.slice(0);
    } else {
      items = components_mpHtml_components_mpHtml_editable_config.config.node.slice(0);
    }
    if (!up) {
      i = items.indexOf("上移");
      if (i !== -1) {
        items.splice(i, 1);
      }
    }
    if (!down) {
      i = items.indexOf("下移");
      if (i !== -1) {
        items.splice(i, 1);
      }
    }
    return items;
  };
  vm._tooltip = function(obj) {
    vm.$set(vm, "tooltip", {
      top: obj.top,
      items: obj.items
    });
    vm._tooltipcb = obj.success;
  };
  vm._slider = function(obj) {
    vm.$set(vm, "slider", {
      min: obj.min,
      max: obj.max,
      value: obj.value,
      top: obj.top
    });
    vm._slideringcb = obj.changing;
    vm._slidercb = obj.change;
  };
  vm._color = function(obj) {
    vm.$set(vm, "color", {
      items: obj.items,
      top: obj.top
    });
    vm._colorcb = obj.success;
  };
  vm._maskTap = function() {
    while (vm._mask.length) {
      vm._mask.pop()();
    }
    if (vm.tooltip) {
      vm.$set(vm, "tooltip", null);
    }
    if (vm.slider) {
      vm.$set(vm, "slider", null);
    }
    if (vm.color) {
      vm.$set(vm, "color", null);
    }
  };
  function insert(node) {
    if (vm._edit) {
      vm._edit.insert(node);
    } else {
      const nodes = vm.nodes.slice(0);
      nodes.push(node);
      vm._editVal("nodes", vm.nodes, nodes, true);
    }
  }
  vm.insertHtml = (html) => {
    this.inserting = true;
    const arr = new components_mpHtml_components_mpHtml_parser.Parser(vm).parse(html);
    this.inserting = void 0;
    for (let i = 0; i < arr.length; i++) {
      insert(arr[i]);
    }
  };
  vm.insertImg = function() {
    vm.getSrc && vm.getSrc("img").then((src) => {
      if (typeof src === "string") {
        src = [src];
      }
      const parser = new components_mpHtml_components_mpHtml_parser.Parser(vm);
      for (let i = 0; i < src.length; i++) {
        insert({
          name: "img",
          attrs: {
            src: parser.getUrl(src[i])
          }
        });
      }
    }).catch(() => {
    });
  };
  vm.insertLink = function() {
    vm.getSrc && vm.getSrc("link").then((url) => {
      insert({
        name: "a",
        attrs: {
          href: url
        },
        children: [{
          type: "text",
          text: url
        }]
      });
    }).catch(() => {
    });
  };
  vm.insertTable = function(rows, cols) {
    const table = {
      name: "table",
      attrs: {
        style: "display:table;width:100%;margin:10px 0;text-align:center;border-spacing:0;border-collapse:collapse;border:1px solid gray"
      },
      children: []
    };
    for (let i = 0; i < rows; i++) {
      const tr = {
        name: "tr",
        attrs: {},
        children: []
      };
      for (let j = 0; j < cols; j++) {
        tr.children.push({
          name: "td",
          attrs: {
            style: "padding:2px;border:1px solid gray"
          },
          children: [{
            type: "text",
            text: ""
          }]
        });
      }
      table.children.push(tr);
    }
    insert(table);
  };
  function insertMedia(node) {
    if (typeof node.src === "string") {
      node.src = [node.src];
    }
    const parser = new components_mpHtml_components_mpHtml_parser.Parser(vm);
    for (let i = 0; i < node.src.length; i++) {
      node.src[i] = parser.getUrl(node.src[i]);
    }
    insert({
      name: "div",
      attrs: {
        style: "text-align:center"
      },
      children: [node]
    });
  }
  vm.insertVideo = function() {
    vm.getSrc && vm.getSrc("video").then((src) => {
      insertMedia({
        name: "video",
        attrs: {
          controls: "T"
        },
        children: [],
        src
      });
    }).catch(() => {
    });
  };
  vm.insertAudio = function() {
    vm.getSrc && vm.getSrc("audio").then((attrs) => {
      let src;
      if (attrs.src) {
        src = attrs.src;
        attrs.src = void 0;
      } else {
        src = attrs;
        attrs = {};
      }
      attrs.controls = "T";
      insertMedia({
        name: "audio",
        attrs,
        children: [],
        src
      });
    }).catch(() => {
    });
  };
  vm.insertText = function() {
    insert({
      name: "p",
      attrs: {},
      children: [{
        type: "text",
        text: ""
      }]
    });
  };
  vm.clear = function() {
    vm._maskTap();
    vm._edit = void 0;
    vm.$set(vm, "nodes", [{
      name: "p",
      attrs: {},
      children: [{
        type: "text",
        text: ""
      }]
    }]);
  };
  vm.getContent = function() {
    let html = "";
    (function traversal(nodes, table) {
      for (let i = 0; i < nodes.length; i++) {
        let item = nodes[i];
        if (item.type === "text") {
          html += item.text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>").replace(/\xa0/g, "&nbsp;");
        } else {
          if (item.name === "img") {
            item.attrs.i = "";
            if ((item.attrs.src || "").includes("data:image/svg+xml;utf8,")) {
              html += item.attrs.src.substr(24).replace(/%23/g, "#").replace("<svg", '<svg style="' + (item.attrs.style || "") + '"');
              continue;
            }
          } else if (item.name === "video" || item.name === "audio") {
            item = JSON.parse(JSON.stringify(item));
            if (item.src.length > 1) {
              item.children = [];
              for (let j = 0; j < item.src.length; j++) {
                item.children.push({
                  name: "source",
                  attrs: {
                    src: item.src[j]
                  }
                });
              }
            } else {
              item.attrs.src = item.src[0];
            }
          } else if (item.name === "div" && (item.attrs.style || "").includes("overflow:auto") && (item.children[0] || {}).name === "table") {
            item = item.children[0];
          }
          if (item.name === "table") {
            item = JSON.parse(JSON.stringify(item));
            table = item.attrs;
            if ((item.attrs.style || "").includes("display:grid")) {
              item.attrs.style = item.attrs.style.split("display:grid")[0];
              const children = [{
                name: "tr",
                attrs: {},
                children: []
              }];
              for (let j = 0; j < item.children.length; j++) {
                item.children[j].attrs.style = item.children[j].attrs.style.replace(/grid-[^;]+;*/g, "");
                if (item.children[j].r !== children.length) {
                  children.push({
                    name: "tr",
                    attrs: {},
                    children: [item.children[j]]
                  });
                } else {
                  children[children.length - 1].children.push(item.children[j]);
                }
              }
              item.children = children;
            }
          }
          html += "<" + item.name;
          for (const attr in item.attrs) {
            let val = item.attrs[attr];
            if (!val)
              continue;
            if (val === "T" || val === true) {
              html += " " + attr;
              continue;
            } else if (item.name[0] === "t" && attr === "style" && table) {
              val = val.replace(/;*display:table[^;]*/, "");
              if (table.border) {
                val = val.replace(/border[^;]+;*/g, ($) => $.includes("collapse") ? $ : "");
              }
              if (table.cellpadding) {
                val = val.replace(/padding[^;]+;*/g, "");
              }
              if (!val)
                continue;
            }
            html += " " + attr + '="' + val.replace(/"/g, "&quot;") + '"';
          }
          html += ">";
          if (item.children) {
            traversal(item.children, table);
            html += "</" + item.name + ">";
          }
        }
      }
    })(vm.nodes);
    for (let i = vm.plugins.length; i--; ) {
      if (vm.plugins[i].onGetContent) {
        html = vm.plugins[i].onGetContent(html) || html;
      }
    }
    return html;
  };
}
Editable.prototype.onUpdate = function(content, config) {
  if (this.vm.editable) {
    this.vm._maskTap();
    config.entities.amp = "&";
    if (!this.inserting) {
      this.vm._edit = void 0;
      if (!content) {
        setTimeout(() => {
          this.vm.$set(this.vm, "nodes", [{
            name: "p",
            attrs: {},
            children: [{
              type: "text",
              text: ""
            }]
          }]);
        }, 0);
      }
    }
  }
};
Editable.prototype.onParse = function(node) {
  if (this.vm.editable && (node.name === "td" || node.name === "th") && !this.vm.getText(node.children)) {
    node.children.push({
      type: "text",
      text: ""
    });
  }
};
exports.Editable = Editable;
