import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/missions/:id',
      name: 'missions',
      component: () => import('../views/MissionsDetailedView.vue')
    },
    {
      path: '/ajout-mission',
      name: 'ajout-mission',
      component: () => import('../views/AddMissionView.vue')
    },
    {
      path: '/connexion',
      name: 'connexion',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/inscription',
      name: 'inscription',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/profil',
      name: 'profil',
      component: () => import('../views/ProfilPageView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminUsersView.vue')
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('../views/ForgotPasswordView.vue')
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: () => import('../views/NewPasswordView.vue')
    },
    {
      path: '/likes',
      name: 'likes',
      component: () => import('../views/LikesView.vue')
    },
  ]
})

export default router
