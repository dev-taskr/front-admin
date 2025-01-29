<template>
    <div
      class="p-4 bg-gray-300 dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow rounded-lg mb-6 max-h-40 overflow-y-auto"
    >
      <div
        v-for="(message, index) in posts"
        :key="index"
        class="flex justify-between items-center mb-2 last:mb-0"
      >
        <!-- Contenedor de fecha y mensaje -->
        <div class="flex items-center">
          <!-- Fecha -->
          <span class="text-sm text-gray-500 dark:text-gray-400 mr-4">
            {{ message.date }}
          </span>
          <!-- title -->
          <span class="text-sm text-gray-500 dark:text-white mr-4">
            {{ message.title }}
          </span>
          <!-- Mensaje -->
          <p class="truncate max-w-full">
            {{ message.content }}
          </p>
        </div>

        <!-- Botón -->
        <button
          @click="viewMessage(index)"
          class="ml-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          Leer más
        </button>
      </div>
    </div>

    <!-- Modal Dynamic -->
    <ModalDynamic
        :title="modalTitle"
        :message="modalMessage"
        :show="isModalVisible"
        :config="modalConfig"
        
    /><!-- @update-dependent="handleUpdateDependent"
        @update:show="isModalVisible = $event" -->
</template>

<script setup>
    import { ref, defineProps } from "vue";
    import ModalDynamic from "@/components/utils/ModalDynamic.vue";

    const props = defineProps({
        posts: {
            type: Object,
            required: true,
        },
    });

    const isModalVisible = ref(false);
    const modalConfig = ref(null);
    const modalTitle = ref("");
    const modalMessage = ref("");
    const isEditMode = ref(false);

    const viewMessage = (index) => {
        const post = props.posts[index];

        isEditMode.value = true;
        
        modalTitle.value = "Noticia";
        
        modalConfig.value = {
            fields: [
                {
                    id: "title",
                    name: "title",
                    type: "h",
                    level: "h1",
                    html: post.title,
                    customClass: "text-center"
                },
                {
                    id: "message",
                    name: "message",
                    type: "p",
                    html: post.content,
                },
                /* {
                    id: "rut",
                    name: "rut",
                    label: "Rut",
                    type: "text",
                    value: row.rut,
                    placeholder: "Ingresa el rut",
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
                    placeholder: "Ingresa la razon social",
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
                    id: "description",
                    name: "description",
                    label: "Descripción",
                    type: "textarea",
                    value: row.description,
                    placeholder: "Ingresa la descripción",
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
                }, */
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
                action: () => saveEditedModal(row),
                },
            ],
        };
    
        isModalVisible.value = true;
    };
</script>