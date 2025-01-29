<template>
  <div
    :class="[ 
      'bg-gray-300 dark:bg-gray-800 flex flex-col justify-between transition-all rounded-r-md', 
      isCollapsed ? 'w-16' : 'w-64' 
    ]"
  >
    <!-- Botón de Colapso/Expansión -->
    <button
      @click="toggleSidebar"
      class="p-2 my-2 mx-auto bg-gray-500 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 rounded-md flex items-center justify-center transition-all"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <!-- Icono para el estado colapsado -->
        <path
          v-if="isCollapsed"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
        <!-- Icono para el estado expandido -->
        <path
          v-else
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 12h12"
        />
      </svg>
    </button>

    <!-- Header con Logo y Datos de la Empresa -->
    <div class="p-4 flex flex-col items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        :class="[isCollapsed ? 'w-8 h-8' : 'w-16 h-16', 'rounded-md bg-blue-500 text-white flex items-center justify-center']"
      >
        <circle cx="50" cy="50" r="50" fill="#1E3A8A" />
        <text
          x="50%"
          y="50%"
          text-anchor="middle"
          dy=".3em"
          fill="white"
          :font-size="isCollapsed ? '16' : '32'"
          font-weight="bold"
        >
          {{ initials }}
        </text>
      </svg>
      <span
        v-if="!isCollapsed"
        class="text-gray-900 dark:text-gray-100 font-bold text-center mt-2"
      >
        {{ companyData.name }}
      </span>
      <span
        v-if="!isCollapsed"
        class="text-gray-600 dark:text-gray-400 text-sm text-center"
      >
        Rut: {{ companyData.rut }}
      </span>
    </div>

    <!-- Información Adicional de la Empresa -->
    <div
      v-if="!isCollapsed"
      class="p-4 text-sm text-gray-600 dark:text-gray-400"
    >
      <p>Razón Social: {{ companyData.razon_social }}</p>
      <p>Responsable: {{ companyData.responsable }}</p>
      <p>Estado: {{ companyData.state }}</p>
    </div>

    <nav class="">
      <ul>
        <li
          @click="navigateTo(`/empresas/detail/${companyData.id}/empresadashboard`)"
          :class="[
            'flex items-center p-4 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700',
            route.path === `/empresas/detail/${companyData.id}/empresadashboard` ? 'bg-gray-300 dark:bg-gray-700' : ''
          ]"
        >
          <span class="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M32 6L6 30H14V58H26V42H38V58H50V30H58L32 6Z" />
              <path d="M32 6L6 30H14V58H26V42H38V58H50V30H58L32 6Z" />
            </svg>
          </span>
          <span v-if="!isCollapsed" class="ml-3">Inicio Empresa</span>
        </li>
        <li
          @click="navigateTo(`/empresas/detail/${companyData.id}/configuracion`)"
          :class="[
            'flex items-center p-4 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700',
            route.path === `/empresas/detail/${companyData.id}/configuracion` ? 'bg-gray-300 dark:bg-gray-700' : ''
          ]"
        >
          <span class="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="white" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 512 512"><path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1-11 11.4-22.4 15.8-34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/></svg>
          </span>
          <span v-if="!isCollapsed" class="ml-3">Configuración</span>
        </li>
      </ul>
    </nav>
    <hr class="border-gray-200 dark:border-gray-600 my-4">
    <!-- Menú -->
    <nav class="">
      <ul>
        <li
          v-for="item in menuItems"
          :key="item.label"
          @click="navigateTo(item.route)"
          :class="[
            'flex items-center p-4 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700',
            route.path === item.route ? 'bg-gray-300 dark:bg-gray-700' : ''
          ]"
        >
          <span v-html="item.icon" class="flex-shrink-0"></span>
          <span v-if="!isCollapsed" class="ml-3">{{ item.label }}</span>
        </li>
      </ul>
    </nav>
    <hr class="border-gray-200 dark:border-gray-600 my-4">
    <nav class="">
      <ul>
        <li
          @click="navigateTo(`/empresas/detail/${companyData.id}/tasksempresa`)"
          :class="[
            'flex items-center p-4 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700',
            route.path === `/empresas/detail/${companyData.id}/tasksempresa` ? 'bg-gray-300 dark:bg-gray-700' : ''
          ]"
        >
          <span class="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 10h6"></path><path d="M9 14h6"></path><path d="M21 16v-2a4 4 0 00-3-3.87"></path><path d="M12 12a4 4 0 00-4 4v2"></path></svg>
          </span>
          <span v-if="!isCollapsed" class="ml-3">Lista de Tareas</span>
        </li>
        <li
          
          :class="[
            'flex items-center p-4 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700'/* ,
            route.path === item.route ? 'bg-gray-300 dark:bg-gray-700' : '' */
          ]"
        >
          <span class="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18v-6"></path><path d="M10 18V10"></path><path d="M14 18v-4"></path><path d="M18 18V8"></path></svg>
          </span>
          <span v-if="!isCollapsed" class="ml-3">Cumplimientos</span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

function navigateTo(path) {
  router.push(path);
}

// Estado del sidebar (colapsado o expandido)
const isCollapsed = ref(false);

// Leer datos de la empresa desde localStorage
const storedCompany = localStorage.getItem("selectedCompany");
const companyDataRef = ref(storedCompany ? JSON.parse(storedCompany) : {});

// Datos de la empresa como un `computed` para compatibilidad
const companyData = computed(() => companyDataRef.value);

// Iniciales del nombre de la empresa
const initials = computed(() =>
  companyData.value.name
    ? companyData.value.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
    : ""
);

// Items del menú
const menuItems = [
  {
    label: "Zonas Geográficas",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 7a3 3 0 110 6 3 3 0 010-6zm0 8a7 7 0 00-6.93-6h13.86A7 7 0 0012 17z" />
           </svg>`,
    route: `/empresas/detail/${companyData.value.id}/zonasgeograficasempresa`,
  },
  {
    label: "Sucursales De La Empresa",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 11V3h6v8m-6 4h6m0 0v4m-6-4v4" />
           </svg>`,
    route: `/empresas/detail/${companyData.value.id}/sucursalesempresa`,
  },
  {
    label: "Usuarios De La Empresa",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A8.062 8.062 0 0112 15c2.133 0 4.099.839 5.879 2.117M15 10a3 3 0 10-6 0 3 3 0 006 0zm9 12a9 9 0 10-18 0h18z" />
           </svg>`,
    route: `/empresas/detail/${companyData.value.id}/usuariosempresa`,
  },
  {
    label: "Áreas de Trabajo",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A8.062 8.062 0 0112 15c2.133 0 4.099.839 5.879 2.117M15 10a3 3 0 10-6 0 3 3 0 006 0zm9 12a9 9 0 10-18 0h18z" />
           </svg>`,
    route: `/empresas/detail/${companyData.value.id}/areastrabajoempresa`,
  },
  /* {
    label: "Configuraciones",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15V9m-3 3h6" />
           </svg>`,
    route: `/empresas/detail/${companyData.value.id}/configuracion`,
  }, */
];

// Alternar el estado del sidebar
const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>


<style>
</style>
