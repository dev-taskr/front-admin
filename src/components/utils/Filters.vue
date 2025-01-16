<template>
    <div :class="theme" class="flex items-center justify-between p-4 mb-4">
      <!-- Botones -->
      <div class="flex gap-4">
        <button class="px-4 py-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 dark:bg-teal-700 dark:hover:bg-teal-800">
          Inicio
        </button>
        <button class="px-4 py-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 dark:bg-teal-700 dark:hover:bg-teal-800">
          Ir a Cumplimiento
        </button>
        <button class="px-4 py-2 bg-teal-500 text-white rounded-full flex items-center gap-2 hover:bg-teal-600 dark:bg-teal-700 dark:hover:bg-teal-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Atrás
        </button>
      </div>
  
      <!-- Selector de sucursal -->
      <div class="flex items-center gap-2">
        <label for="sucursal" class="text-gray-700 dark:text-gray-300">Sucursal:</label>
        <div class="relative">
          <select
            id="sucursal"
            class="appearance-none border border-gray-300 rounded-full py-2 pl-3 pr-8 bg-white focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:ring-teal-400"
            v-model="selectedSucursal"
          >
            <option value="sucursal1">Sucursal 1</option>
            <option value="sucursal2">Sucursal 2</option>
            <option value="sucursal3">Sucursal 3</option>
          </select>
        </div>
      </div>
  
      <!-- Campo de fecha -->
      <div class="flex items-center gap-2">
        <label for="periodo" class="text-gray-700 dark:text-gray-300">Periodo:</label>
        <input
          type="date"
          id="periodo"
          class="border border-gray-300 rounded-full p-2 focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:ring-teal-400"
          v-model="selectedDate"
        />
      </div>
  
      <!-- Botón de búsqueda -->
      <button
        class="p-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 dark:bg-teal-700 dark:hover:bg-teal-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-4.35-4.35M18 10a8 8 0 11-16 0 8 8 0 0116 0z"
          />
        </svg>
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  // Variables reactivas
  const selectedDate = ref("");
  const selectedSucursal = ref("sucursal1");
  
  // Tema (claro/oscuro automático según la clase en el <html>)
  const theme = ref("light");
  </script>
  
  <style scoped>
  /* Estilo adicional para transiciones */
  :global(.dark) {
    transition: background-color 0.3s, color 0.3s;
  }
  </style>
  