import Vue from 'vue'
import Router from 'vue-router'
import homePage from '../pages/home.vue'
import boardsPage from '../pages/boards.vue'
import newProjectPage from '../pages/project.vue'
import loginPage from '../components/login.vue'
import registerPage from '../components/register.vue'
import testPage from '../pages/test.vue'
import existingProjectPage from '../pages/existingProject.vue'



Vue.use(Router)

const router = new Router({
  root: '/login',
  routes: [{
      path: '/login',
      name: 'login',
      component: loginPage
    },
    {
      path: '/register',
      name: 'register',
      component: registerPage
    },
    {
      path: '/home',
      name: 'home',
      component: homePage
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/boards',
      name: 'boards',
      component: boardsPage
    },
    {
      path: '/project',
      name: 'project',
      component: newProjectPage
    },
    {
      path: '/existingProject',
      name: 'existingProject',
      component: existingProjectPage
    },

  ]
})

export default router