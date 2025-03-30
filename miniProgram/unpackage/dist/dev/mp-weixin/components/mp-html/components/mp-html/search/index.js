"use strict";
function Search(vm) {
  vm.search = function(key, anchor, style = "background-color:yellow") {
    const res = [];
    const stack = [];
    (function traversal(nodes) {
      for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        if (node.type === "text" && key) {
          const text = node.text;
          const arr = text.split(key);
          if (arr.length > 1) {
            node = {
              name: "span",
              attrs: {},
              type: "node",
              c: 1,
              s: 1,
              children: []
            };
            vm.$set(nodes, i, node);
            for (let j = 0; j < arr.length; j++) {
              if (arr[j]) {
                node.children.push({
                  type: "text",
                  text: arr[j]
                });
              }
              if (j !== arr.length - 1) {
                node.children.push({
                  name: "span",
                  attrs: {
                    id: anchor ? "search" + (res.length + 1) : void 0,
                    // 用于锚点的 id
                    style
                  },
                  c: 1,
                  children: [{
                    type: "text",
                    text: key instanceof RegExp ? key.exec(text)[0] : key
                  }]
                });
                res.push(node.children[node.children.length - 1].attrs);
              }
            }
            if (key instanceof RegExp) {
              key.exec(text);
            }
            if (anchor) {
              for (let l = stack.length; l--; ) {
                if (stack[l].c) {
                  break;
                } else {
                  vm.$set(stack[l], "c", 1);
                }
              }
            }
          }
        } else if (node.s) {
          let text = "";
          for (let k = 0; k < node.children.length; k++) {
            const child = node.children[k];
            if (child.text) {
              text += child.text;
            } else {
              text += child.children[0].text;
            }
          }
          vm.$set(nodes, i, {
            type: "text",
            text
          });
          if (key && (key instanceof RegExp ? key.test(text) : text.includes(key))) {
            i--;
          }
        } else if (node.children) {
          stack.push(node);
          traversal(node.children);
          stack.pop();
        }
      }
    })(vm.nodes);
    return new Promise(function(resolve) {
      setTimeout(() => {
        resolve({
          num: res.length,
          // 结果数量
          /**
           * @description 高亮某一个结果
           * @param {number} i 第几个
           * @param {string} hlstyle 高亮的样式
           */
          highlight(i, hlstyle = "background-color:#FF9632") {
            if (i < 1 || i > res.length)
              return;
            if (this.last) {
              res[this.last - 1].style = style;
            }
            this.last = i;
            res[i - 1].style = hlstyle;
          },
          /**
           * @description 跳转到搜索结果
           * @param {number} i 第几个
           * @param {number} offset 偏移量
           */
          jump: anchor ? (i, offset) => {
            if (i > 0 && i <= res.length) {
              vm.navigateTo("search" + i, offset);
            }
          } : void 0
        });
      }, 200);
    });
  };
}
exports.Search = Search;
