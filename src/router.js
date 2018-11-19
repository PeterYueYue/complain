import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '*',
    redirect: '/goods'
  },
  {
    name: 'result',
    component: () => import('./view/result'),
    meta: {
      title: '投诉处理结果'
    }
  },
  {
    name: 'search',
    component: () => import('./view/search'),
    meta: {
      title: '投诉结果查询'
    }
  },
  {
    name: 'goods',
    component: () => import('./view/goods'),
    meta: {
      title: '投诉建议'
    }
  },
  {
    name: 'issuccess',
    component: () => import('./view/issuccess'),
    meta: {
      title: '投诉提交'
    }
  }
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export {
  router
};
