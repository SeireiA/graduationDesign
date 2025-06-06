"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  props: {
    value: Array,
    column: {
      // 列的数量
      type: [String, Number],
      default: 2
    },
    maxColumn: {
      // 最大列数
      type: [String, Number],
      default: 5
    },
    columnSpace: {
      // 列之间的间距 百分比
      type: [String, Number],
      default: 2
    },
    imageKey: {
      // 图片key
      type: [String],
      default: "image"
    },
    hideImageKey: {
      // 隐藏图片key
      type: [String],
      default: "hide"
    },
    seat: {
      // 文本的位置，1图片之上 2图片之下
      type: [String, Number],
      default: 2
    },
    listStyle: {
      // 单个展示项的样式：eg:{'background':'red'}
      type: Object
    }
  },
  data() {
    return {
      data: {
        list: this.value ? this.value : [],
        column: this.column < 2 ? 2 : this.column,
        columnSpace: this.columnSpace <= 5 ? this.columnSpace : 5,
        imageKey: this.imageKey,
        seat: this.seat
      },
      msg: 0,
      listInitStyle: {
        "border-radius": "15rpx",
        "margin-bottom": "20rpx",
        "background-color": "#161817"
      },
      adds: [],
      //预置数据
      isLoaded: true,
      curIndex: 0,
      isRefresh: true,
      flag: false,
      refreshDatas: []
    };
  },
  computed: {
    // 计算列宽
    w() {
      const column_rate = `${100 / this.data.column - +this.data.columnSpace}%`;
      return column_rate;
    },
    // 计算margin
    m() {
      const column_margin = `${(100 - (100 / this.data.column - +this.data.columnSpace).toFixed(5) * this.data.column) / (this.data.column - 1)}%`;
      return column_margin;
    },
    // list样式
    s1() {
      return { ...this.listInitStyle, ...this.listStyle };
    }
  },
  created() {
    this.refresh();
  },
  methods: {
    // 预加载图片
    loadImages(idx = 0) {
      let count = 0;
      const newList = this.data.list.filter((item, index) => index >= idx);
      for (let i = 0; i < newList.length; i++) {
        common_vendor.index.getImageInfo({
          src: `${newList[i][this.imageKey]}.jpg`,
          complete: (res) => {
            count++;
            if (count == newList.length)
              this.initValue(idx);
          }
        });
      }
    },
    // 刷新
    refresh() {
      if (!this.isLoaded) {
        this.refreshDatas = this.value;
        return false;
      }
      setTimeout(() => {
        this.refreshDatas = [];
        this.isRefresh = true;
        this.adds = [];
        this.data.list = this.value ? this.value : [];
        this.data.column = this.column < 2 ? 2 : this.column >= this.maxColumn ? this.maxColumn : this.column;
        this.data.columnSpace = this.columnSpace <= 5 ? this.columnSpace : 5;
        this.data.imageKey = this.imageKey;
        this.data.seat = this.seat;
        this.curIndex = 0;
        for (let i = 1; i <= this.data.column; i++) {
          this.data[`column_${i}_values`] = [];
          this.msg++;
        }
        this.$nextTick(() => {
          this.initValue(this.curIndex, "refresh==>");
        });
      }, 1);
    },
    columnValue(index) {
      return this.data[`column_${index + 1}_values`];
    },
    change(newValue) {
      for (let i = 0; i < this.data.list.length; i++) {
        const cv = this.data[`column_${this.data.list[i].column}_values`];
        for (let j = 0; j < cv.length; j++) {
          if (newValue[i] && i === cv[j].index) {
            this.data[`column_${this.data.list[i].column}_values`][j] = Object.assign(cv[j], newValue[i]);
            this.msg++;
            break;
          }
        }
      }
    },
    getMin(a, s) {
      let m = a[0][s];
      let mo = a[0];
      for (var i = a.length - 1; i >= 0; i--) {
        if (a[i][s] < m) {
          m = a[i][s];
        }
      }
      mo = a.filter((i2) => i2[s] == m);
      return mo[0];
    },
    // 计算每列的高度
    getMinColumnHeight() {
      return new Promise((resolve) => {
        const heightArr = [];
        for (let i = 1; i <= this.data.column; i++) {
          const query = common_vendor.index.createSelectorQuery().in(this);
          query.select(`#waterfalls_flow_column_${i}`).boundingClientRect((data) => {
            heightArr.push({ column: i, height: data.height });
          }).exec(() => {
            if (this.data.column <= heightArr.length) {
              resolve(this.getMin(heightArr, "height"));
            }
          });
        }
      });
    },
    async initValue(i, from) {
      this.isLoaded = false;
      if (i >= this.data.list.length || this.refreshDatas.length) {
        this.msg++;
        this.loaded();
        return false;
      }
      const minHeightRes = await this.getMinColumnHeight();
      const c = this.data[`column_${minHeightRes.column}_values`];
      this.data.list[i].column = minHeightRes.column;
      c.push({ ...this.data.list[i], cIndex: c.length, index: i, o: 0 });
      this.msg++;
    },
    // 图片加载完成
    imgLoad(item, c) {
      const i = item.index;
      item.o = 1;
      this.$set(this.data[`column_${c}_values`], item.cIndex, JSON.parse(JSON.stringify(item)));
      this.initValue(i + 1);
    },
    // 图片加载失败
    imgError(item, c) {
      const i = item.index;
      item.o = 1;
      item[this.data.imageKey] = null;
      this.$set(this.data[`column_${c}_values`], item.cIndex, JSON.parse(JSON.stringify(item)));
      this.initValue(i + 1);
    },
    // 渲染结束
    loaded() {
      if (this.refreshDatas.length) {
        this.isLoaded = true;
        this.refresh();
        return false;
      }
      this.curIndex = this.data.list.length;
      if (this.adds.length) {
        this.data.list = this.adds[0];
        this.adds.splice(0, 1);
        this.initValue(this.curIndex);
      } else {
        if (this.data.list.length)
          this.$emit("loaded");
        this.isLoaded = true;
        this.isRefresh = false;
      }
    },
    // 单项点击事件
    wapperClick(item) {
      this.$emit("wapperClick", item);
    },
    // 图片点击事件
    imageClick(item) {
      this.$emit("imageClick", item);
    }
  },
  watch: {
    value: {
      deep: true,
      handler(newValue, oldValue) {
        setTimeout(() => {
          this.$nextTick(() => {
            if (this.isRefresh)
              return false;
            if (this.isLoaded) {
              if (newValue.length <= this.curIndex)
                return this.change(newValue);
              this.data.list = newValue;
              this.$nextTick(() => {
                this.initValue(this.curIndex, "watch==>");
              });
            } else {
              this.adds.push(newValue);
            }
          });
        }, 10);
      }
    },
    column(newValue) {
      this.refresh();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.data.column, (item, index, i0) => {
      return {
        a: common_vendor.f($options.columnValue(index), (item2, index2, i1) => {
          return common_vendor.e($data.data.seat == 1 ? {
            a: common_vendor.d(`slot${item2.index}`)
          } : {}, {
            b: common_vendor.n({
              "img-hide": item2[$props.hideImageKey] == true || item2[$props.hideImageKey] == 1
            }),
            c: common_vendor.n({
              "img-error": !item2[$data.data.imageKey]
            }),
            d: item2[$data.data.imageKey],
            e: common_vendor.o(($event) => $options.imgLoad(item2, index + 1), index2),
            f: common_vendor.o(($event) => $options.imgError(item2, index + 1), index2),
            g: common_vendor.o(($event) => $options.imageClick(item2), index2)
          }, $data.data.seat == 2 ? {
            h: common_vendor.d(`slot${item2.index}`)
          } : {}, {
            i: common_vendor.n({
              "column-value-show": item2.o
            }),
            j: index2,
            k: common_vendor.o(($event) => $options.wapperClick(item2), index2)
          });
        }),
        b: index,
        c: `waterfalls_flow_column_${index + 1}`,
        d: index == 0 ? 0 : $options.m
      };
    }),
    b: $data.data.seat == 1,
    c: $data.data.seat == 2,
    d: common_vendor.s($options.s1),
    e: $data.msg,
    f: $options.w
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6aaf0fae"]]);
wx.createComponent(Component);
