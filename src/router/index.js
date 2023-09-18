import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 登陆
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue')
    },
    // 主页
    {
      path: '/',
      name: 'home',
      redirect: '/demand',
      meta: { requiresAuth: true }
    },
    // 需求管理路由
    {
      path: '/demand',
      name: 'demand',
      component: () => import('../views/demand/DemandView.vue'),
      redirect: '/demand/my',
      meta: { requiresAuth: true },
      children: [
        {
          path: '/demand/my',
          name: 'demand-my',
          meta: { requiresAuth: true },
          component: () => import('../views/demand/DemandMyView.vue')
        },
        {
          path: '/demand/list',
          name: 'demand-list',
          meta: { requiresAuth: true },
          component: () => import('../views/demand/DemandListView.vue')
        }
      ]
    },
    // 任务管理路由
    {
      path: '/task',
      name: 'task',
      component: () => import('../views/task/TaskView.vue'),
      redirect: '/task/my',
      meta: { requiresAuth: true },
      children: [
        {
          path: '/task/my',
          name: 'task-my',
          meta: { requiresAuth: true },
          component: () => import('../views/task/TaskMyView.vue')
        },
        {
          path: '/task/project',
          name: 'task-project',
          meta: { requiresAuth: true },
          component: () => import('../views/task/ProjectView.vue')
        },
        {
          path: '/task/list',
          name: 'task-list',
          meta: { requiresAuth: true },
          component: () => import('../views/task/TaskListView.vue')
        }
      ]
    },
    // 团队管理路由
    {
      path: '/team',
      name: 'team',
      component: () => import('../views/team/TeamView.vue'),
      redirect: '/team/overview',
      meta: { requiresAuth: true },
      children: [
        {
          path: '/team/overview',
          name: 'team-overview',
          meta: { requiresAuth: true },
          component: () => import('../views/team/TeamOverviewView.vue')
        },
        {
          path: '/team/:id/user',
          name: 'team-user',
          meta: { requiresAuth: true },
          component: () => import('../views/team/TeamUserView.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

// 在导航守卫中检查用户是否已经登录
router.beforeEach(async (to, from, next) => {
  const store = useAuthStore()
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // 判断用户是否已经登录
    if (!store.authToken) {
      // 如果用户未登录，则重定向到登录页面
      const { to } = await store.redirectUri()
      window.location.href = to
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
