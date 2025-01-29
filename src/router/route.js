import { createRouter, createWebHistory } from 'vue-router';
import { useCompanyStore } from '@/stores/storeEmpresa.js'; // Importa el store
import Login from '@/views/Login.vue';
import Dashboard from '@/views/Dashboard.vue';
import Empresas from '@/views/empresas/Index.vue';
import EmpresasDetails from '@/views/empresas/Detail.vue';
import EmpresasDashboard from '@/views/empresas/pages/Dashboard.vue';
import EmpresasConfiguracion from '@/views/empresas/pages/Configuracion.vue';
import EmpresasZonasGeograficas from '@/views/empresas/pages/ZonasGeograficas.vue';
import EmpresasSucursalesEmpresa from '@/views/empresas/pages/SucursalesEmpresa.vue';
import EmpresasUsuariosEmpresa from '@/views/empresas/pages/UsuariosEmpresa.vue';
import EmpresasAreasTrabajo from '@/views/empresas/pages/AreasTrabajoEmpresa.vue';
import EmpresasTasks from '@/views/empresas/pages/TasksEmpresa.vue';

const routes = [
  { path: '/', name: 'Login', component: Login },
  { 
    path: '/dashboard', 
    name: 'Dashboard', 
    component: Dashboard, 
    /* meta: { requiresAuth: true }, */
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
    /* meta: { requiresAuth: true }, */
    props: true,
    children: [
      {
        path: '',
        redirect: '/empresas/detail/:id/empresadashboard',
      },
      {
        path: 'empresadashboard',
        name: 'EmpresaDashboard',
        component: EmpresasDashboard,
      },
      {
        path: "configuracion",
        name: "Configuracion",
        component: EmpresasConfiguracion,
      },
      {
        path: "zonasgeograficasempresa",
        name: "ZonasGeograficasEmpresa",
        component: EmpresasZonasGeograficas,
      },
      {
        path: "sucursalesempresa",
        name: "SucursalesEmpresa",
        component: EmpresasSucursalesEmpresa,
      },
      {
        path: "usuariosempresa",
        name: "UsuariosEmpresa",
        component: EmpresasUsuariosEmpresa,
      },
      {
        path: "areastrabajoempresa",
        name: "AreasTrabajoEmpresa",
        component: EmpresasAreasTrabajo,
      },
      { 
        path: 'tasksempresa', 
        name: 'TasksEmpresa', 
        component: EmpresasTasks,
      },
    ],
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
