import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('./views/Index/index.vue'),
      children: [
        {
          path: 'film',
          name: 'film',
          component: () => import('./views/Index/film.vue')
        },
        {
          path: 'cinema',
          name: 'cinema',
          component: () => import('./views/Index/cinema.vue')
        },
        {
          path: 'center',
          name: 'center',
          component: () => import('./views/Index/center.vue')
        },
        {
          path: '',
          redirect: '/film'
        }
      ]
    },
    {
      path: '/city',
      name: 'city',
      component: () => import('./views/City/index.vue')
    }
  ]
})
