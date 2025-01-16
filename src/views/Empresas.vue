<template>
  <BaseLayout :title="'Empresas'">
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Filters />
      <div class=" mx-auto"><!-- max-w-[1200px] -->
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div class="border-b pb-4 border-gray-200 dark:border-gray-700">
            <div class="flex items-center pl-4 pr-4">
              <div class="w-64 shrink-0">
                <h2 class="font-medium text-gray-700 dark:text-gray-300">Nombre Empresa</h2>
              </div>
              <div class="flex-1">
                <h2 class="font-medium text-gray-700 dark:text-gray-300">Razon Social</h2>
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
              :clickable="true"
              baseRoute="/empresas"
              :icons="getIconsForRow(row)"
              :typeSwitch="2"
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
    name: "Tech Innovators LLC",
    frequency: "Semanal",
    description: "Empresa dedicada al desarrollo de software y tecnología innovadora.",
    state: "failed",
  },
  {
    id: "202501130000002b",
    name: "EcoGreen Solutions",
    frequency: "Mensual",
    description: "Proveedor de soluciones sostenibles para energías renovables.",
    state: "completed",
  },
  {
    id: "202501130000003c",
    name: "Global Traders Co.",
    frequency: "Diaria",
    description: "Empresa especializada en importación y exportación de bienes de consumo.",
    state: "completed",
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
    svg: '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="white" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 512 512"><path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1-11 11.4-22.4 15.8-34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/></svg>',
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
        value: row.description,
        placeholder: "Ingresa la descripción",
      },
      {
        id: "state",
        name: "state",
        label: "Estado",
        type: "Switch",
        value: row.state,
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
