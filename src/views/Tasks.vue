<template>
    <BaseLayout :title="'Lista de Tareas'">
      <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Filters />
        <div class=" mx-auto"><!-- max-w-[1200px] -->
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div class="border-b pb-4 border-gray-200 dark:border-gray-700">
              <div class="flex items-center pl-4 pr-4">
                <div class="w-64 shrink-0">
                  <h2 class="font-medium text-gray-700 dark:text-gray-300">Tareas</h2>
                </div>
                <div class="flex-1">
                  <h2 class="font-medium text-gray-700 dark:text-gray-300">Descripción Corta</h2>
                </div>
                <div class="flex items-center gap-16">
                  <h2 class="font-medium text-gray-700 dark:text-gray-300 w-20 text-center">Estado</h2>
                  <h2 class="font-medium text-gray-700 dark:text-gray-300 w-20 text-center">Evidencia</h2>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1 gap-6 mt-6">
              <Table
                v-for="row in rowsWithStates"
                :key="row.id"
                :item="row"
                :clickable="false"
                baseRoute="/empresas"
                :icons="getIconsForRow(row)"
                :typeSwitch="3"
                @update:status="updateRowStatus"
              />
            </div>
          </div>
        </div>
      </div>
  
      <!-- Modal Dynamic -->
      <ModalDynamic
        :title="''"
        :message="''"
        :show="isModalVisible"
        :config="modalConfig"
        @update:show="isModalVisible = $event"
      />
    </BaseLayout>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import BaseLayout from "@/components/layouts/Layout.vue";
  import Table from "@/components/utils/Table.vue";
  import ModalDynamic from "@/components/utils/ModalDynamic.vue"; // Importar el modal dinámico
  import Filters from "@/components/utils/Filters.vue";
  
    const rows = ref([
        {
            id: "202501130000001a",
            title: "Actualizar sistema de Tech Innovators LLC",
            frequency: "Semanal",
            details: "Revisar y actualizar el software desarrollado por la empresa Tech Innovators LLC.",
            status: "failed",
            images: [
            "https://via.placeholder.com/300?text=Tech+Innovators+1",
            "https://via.placeholder.com/300?text=Tech+Innovators+2"
            ],
        },
        {
            id: "202501130000002b",
            title: "Revisión mensual de EcoGreen Solutions",
            frequency: "Mensual",
            details: "Analizar los informes de sostenibilidad y progreso en energías renovables de EcoGreen Solutions.",
            status: "completed",
            images: [
            "https://via.placeholder.com/300?text=EcoGreen+1",
            "https://via.placeholder.com/300?text=EcoGreen+2",
            "https://via.placeholder.com/300?text=EcoGreen+3"
            ],
        },
        {
            id: "202501130000003c",
            title: "Coordinación diaria con Global Traders Co.",
            frequency: "Diaria",
            details: "Supervisar y coordinar actividades de importación y exportación con Global Traders Co.",
            status: "completed",
            images: [
            "https://via.placeholder.com/300?text=Global+Traders+1"
            ],
        },
    ]);



  
  const rowsWithStates = computed(() => rows.value);
  
  const isModalVisible = ref(false); // Controla la visibilidad del modal
  const modalConfig = ref(null); // Configuración dinámica del modal
  
  // Actualizar el estado de las filas
  const updateRowStatus = ({ id, state }) => {
    const index = rows.value.findIndex((row) => row.id === id);
    if (index !== -1) {
      rows.value[index].state = state;
    }
  };
  
  // Configurar íconos dinámicos con acciones que abren el modal
  const getIconsForRow = (row) => [
    {
      svg: '<svg xmlns="http://www.w3.org/2000/svg"  class="w-5 h-5" fill="white" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M448 80c8.8 0 16 7.2 16 16l0 319.8-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3L48 96c0-8.8 7.2-16 16-16l384 0zM64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>',
      action: () => openModalForRow(row),
    },
    {
      svg: '<svg xmlns="http://www.w3.org/2000/svg"  class="w-5 h-5" fill="white" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M160 368c26.5 0 48 21.5 48 48l0 16 72.5-54.4c8.3-6.2 18.4-9.6 28.8-9.6L448 368c8.8 0 16-7.2 16-16l0-288c0-8.8-7.2-16-16-16L64 48c-8.8 0-16 7.2-16 16l0 288c0 8.8 7.2 16 16 16l96 0zm48 124l-.2 .2-5.1 3.8-17.1 12.8c-4.8 3.6-11.3 4.2-16.8 1.5s-8.8-8.2-8.8-14.3l0-21.3 0-6.4 0-.3 0-4 0-48-48 0-48 0c-35.3 0-64-28.7-64-64L0 64C0 28.7 28.7 0 64 0L448 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64l-138.7 0L208 492z"/></svg>',
      action: () => openModalForRow(row),
    },
  ];
  
  // Función para abrir el modal dinámico
  const openModalForRow = (row) => {
    
    modalConfig.value = {
      title: "Detalles de Global Traders Co.",
      description: "Edita los detalles de la empresa.",
      fields: [
        {
          id: "name",
          name: "name",
          label: "Nombre",
          type: "text",
          value: row.name,
          placeholder: "Ingresa el nombre",
        },
        {
          id: "description",
          name: "description",
          label: "Descripción",
          type: "textarea",
          value: "Empresa especializada en importación...",
          placeholder: "Ingresa la descripción",
        },
        {
          id: "state",
          name: "state",
          label: "Estado",
          type: "SwitchThreePhase",
          value: "completed",
          options: ["completed", "neutro", "failed"], // Opciones para el switch
        },
      ],
      buttons: [
        {
          id: "Cancelar",
          text: "Cancelar",
          type: "secondary",
          action: () => (isModalVisible.value = false),
        },
        {
          id: "Guardar",
          text: "Guardar",
          type: "primary",
          action: () => {
            console.log("Guardando cambios...");
            isModalVisible.value = false;
          },
        },
      ],
    };
  
  
    isModalVisible.value = true;
  };
  </script>
  