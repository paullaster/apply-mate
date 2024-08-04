import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/packages/Lading/views/LadingView.vue';
import HomeViewComponent from '@/packages/Lading/components/HomeViewComponent.vue';
import AuthService from '@/packages/auth/AuthService';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingView,
      children: [
        {
          path: '',
          components: { default: HomeViewComponent },
          meta: {
            title: 'Home',
          },
        },
        {
          path: 'apply',
          name: 'apply',
          components: { default: ()=> import('@/packages/Lading/components/ApplyComponent.vue')},
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
          path:'set-password/:token',
          name:'set-password',
          component: () => import('@/packages/auth/components/SetPassword.vue'),
        }
      ],
      meta: {
        title: 'Authentication'
      },
      beforeEnter: (to, from, next) => {
        if (AuthService.isAuthenticated()) {
          next({ name: 'userLayout', params: {user: btoa(AuthService.getUser()?.id)} })
        }else {
          next();
        }
      }
    },
    {
      path: '/:user',
      name: 'userLayout',
      redirect: { name: 'applications'},
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
        },
        {
          path: 'onboarded',
          name: 'onboarded',
          components: {
            default: () => import("@/packages/application/views/OnboardedApplicationComponent.vue"),
          },
          meta: {
            title: 'Onboarded Applications'
          }
        },
        {
          path: 'approved',
          name: 'approved',
          components: {
            default: () => import("@/packages/application/views/ApprovedApplications.vue"),
          },
          meta: {
            title: 'Approved Applications'
          }
        },
      ],
      meta: {
        requiresAuth: true,
        title: 'User'
      }
    }
    
  ]
})


router.beforeEach((to, from, next) => {
  const { requiresAuth } = to.meta;
  if (requiresAuth && !AuthService.isAuthenticated()) {
    next({ name: 'login' });
  } else {
    next();
  }
})
router.beforeResolve( async (to) => {
    if (to.meta.requiresAuth) {
        return AuthService.isAuthenticated() ? true : false;
    }
})

export default router
