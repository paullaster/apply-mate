import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/packages/Lading/views/LadingView.vue';
import ApplyView from '@/packages/Lading/components/ApplyComponent.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: 'apply'},
      component: LandingView,
      children: [
        {
          path: 'apply',
          name: 'apply',
          components: { default: ApplyView },
          meta: {
            title: 'Apply',
          },
        }
      ],
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/packages/auth/views/AuthView.vue'),
      redirect: {name: 'login'},
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/packages/auth/components/LoginView.vue'),
        },
        {
          path: 'activate',
          name: 'activate',
          component: () => import('@/packages/auth/components/ActivateAccount.vue'),
        },
        {
          path: 'forgot-password',
          name: 'forgot-password',
          component: () => import('@/packages/auth/components/ForgotPassword.vue'),
        },
        {
          path:'set-password/:auth',
          name:'set-password',
          component: () => import('@/packages/auth/components/SetPassword.vue'),
        }
      ],
    },
    {
      path: '/:user',
      name: 'userLayout',
      component: () => import("@/layout/DashboardLayout.vue"),
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          components: {
            default: () => import("@/packages/Dashboard/views/DashboardComponent.vue"),
          },
          meta: {
            title: 'Dashboard'
          }
        },
        {
          path: 'applications',
          name: 'applications',
          components: {
            default: () => import("@/packages/application/views/ApplicationComponent.vue"),
          },
          meta: {
            title: 'Applications'
          }
        },
        {
          path: 'application/:id',
          name: 'application',
          components: {
            default: () => import("@/packages/application/components/ApplicationView.vue"),
          },
          meta: {
            title: 'Application'
          }
        }
      ],
      meta: {
        requiresAuth: true,
        title: 'User'
      }
    }
    
  ]
})

export default router
