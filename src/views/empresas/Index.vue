<template>
    <BaseLayout :title="'Lista de Empresas'">
      <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Filters :dashboard="true" :ircumplimiento="true" :back="true" :sucursal="true" :search="true" :periodo="true"/>
        <div class="mx-auto">
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div class="border-b pb-4 border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h1 class="text-xl font-semibold text-gray-700 dark:text-gray-300">
                Empresas
              </h1>
              <button
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                @click="openModalToAddCompany"
              >
                Agregar Empresa
              </button>
            </div>
            <div class="grid grid-cols-1 gap-6 mt-6">
              <Table
                v-for="row in rowsWithStates"
                :key="row.id"
                :item="row"
                :clickable="true"
                baseRoute="/empresas/detail"
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
        :title="modalTitle"
        :message="modalMessage"
        :show="isModalVisible"
        :config="modalConfig"
        @update:show="isModalVisible = $event"
      />
    </BaseLayout>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from "vue";
  import axios from "axios"; // Usaremos axios para cargar y guardar datos JSON
  import BaseLayout from "@/components/layouts/Layout.vue";
  import Table from "@/components/utils/Table.vue";
  import ModalDynamic from "@/components/utils/ModalDynamic.vue";
  import Filters from "@/components/utils/Filters.vue";
  /* import empresasData from "@/jsons/empresas.json"; */
  
  // Variables reactivas
  const rows = ref([]); // Aquí cargaremos los datos del archivo JSON
  const rowsWithStates = computed(() => rows.value);
  
  const isModalVisible = ref(false);
  const modalConfig = ref(null);
  const modalTitle = ref("");
  const modalMessage = ref("");
  const isEditMode = ref(false);
  
  // Cargar datos desde el archivo JSON
  const loadCompanies = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/data");
      rows.value = response.data;
    } catch (error) {
      console.error("Error al cargar el archivo JSON:", error);
    }
  };
  
  // Guardar datos en el archivo JSON
  const saveToJsonFile = async () => {
    try {
      // Verificar que rows.value no tenga duplicados
      const uniqueRows = [...new Set(rows.value.map(item => item.id))].map(id => 
        rows.value.find(item => item.id === id)
      );
  
      console.log('Enviando los siguientes datos al servidor:', uniqueRows);
      await axios.post("http://localhost:3000/api/data", uniqueRows); 
    } catch (error) {
      console.error("Error al guardar en el archivo JSON:", error);
    }
  };
  
  
  // Abrir modal para agregar una nueva empresa
  const openModalToAddCompany = () => {
    isEditMode.value = false;
    modalTitle.value = "Agregar Empresa";
    
    modalConfig.value = {
      message: "Completa los datos para agregar una nueva empresa.",
      fields: [
        {
          id: "name",
          name: "name",
          label: "Nombre",
          type: "text",
          value: "",
          placeholder: "Ingresa el nombre de la empresa",
        },
        {
          id: "description",
          name: "description",
          label: "Descripción",
          type: "textarea",
          value: "",
          placeholder: "Ingresa la descripción de la empresa",
        },
        {
          id: "state",
          name: "state",
          label: "Estado",
          type: "Switch",
          value: "completed",
          options: ["completed", "neutro", "failed"],
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
          action: saveNewCompany,
        },
      ],
    };
  
    isModalVisible.value = true;
  };
  
  // Abrir modal para editar una empresa existente
  const openModalForRow = (row) => {
    isEditMode.value = true;
    modalTitle.value = "Editar Empresa";
    
    modalConfig.value = {
      message: "Edita los detalles de la empresa.",
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
          options: ["completed", "neutro", "failed"],
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
          action: () => saveEditedCompany(row),
        },
      ],
    };
  
    isModalVisible.value = true;
  };
  
  // Guardar nueva empresa
  const saveNewCompany = async () => {
    const newCompany = modalConfig.value.fields.reduce((acc, field) => {
      acc[field.name] = field.value;
      return acc;
    }, {});
  
    newCompany.id = Date.now().toString(); // Generar un ID único
    rows.value.push(newCompany);
    await saveToJsonFile(); // Guardar en el archivo JSON
    isModalVisible.value = false;
    
    setTimeout(() => {
      modalConfig.value = null; // Limpiar la configuración del modal dinámico
      modalTitle.value = "Registro de Empresa";
      modalConfig.value = {
        message: "Empresa registrada exitosamente.",
        buttons: [
          {
            id: "Cerrar",
            text: "Cerrar",
            type: "secondary",
            action: () => (isModalVisible.value = false),
          }
        ],
      };
      isModalVisible.value = true; // Abrir el modal de mensaje
    }, 300);
  };
  
  // Guardar cambios en una empresa existente
  const saveEditedCompany = async (row) => {
    const updatedCompany = modalConfig.value.fields.reduce((acc, field) => {
      acc[field.name] = field.value;
      return acc;
    }, {});
  
    const index = rows.value.findIndex((r) => r.id === row.id);
    if (index !== -1) {
      rows.value[index] = { ...rows.value[index], ...updatedCompany };
    }
  
    console.log(rows);
  
    await saveToJsonFile(); // Guardar en el archivo JSON
    isModalVisible.value = false;
  
    setTimeout(() => {
      modalConfig.value = null; // Limpiar la configuración del modal dinámico
      modalTitle.value = "Registro de Empresa";
      modalConfig.value = {
        message: "Empresa editada exitosamente.",
        buttons: [
          {
            id: "Cerrar",
            text: "Cerrar",
            type: "secondary",
            action: () => (isModalVisible.value = false),
          }
        ],
      };
      isModalVisible.value = true; // Abrir el modal de mensaje
    }, 300);
  };
  
  // Configurar íconos dinámicos
  const getIconsForRow = (row) => [
    {
      svg: '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="white" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 512 512"><path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1-11 11.4-22.4 15.8-34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/></svg>',
      action: () => openModalForRow(row),
    },
  ];
  
  // Actualizar el estado de las filas
  const updateRowStatus = async ({ id, state }) => {
    const index = rows.value.findIndex((row) => row.id === id);
    if (index !== -1) {
      rows.value[index].state = state;
    }
    await saveToJsonFile(); // Guardar en el archivo JSON
  
    setTimeout(() => {
      modalConfig.value = null; // Limpiar la configuración del modal dinámico
      modalTitle.value = "Alerta";
      modalConfig.value = {
        message: "Estado modificado.",
        buttons: [
          {
            id: "Cerrar",
            text: "Cerrar",
            type: "secondary",
            action: () => (isModalVisible.value = false),
          }
        ],
      };
      isModalVisible.value = true; // Abrir el modal de mensaje
    }, 300);
  };
  
  // Cargar los datos al montar el componente
  onMounted(loadCompanies);
  
  </script>
  