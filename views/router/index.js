import Vue from 'vue'
import Router from 'vue-router'

import usersPage from '../pages/users.vue'
import homePage from '../pages/home.vue'
import boardsPage from '../pages/boards.vue'
import newTaskPage from '../pages/newTask.vue'
import newProjectPage from '../pages/project.vue'
import existingProjectPage from '../pages/existingProject.vue'
import loginPage from '../pages/login.vue'

Vue.use(Router)

const router = new Router ({
  root: '/home',
  routes: 
  [
    {
      path: '/users',
      name: 'users',
      component: usersPage
    }, 
    {
      path: '/login',
      name: 'login',
      component: loginPage
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
   /*  {
      path: '/newTask',
      name: 'newTask',
      component: newTaskPage
    }, */
    {
      path: '/project',
      name: 'project',
      component: newProjectPage
    },
   /*  {
      path: '/existingProject',
      name: 'existingProject',
      component: existingProjectPage
    } */
  ]
})

export default router