import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/:continent/:country',
      name: 'about',
      component: AboutView,
      props: ({ params }) => ({
        continent: Array.isArray(params.continent) ? params.continent[0] : params.continent,
        countryName: Array.isArray(params.country) ? params.country[0] : params.country,
      })
    },
  ],
})

export default router
