import Vue from "vue";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en"; // lang i18n

import "@/styles/index.scss"; // global css

import App from "./App";
import store from "./store";
import router from "./router";

import "@/icons"; // icon
import "@/permission"; // permission control
import "./utils/error-log"; // error log

import Pages from "@/components/Pages/index.vue";
import Table from "@/components/Table/index.vue";
import Pagination from "@/components/Pagination/index.vue";
import Drawer from "@/components/Drawer/index.vue";
// import SearchForm from "@/components/SearchForm/index.vue";
import Uploads from "@/components/Uploads/index.vue";

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === "production") {
//   const { mockXHR } = require("../mock");
//   mockXHR();
// }

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale });
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI);

Vue.component("Pages", Pages);
Vue.component("Table", Table);
Vue.component("Pagination", Pagination);
Vue.component("Drawer", Drawer);
// Vue.component("SearchForm", SearchForm);
Vue.component("Uploads", Uploads);

Vue.config.productionTip = false;

new Vue({
    el: "#app",
    router,
    store,
    render: (h) => h(App),
});