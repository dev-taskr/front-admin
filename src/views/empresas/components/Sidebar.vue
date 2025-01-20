<template>
    <div
      :class="[ 
        'bg-gray-200 dark:bg-gray-800 flex flex-col justify-between transition-all rounded-r-md', 
        isCollapsed ? 'w-16' : 'w-64' 
      ]"
    >
      <!-- Botón de Colapso/Expansión -->
      <button
        @click="toggleSidebar"
        class="p-2 my-2 mx-auto bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 rounded-md flex items-center justify-center transition-all"
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
          {{ companyName }}
        </span>
        <span
          v-if="!isCollapsed"
          class="text-gray-600 dark:text-gray-400 text-sm text-center"
        >
          ID: 76745631-K
        </span>
      </div>
  
      <!-- Información Adicional de la Empresa -->
      <div
        v-if="!isCollapsed"
        class="p-4 text-sm text-gray-600 dark:text-gray-400"
      >
        <p>Razón Social: Sin Usuarios</p>
        <p>Creado el: 06/12/2024</p>
        <p>Zona: Algarrobo</p>
      </div>
  
      <!-- Menú -->
      <nav class="mt-4">
        <ul>
          <li
            v-for="item in menuItems"
            :key="item.label"
            class="flex items-center p-4 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer"
          >
            <span v-html="item.icon" class="flex-shrink-0"></span>
            <span v-if="!isCollapsed" class="ml-3">{{ item.label }}</span>
          </li>
        </ul>
      </nav>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  
  const isCollapsed = ref(false);
  const companyName = "Empresa Nueva";
  
  // Computed para obtener las iniciales
  const initials = computed(() =>
    companyName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
  );
  
  const menuItems = [
    {
      label: "Zonas Geográficas",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 7a3 3 0 110 6 3 3 0 010-6zm0 8a7 7 0 00-6.93-6h13.86A7 7 0 0012 17z" />
             </svg>`,
    },
    {
      label: "Sucursales De La Empresa",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 11V3h6v8m-6 4h6m0 0v4m-6-4v4" />
             </svg>`,
    },
    {
      label: "Usuarios De La Empresa",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A8.062 8.062 0 0112 15c2.133 0 4.099.839 5.879 2.117M15 10a3 3 0 10-6 0 3 3 0 006 0zm9 12a9 9 0 10-18 0h18z" />
             </svg>`,
    },
    {
      label: "Configuraciones",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15V9m-3 3h6" />
             </svg>`,
    },
  ];
  
  const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value;
  };
  </script>
  
  <style>
  </style>
  