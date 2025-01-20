<template>
  <BaseLayout >
    <Filters :dashboard="true" :ircumplimiento="false" :back="true" :sucursal="false" :search="true" :periodo="false"/>
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div class="flex">
        <!-- Sidebar -->
        <SidebarComponent />

        <!-- Main Content -->
        <div class="flex-1 ml-4">
          <!-- <TableComponent /> -->
          <DashboardCards :cards="cardsData" />
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup>
  import { ref } from "vue";
  import BaseLayout from "@/components/layouts/Layout.vue";
  import SidebarComponent from "@/views/empresas/components/Sidebar.vue";
  import DashboardCards from "@/views/empresas/components/Dashboard.vue";
  /* import TableComponent from "@/components/utils/Table.vue"; */
  import Filters from "@/components/utils/Filters.vue";


  // Declaramos los datos reactivos directamente
  const cardsData = ref([
    { id: 1, title: "Usuarios", value: 1200, unit: "", trend: 5 },
    { id: 2, title: "Ventas", value: 3200, unit: "€", trend: -2 },
    { id: 3, title: "Suscripciones", value: 800, unit: "", trend: 10 },
    { id: 4, title: "Tasa de conversión", value: "3.5", unit: "%", trend: 1 },
  ]);
</script>
