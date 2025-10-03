import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './views/HomePage.vue'
import NotePage from './views/NotePage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/note/:id?', component: NotePage, props: true }, // dynamic route
  { path: '/:pathMatch(.*)*', redirect: '/' }, // catch-all
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
