import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/page/main/Page.vue'
import DefaultLayout from '@/layouts/DefaultLayouts.vue'
import PostDetail from '@/page/postdetail/Page.vue'
import CategoryDetail from '@/page/categorydetail/CategoryDetail.vue'
import RecPost from '@/page/recommendation/RecDetail.vue'
import About from '@/page/about/Page.vue'
import Search from '@/page/search/Page.vue'
import Contact from '@/page/contact/Page.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { layout: DefaultLayout }
  },
  {
    path: '/news/:type/:id',
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
    path: '/recpost',
    name: 'RecPost',
    component: RecPost,
    meta: { layout: DefaultLayout }
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    meta: { layout: DefaultLayout }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { layout: DefaultLayout }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: { layout: DefaultLayout }
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router
