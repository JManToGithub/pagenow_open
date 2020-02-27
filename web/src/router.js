import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

/**
 * 白名单，此名单下的路由无需判断用户是否登录
 * @type {string[]}
 */
const whitelist = [
  '/login'
];

/**
 * 黑名单，此名单下的路由需要做登录校验
 * @type {string[]}
 */
const blacklist = [
  '/',
  '/admin',
  '/admin/project_manage',
  '/admin/compinfo_manage',
  '/admin/echart_theme_manage',
  '/admin/user_manage',
  '/designer',
];

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/',
      redirect: '/admin/project_manage'
      // name: 'home',
      // component: resolve => require(['@/views/Home'], resolve)
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('./views/Admin.vue'),
      children: [
        {
          path: 'project_manage',
          name: 'ProjectManage',
          component: () => import('./views/components/admin/project/ProjectManage.vue')
        },
        {
          path: 'compinfo_manage',
          name: 'CompinfoManage',
          component: () => import('./views/components/admin/compinfo/CompinfoManage.vue')
        },
        {
          path: 'echart_theme_manage',
          name: 'EchartThemeManage',
          component: () => import('./views/components/admin/echartTheme/EchartThemeManage.vue')
        },
        {
          path: 'user_manage',
          name: 'UserManage',
          component: () => import('./views/components/admin/user/UserManage.vue')
        }
      ],
    },
    {
      path: '/designer',
      name: 'Designer',
      component: () => import('./views/Designer.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {

  if (whitelist.includes(to.path)) {
    next()
  }else {
    if (blacklist.includes(to.path)) {
      let token = localStorage.getItem('token');
      if (token === null || token === '' || token === 'null') {
        next('/login')
      }
    }
    next()
  }

  if (to.meta.title) {
    document.title = to.meta.title
  }

  next();
});


export default router
