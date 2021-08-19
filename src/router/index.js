import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    meta: { guestOnly: true },
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    meta: { guestOnly: true },
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: { authOnly: true },
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/vijesti',
    name: 'Articles',
    meta: { authOnly: true },
    component: () => import('../views/Articles.vue')
  },
  {
    path: '/korisnici',
    name: 'Users',
    meta: { authOnly: true },
    component: () => import('../views/Users.vue')
  },
  {
    path: '/komentari',
    name: 'Comments',
    meta: { authOnly: true },
    component: () => import('../views/Comments.vue')
  },
  {
    path: '/kategorije',
    name: 'Categories',
    meta: { authOnly: true },
    component: () => import('../views/Categories.vue')
  },
  {
    path: '/vijesti/uredi/:id',
    name: 'ArticleEdit',
    meta: { authOnly: true },
    component: () => import('../views/ArticleEdit.vue')
  },
  {
    path: '/vijesti/kreiraj/',
    name: 'ArticleCreate',
    meta: { authOnly: true },
    component: () => import('../views/ArticleCreate.vue')
  },
  {
    path: '/permisije',
    name: 'Permissions',
    meta: { authOnly: true },
    component: () => import('../views/Permissions.vue')
  },
  {
    path: '/role',
    name: 'Roles',
    meta: { authOnly: true },
    component: () => import('../views/Roles.vue')
  }
  /*
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/About.vue')
  }
  */
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

function isLoggedIn() {
  return localStorage.getItem("auth");
}


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authOnly)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isLoggedIn()) {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.guestOnly)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (isLoggedIn()) {
      next({
        path: "/dashboard",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router
