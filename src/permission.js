import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getStorage } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";

NProgress.configure({
  showSpinner: false,
}); // NProgress Configuration

const whiteList = ["/login", "/404"]; // 不用权限的页面

router.beforeEach(async (to, from, next) => {
  console.log(to, from, "beforeEach");
  // start progress bar
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);

  // determine whether the user has logged in
  const hasToken = getStorage();
  console.log(hasToken, "hasToken");
  if (hasToken) {
    if (to.path === "/login") {
      // if is logged in, redirect to the home page
      next({
        path: "/",
      });
      NProgress.done();
    } else {
      const hasGetUserInfo = store.getters.name;
      if (hasGetUserInfo) {
        console.log(11111111111111);
        next();
      } else {
        try {
          console.log(22222);
          // get user info
          // await store.dispatch('user/getInfo')
          next();
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch("user/resetToken");
          Message.error(error || "Has Error");
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    /* has no token*/
    console.log(111);
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      console.log(22);
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
