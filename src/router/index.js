import { createRouter, createWebHistory } from 'vue-router'
import ApplicationComponent from '@/components/ApplicationComponent.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ApplicationComponent
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
