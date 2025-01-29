<template>
  <BaseLayout >
    <Filters
      :dashboard="true"
      :ircumplimiento="false"
      :back="true"
      :sucursal="false"
      :search="false"
      :periodo="false"
    />
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div class="flex">
        <!-- Sidebar -->
        <SidebarComponent class="sidebar"/>

        <!-- Main Content -->
        <div class="flex-1 ml-4">
           <router-view :cards="cardsData" :posts="posts"/>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup>
  import { ref } from "vue";
  import BaseLayout from "@/components/layouts/Layout.vue";
  import SidebarComponent from "@/views/empresas/components/Sidebar.vue";
  import Filters from "@/components/utils/Filters.vue";


  // Declaramos los datos reactivos directamente
  const cardsData = ref([
    { id: 1, title: "Usuarios", value: 1200, unit: "", trend: 5 },
    { id: 2, title: "Ventas", value: 3200, unit: "€", trend: -2 },
    { id: 3, title: "Suscripciones", value: 800, unit: "", trend: 10 },
    { id: 4, title: "Tasa de conversión", value: "3.5", unit: "%", trend: 1 },
  ]);

  const posts = [
    { title: 'prueba 1', content: "Este es un mensaje", date: "29-01-2025" },
    { title: 'prueba 2', content: "Otro mensaje", date: "28-01-2025" },
  ];
</script>

<style>
  .sidebar{
    height: 810px;
  }
</style>
