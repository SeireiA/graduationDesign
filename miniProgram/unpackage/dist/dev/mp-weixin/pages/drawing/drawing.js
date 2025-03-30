"use strict";
const common_vendor = require("../../common/vendor.js");
const api_drawingWorkflows = require("../../api/drawingWorkflows.js");
const store_index = require("../../store/index.js");
if (!Math) {
  (LoadingDataComponent + TopComponent + WorkflowsComponent + EmptyDataComponent + DrawingDisguiseComponent)();
}
const TopComponent = () => "./component/topComponent.js";
const WorkflowsComponent = () => "./component/workflowsComponent.js";
const LoadingDataComponent = () => "../../components/loadingDataComponent.js";
const EmptyDataComponent = () => "../../components/emptyDataComponent.js";
const DrawingDisguiseComponent = () => "../../components/disguise/drawingDisguiseComponent.js";
const _sfc_main = {
  __name: "drawing",
  setup(__props) {
    const isLoading = common_vendor.ref(false);
    const argument = common_vendor.ref({
      pageNum: 1,
      prompt: "",
      workflowsCategoryId: ""
    });
    const workflowsData = common_vendor.ref([]);
    const workflowsCategoryData = common_vendor.ref([]);
    const handleGetWorkflowsPageByPrompt = (prompt) => {
      if (argument.value.prompt === prompt) {
        console.log("yes");
        argument.value.prompt = "";
      } else {
        argument.value.prompt = prompt;
      }
      argument.value.pageNum = 1;
      workflowsData.value = [];
      handleGetWorkflowsPage();
      console.log(argument.value.prompt);
    };
    const handleGetWorkflowsPageByCategory = (workflowsCategoryId) => {
      if (argument.value.workflowsCategoryId === workflowsCategoryId) {
        argument.value.workflowsCategoryId = "";
      } else {
        argument.value.workflowsCategoryId = workflowsCategoryId;
      }
      argument.value.pageNum = 1;
      workflowsData.value = [];
      handleGetWorkflowsPage();
    };
    const handleGetWorkflowsPage = async () => {
      if (!isLoading.value) {
        try {
          isLoading.value = true;
          const { data } = await api_drawingWorkflows.reqGetWorkflowsPage(argument.value);
          if (data.records && data.records.length > 0) {
            argument.value.pageNum = argument.value.pageNum + 1;
            workflowsData.value.push(...data.records);
          } else {
            common_vendor.index.showToast({
              icon: "none",
              duration: 1500,
              title: "已经拉到底~"
            });
          }
        } catch (e) {
          console.log(e);
        } finally {
          setTimeout(() => {
            isLoading.value = false;
          }, 500);
        }
      }
    };
    const handleGetWorkflowsCategoryList = async () => {
      try {
        const { data } = await api_drawingWorkflows.reqGetWorkflowsCategoryList();
        workflowsCategoryData.value = data;
      } catch (e) {
        console.log(e);
      }
    };
    common_vendor.onLoad(() => {
      handleGetWorkflowsPage();
      handleGetWorkflowsCategoryList();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          isLoading: isLoading.value
        }),
        b: common_vendor.o(handleGetWorkflowsPageByCategory),
        c: common_vendor.o(handleGetWorkflowsPageByPrompt),
        d: common_vendor.p({
          prompt: argument.value.prompt,
          workflowsCategoryData: workflowsCategoryData.value,
          workflowsCategoryId: argument.value.workflowsCategoryId
        }),
        e: workflowsData.value.length > 0
      }, workflowsData.value.length > 0 ? {
        f: common_vendor.p({
          workflowsData: workflowsData.value
        }),
        g: common_vendor.o(handleGetWorkflowsPage)
      } : {
        h: common_vendor.p({
          height: 94,
          msg: "没有找到创意数据"
        })
      }, {
        i: common_vendor.unref(store_index.store).getters.disguiseStatus,
        j: !common_vendor.unref(store_index.store).getters.disguiseStatus
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-12fe128f"]]);
wx.createPage(MiniProgramPage);
