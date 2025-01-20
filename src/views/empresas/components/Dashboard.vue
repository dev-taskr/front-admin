<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="card in cards"
        :key="card.id"
        class="p-4 bg-white dark:bg-gray-800 shadow rounded-lg flex flex-col items-center transition-colors duration-300"
      >
        <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300">
          {{ card.title }}
        </h3>
        <p class="text-4xl font-bold text-blue-500 dark:text-blue-400 mt-2">
          {{ card.value }}
          <span v-if="card.unit" class="text-xl font-medium text-gray-500 dark:text-gray-400">
            {{ card.unit }}
          </span>
        </p>
        <p
          :class="[
            'mt-2 text-sm font-medium',
            card.trend > 0 ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'
          ]"
        >
          {{ card.trend > 0 ? '+' : '' }}{{ card.trend }}%
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, defineProps, defineEmits } from "vue";

  // Declaramos las props directamente en `script setup`
  const props = defineProps({
    cards: {
      type: Array,
      required: true,
    },
  });
  </script>
  
  <style scoped>
  /* Estilos personalizados para las tarjetas */
  </style>
  