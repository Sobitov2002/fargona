import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/page/main/Page.vue'
import DefaultLayout from '@/layouts/DefaultLayouts.vue'
import PostDetail from '@/page/postdetail/NewPodtdetail.vue'
import CategoryDetail from '@/page/categorydetail/CategoryDetail.vue'
import About from '@/page/about/Page.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { layout: DefaultLayout }
    },
    {
      path: '/new/:id',
      name: 'PostDetail',
      component: PostDetail,
      meta: { layout: DefaultLayout }
    },
    {
      path: '/category/:id',
      name: 'CategoryDetail',
      component: CategoryDetail,
      meta: { layout: DefaultLayout }
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      meta: { layout: DefaultLayout }
    },
  ],
})

export default router
