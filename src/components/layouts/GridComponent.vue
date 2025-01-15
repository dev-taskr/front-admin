<template>
    <div
      class="grid gap-4 p-6 justify-center"
      :class="{
        'grid-cols-4': layout === 'left', // Cuatro columnas para la izquierda
        'grid-cols-2': layout === 'right', // Dos columnas para la derecha
      }"
    >
      <div
        v-for="(buttonsGrid, index) in limitedButtonsGrids"
        :key="index"
        @click="navigateTo(buttonsGrid.route)"
        class="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow hover:shadow-md transition cursor-pointer w-full max-w-[200px] bg-white dark:bg-gray-800"
      >
        <!-- Contenedor del ícono más grande -->
        <div class="w-20 h-20 flex items-center justify-center bg-teal-100 rounded-full">
          <span v-html="buttonsGrid.icon" class="text-teal-600 w-18 h-18"></span>
        </div>
        <p class="mt-4 text-teal-600 font-medium text-center text-lg">{{ buttonsGrid.name }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from "vue";
  import { useRouter } from "vue-router";
  
  // Props definidas
  const props = defineProps({
    buttonsGrids: {
      type: Array,
      required: true,
      default: () => [],
    },
    limit: {
      type: Number,
      required: false,
      default: null,
    },
    layout: {
      type: String, // "left" o "right"
      required: true,
    },
  });

    // Destructurar las props para usarlas directamente
    const { buttonsGrids, limit, layout } = props;
  
  // Computed para limitar las tareas
  const limitedButtonsGrids = computed(() => {
    return limit !== null ? buttonsGrids.slice(0, limit) : buttonsGrids;
  });
  
  // Router para redireccionar
  const router = useRouter();
  
  // Función para navegar a la ruta correspondiente
  const navigateTo = (route) => {
    if (route) {
      router.push(route);
    }
  };
  </script>
  