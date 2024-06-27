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
    
  ]
})

export default router
