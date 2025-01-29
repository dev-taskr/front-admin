<template>
    <div class="w-full mx-auto  p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
      
      <!-- Componente FormDynamic -->
      <FormDynamic
        :title="'Configuración'"
        :config="formConfig"
        @update-dependent="handleUpdateDependent"
      />
  
      <!-- Modal Dynamic -->
      <ModalDynamic
        :title="modalTitle"
        :message="modalMessage"
        :show="isModalVisible"
        :config="modalConfig"
        @update:show="isModalVisible = $event"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted  } from "vue";
  import axios from "axios"; // Usaremos axios para cargar y guardar datos JSON
  import FormDynamic from "@/components/utils/FormDynamic.vue";
  import ModalDynamic from "@/components/utils/ModalDynamic.vue";
  import { useCompanyStore } from '@/stores/storeEmpresa';

  const companyStore = useCompanyStore();
  
  const rows = ref([]); // Aquí cargaremos los datos del archivo JSON
  const rowsWithStates = computed(() => rows.value);
  
  const isModalVisible = ref(false);
  const modalConfig = ref(null);
  const modalTitle = ref("");
  const modalMessage = ref("");
  const formConfig = ref(null);
  const isEditMode = ref(false);

  const fileName = "Empresas.json";
  const fileNameRegionesComunas = "RegionesComunas.json";

  const regionesComunas = ref([]);

  const loadRegionesComunas = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/data/${fileNameRegionesComunas}`);
      regionesComunas.value = response.data.regiones;

    } catch (error) {
      console.error('Error al cargar el archivo de regiones y comunas:', error);
    }
  };

  const handleUpdateDependent = ({ id, value }) => {
    if (id === "comuna") {
      // Encuentra la región seleccionada según el valor
      const regionSeleccionada = regionesComunas.value.find(
        (region) => region.numero === value
      );

      // Busca el campo dependiente 'comuna' y actualiza sus opciones
      const comunaField = modalConfig.value.fields.find((field) => field.id === "comuna");
      if (comunaField) {
        comunaField.options =
          regionSeleccionada?.comunas.map((comuna) => ({
            value: comuna,
            label: comuna,
          })) || [];
        comunaField.value = ""; // Resetea el valor seleccionado
      }
    }
  };
  
  // Cargar datos desde el archivo JSON
  const loadCompanies = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/data/${fileName}`);
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
      await axios.post(`http://localhost:3000/api/data/${fileName}`, uniqueRows); 
    } catch (error) {
      console.error("Error al guardar en el archivo JSON:", error);
    }
  };
  
  // Abrir modal para editar una empresa existente
  const loadFormCompanies = (row) => {
    isEditMode.value = true;
    const initialRegion = regionesComunas.value.find((region) => region.numero === row.region);
    
    formConfig.value = {
      message: "Edita los detalles de la empresa.",
      fields: [
        {
          id: "rut",
          name: "rut",
          label: "Rut",
          type: "text",
          value: row.rut,
          placeholder: "Ingresa el rut de la empresa",
        },
        {
          id: "name",
          name: "name",
          label: "Nombre",
          type: "text",
          value: row.name,
          placeholder: "Ingresa el nombre",
        },
        {
          id: "razon_social",
          name: "razon_social",
          label: "Razon Social",
          type: "text",
          value: row.razon_social,
          placeholder: "Ingresa la razon social de la empresa",
        },
        {
          id: "region",
          name: "region",
          label: "Region",
          type: "select",
          value: row.region,
          placeholder: "Seleccione",
          options: regionesComunas.value?.map((region) => ({
            value: region.numero,
            label: region.nombre,
          })) || [],         
          dependentId: "comuna",
        },
        {
          id: "comuna",
          name: "comuna",
          label: "Comuna",
          type: "select",
          value: row.comuna,
          options: initialRegion.comunas?.map((comuna) => ({
            value: comuna,
            label: comuna,
          })) || [],
          placeholder: "Seleccione", 
        },
        {
          id: "responsable",
          name: "responsable",
          label: "Responsable",
          type: "select",
          value: row.responsable,
          placeholder: "Seleccione",
        },
        {
          id: "state",
          name: "state",
          label: "Estado",
          type: "Switch",
          value: row.state,
          options: ["completed", "neutro", "failed"],
        },
        {
          id: "description",
          name: "description",
          label: "Descripción",
          type: "textarea",
          value: row.description,
          placeholder: "Ingresa la descripción",
        },
      ],
      buttons: [
        /* {
          id: "Cancelar",
          text: "Cancelar",
          type: "secondary",
          action: () => (isModalVisible.value = false),
        }, */
        {
          id: "Guardar",
          text: "Guardar",
          type: "primary",
          action: () => saveEditedCompany(row),
        },
      ],
    };
  
  };
  
  
  // Guardar cambios en una empresa existente
  const saveEditedCompany = async (row) => {
    const updatedCompany = formConfig.value.fields.reduce((acc, field) => {
      acc[field.name] = field.value;
      return acc;
    }, {});
    
    const index = rows.value.findIndex((r) => r.id === row.id);
    if (index !== -1) {
      rows.value[index] = { ...rows.value[index], ...updatedCompany };
    }
    
    await saveToJsonFile(); // Guardar en el archivo JSON
    isModalVisible.value = false;

    companyStore.setCompany(updatedCompany);

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
  
  const storedCompany = localStorage.getItem("selectedCompany");
  
  // Cargar los datos al montar el componente
  onMounted(async () => {
    await loadCompanies();
    await loadRegionesComunas();
    await loadFormCompanies(JSON.parse(storedCompany));
  });
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
  }
  </style>
  