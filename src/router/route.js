import { createRouter, createWebHistory } from 'vue-router';
import { useCompanyStore } from '@/stores/storeEmpresa.js'; // Importa el store
import Login from '@/views/Login.vue';
import Dashboard from '@/views/Dashboard.vue';
import Empresas from '@/views/empresas/Index.vue';
import EmpresasDetails from '@/views/empresas/Detail.vue';
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
    /* meta: { requiresAuth: true }, */
  },
  { 
    path: '/empresas/detail/:id', 
    name: 'EmpresasDetail', 
    component: EmpresasDetails, 
    props: true,
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
  // Obtén el usuario del localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  
  // Guarda la ruta anterior en localStorage
  if (from.path) {
    localStorage.setItem('previousRoute', from.path);
  }

  const companyStore = useCompanyStore(); // Asegúrate de que el store esté disponible

  // Limpia el nombre de la empresa si no estamos en rutas relacionadas con empresas
  if (!to.path.includes('/empresas/')) {
    companyStore.setCompany(""); // Limpia la empresa seleccionada
  }

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
