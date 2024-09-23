import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * constantRoutes
 * 没有权限要求的基页
 * 所有角色都可以访问
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/problem",
    component: Layout,
    meta: {
      role: [1, 2],
    },
    children: [
      {
        path: "problem",
        name: "problem",
        component: () => import("@/views/problem/index"),
        meta: {
          title: "答题",
          icon: "dashboard",
        },
      },
    ],
  },
  {
    path: "/dashboard",
    component: Layout,
    meta: {
      role: [3],
    },
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: {
          title: "工作台",
          icon: "dashboard",
        },
      },
    ],
  },
  {
    path: "/answer",
    component: Layout,
    meta: {
      role: [3],
    },

    children: [
      {
        path: "answer",
        name: "answer",
        component: () => import("@/views/answer/index"),
        meta: {
          title: "查看答案",
          icon: "dashboard",
        },
      },
    ],
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },
  // 404 page must be placed at the end !!!
  // {
  //   path: "*",
  //   meta: {
  //     role: [1, 2, 3],
  //   },
  //   redirect: "/404",
  //   hidden: true,
  // },
];
const createRouter = () =>
  new Router({
    mode: "hash", // require service support
    // base: "/charge/",
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
