<template>
  <BaseLayout>
    <!-- <h1 class="text-2xl font-bold mb-6">Bienvenido, {{ user?.name }}</h1> -->
    <div class="grid grid-cols-12 gap-6">
      <!-- Columna izquierda (8/12) -->
      <div class="col-span-12 lg:col-span-8">
        <GridComponent :buttonsGrids="buttonsGridsLeft" :limit="4" layout="left" />
      </div>

      <!-- Columna derecha (4/12) -->
      <div class="col-span-12 lg:col-span-4">
        <GridComponent :buttonsGrids="buttonsGridsRight" :limit="2" layout="right" />
      </div>
    </div>
  </BaseLayout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import BaseLayout from "@/components/layouts/Layout.vue";
import GridComponent from "@/components/layouts/GridComponent.vue";

const user = ref(null);

const buttonsGridsLeft = ref([
  { name: 'Empresas', route: '/tasks', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21v-2a4 4 0 014-4h10a4 4 0 014 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M16 11h6"></path><path d="M19 8v6"></path></svg>' },
  { name: 'Contratos', route: '/progress', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2h8a2 2 0 012 2v16a2 2 0 01-2 2H8a2 2 0 01-2-2V4a2 2 0 012-2z"></path><path d="M16 2v4H8V2"></path></svg>' },
  { name: 'Super Usuarios', route: '/reports', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 00-3-3.87"></path><path d="M16 3.13a4 4 0 010 7.75"></path></svg>' },
  { name: 'Configuraciones', route: '/settings', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 01.33 1.82l-1.09 1.91a1.65 1.65 0 01-2.13.73 1.65 1.65 0 00-1.82.33l-1.91 1.09a1.65 1.65 0 01-1.82-.33l-1.91-1.09a1.65 1.65 0 00-1.82-.33l-1.09 1.91a1.65 1.65 0 01-2.13.73 1.65 1.65 0 00-.33-1.82l1.09-1.91a1.65 1.65 0 01-.33-1.82L2.6 9.13a1.65 1.65 0 011.82-.73 1.65 1.65 0 001.82-.33l1.91-1.09a1.65 1.65 0 011.82.33l1.91 1.09a1.65 1.65 0 001.82-.33L15 2.6a1.65 1.65 0 011.82-.33 1.65 1.65 0 00.33 1.82l1.09 1.91a1.65 1.65 0 01.33 1.82l-1.09 1.91a1.65 1.65 0 00.33 1.82z"></path></svg>' },
]);

const buttonsGridsRight = ref([
  { name: 'Lista de Tareas', route: '/notifications', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 10h6"></path><path d="M9 14h6"></path><path d="M21 16v-2a4 4 0 00-3-3.87"></path><path d="M12 12a4 4 0 00-4 4v2"></path></svg>' },
  { name: 'Cumplimientos', route: '/statistics', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18v-6"></path><path d="M10 18V10"></path><path d="M14 18v-4"></path><path d="M18 18V8"></path></svg>' },
]);

onMounted(() => {
  const userData = localStorage.getItem("user");
  if (userData) {
    user.value = JSON.parse(userData);
  }
});
</script>
