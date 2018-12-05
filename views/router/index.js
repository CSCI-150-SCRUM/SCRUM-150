import Vue from 'vue'
import Router from 'vue-router'
import homePage from '../pages/home.vue'
import boardsPage from '../pages/boards.vue'
import newProjectPage from '../pages/project.vue'
import loginPage from '../components/login.vue'
import registerPage from '../components/register.vue'
import titlePage from '../pages/title.vue'
import existingProjectPage from '../pages/existingProject.vue'
import usersPage from '../pages/users.vue'
import emptyPage from '../pages/empty.vue'



Vue.use(Router)

const router = new Router({
  root: '/',
  routes: [{
      path: '/login',
      name: 'login',
      component: loginPage,
      props: true
    },
    {
      path: '/register',
      name: 'register',
      component: registerPage
    },
    {
      path: '/home',
      name: 'home',
      component: homePage,
      props: true
    },
    {
      path: '/',
      redirect: '/title'
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
    {
      path: '/title',
      name: 'title',
      component: titlePage
    },
    {
      path: '/users',
      name: 'users',
      component: usersPage
    },
    {
      path: '/empty',
      name: 'empty',
      component: emptyPage
    }
  ]
})

export default router