<template>
    <BaseLayout>
        <div class="min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
            <div class="max-w-[1100px] mx-auto px-4">
                <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                    <div class="border-b pb-4 border-gray-200 dark:border-gray-700">
                        <div class="flex items-center">
                            <!-- Columna Tareas -->
                            <div class="w-64 shrink-0">
                                <h2 class="font-medium text-gray-700 dark:text-gray-300">Tareas</h2>
                            </div>
                            <!-- Columna Descripción Corta -->
                            <div class="flex-1">
                                <h2 class="font-medium text-gray-700 dark:text-gray-300">Descripción Corta</h2>
                            </div>
                            <!-- Columna Estado y Evidencia con espaciado aumentado -->
                            <div class="flex items-center gap-16">
                                <h2 class="font-medium text-gray-700 dark:text-gray-300 w-20 text-center">Estado</h2>
                                <h2 class="font-medium text-gray-700 dark:text-gray-300 w-20 text-center">Evidencia</h2>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 gap-6 mt-6">
                        <!-- Renderización de la tabla genérica -->
                        <Table
                            v-for="row in rowsWithStates"
                            :key="row.id"
                            :item="row"
                            :clickable="true"
                            baseRoute="/tasks"
                            @update:status="updateRowStatus"
                        />
                    </div>
                </div>
            </div>
        </div>
    </BaseLayout>
</template>

  
  <script setup>
  import { ref, computed } from "vue";
  import BaseLayout from "../components/layouts/Layout.vue";
  import Table from "../components/utils/Table.vue";
  
  // Estado inicial de las filas
  const rows = ref([
    {
      id: "202410080000002e",
      name: "Elemento 1",
      frequency: "1 vez al día",
      description: "Descripción del elemento 1.",
      state: "completed",
    },
    {
      id: "202410090000003e",
      name: "Elemento 2",
      frequency: "1 vez al día",
      description: "Descripción del elemento 2.",
      state: "failed",
    },
    {
      id: "202410100000003e",
      name: "Elemento 3",
      frequency: "1 vez al día",
      description: "Descripción del elemento 3.",
      state: "completed",
    },
  ]);
  
  // Computar el estado de las filas
  const rowsWithStates = computed(() => rows.value);
  
  // Función para actualizar el estado de una fila
  const updateRowStatus = ({ id, state }) => {
    const index = rows.value.findIndex((row) => row.id === id);
    if (index !== -1) {
      rows.value[index].state = state;
    }
  };
  </script>
  