import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Dashboard from '@/views/Dashboard.vue';
import Empresas from '@/views/Empresas.vue';
import Tasks from '@/views/Tasks.vue';

const routes = [
  { path: '/', name: 'Login', component: Login },
  { 
    path: '/dashboard', 
    name: 'Dashboard', 
    component: Dashboard, 
    /* meta: { requiresAuth: true }, */ // Marca esta ruta como protegida
  },
  { 
    path: '/empresas', 
    name: 'Empresas', 
    component: Empresas, 
    /* meta: { requiresAuth: true }, */ // Marca esta ruta como protegida
  },
  { 
    path: '/tasks', 
    name: 'Tasks', 
    component: Tasks, 
    /* meta: { requiresAuth: true }, */ // Marca esta ruta como protegida
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Agrega la guardia de navegación global
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user')); // Obtén el usuario del localStorage
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Si la ruta requiere autenticación y no hay usuario, redirige a Login
    if (!user) {
      next({ path: '/' });
    } else {
      next(); // Si el usuario está autenticado, permite el acceso
    }
  } else {
    next(); // Si la ruta no requiere autenticación, permite el acceso
  }
});

export default router;
