import Vue from 'vue'
import Router from 'vue-router'
import Places from '@/components/Places'
import LoginPage from '@/components/login'
import {requireAuth} from '../../utils/auth'
import SecretPage from '@/components/secret'
import BasicPage from '@/components/basic'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Places',
      component: Places
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage
    },
    {
      path: '/secret',
      name: 'SecretPage',
      beforeEnter: requireAuth,
      component: SecretPage
    },
    {
      path: '/basic',
      name: 'Basic',
      component: BasicPage
    }
  ]
})
