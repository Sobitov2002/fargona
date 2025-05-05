import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/page/main/Page.vue'
import DefaultLayout from '@/layouts/DefaultLayouts.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { layout: DefaultLayout }
    },
    
    
  ],
})

export default router
