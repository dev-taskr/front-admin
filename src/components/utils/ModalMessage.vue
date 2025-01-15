<template>
    <div
      v-if="isVisible"
      class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
    >
      <div class="bg-white rounded-lg shadow-lg w-96 p-6">
        <!-- Título -->
        <h3
          class="text-lg font-bold mb-2"
          :class="type === 'success' ? 'text-green-600' : 'text-red-600'"
        >
          {{ title }}
        </h3>
    
        <!-- Mensaje -->
        <p class="text-gray-700 mb-4">
          {{ message }}
        </p>
    
        <!-- Botón cerrar -->
        <div class="flex justify-end">
          <button
            @click="closeModal"
            class="px-4 py-2 rounded text-white"
            :class="type === 'success' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, defineEmits, defineProps } from "vue";
  
  // Definir props correctamente
  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "success", // 'success' o 'error'
    },
    show: {
      type: Boolean,
      required: true,
    },
  });
  
  // Emitir evento para cerrar el modal
  const emit = defineEmits(["update:show"]);
  
  // Controlar visibilidad interna
  const isVisible = ref(props.show);
  
  const closeModal = () => {
    isVisible.value = false;
    emit("update:show", false); // Emitir evento para actualizar la visibilidad
  };
  
  // Sincronizar visibilidad con la prop `show`
  watch(() => props.show, (newVal) => {
    isVisible.value = newVal;
  });
  </script>
  
  <style scoped>
  /* Estilos opcionales */
  </style>
  