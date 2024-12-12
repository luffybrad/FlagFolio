import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import { useAuthStore } from '@/stores/auth'
import SignupView from '@/views/SignupView.vue'
import ForgotPasswordView from '@/views/ForgotPasswordView.vue'
import ResetPasswordView from '@/views/ResetPasswordView.vue'

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
    {
      path: '/login',
      name: "Login",
      component: LoginView,
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        if (authStore.isAuthenticated()){
          next({name: 'home'})
        }else{
          next()
        }
      }
    },
    {
      path: '/signup',
      name: "Signup",
      component: SignupView,
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        if (authStore.isAuthenticated()){
          next({name: 'home'})
        }else{
          next()
        }
      }
    },
    {
      path: '/forgotPassword',
      name: 'Forgotpassword',
      component: ForgotPasswordView
    },
    {
      path: '/resetPassword/:token/:email',
      name: 'ResetPassword',
      component: ResetPasswordView,
      props: ({ params }) => ({
        token: Array.isArray(params.token) ? params.token[0] : params.token,
        email: Array.isArray(params.email) ? params.email[0] : params.email,
      })
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFoundView
    }
  ]

})


  router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    authStore.checkTokenExpiration();

    if(!authStore.isAuthenticated() && to.path !== '/login' && to.path !== '/signup' && to.path !=='/forgotPassword' && to.name !== 'ResetPassword'){
      return next({ name: 'Login'});
    }

    return next();
  })

export default router
