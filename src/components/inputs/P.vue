<template>
    <p class="text-gray-700 dark:text-gray-300 mb-4" :class="customClass">
        {{ html }}
    </p>
  </template>
  
  <script setup>
  import { ref, watch, defineEmits, defineProps } from "vue";
  
  const props = defineProps({
    customClass: {
      type: String,
      default: "", // Clases adicionales para personalización
    },
    html: {
      type: String,
      default: "", // Clases adicionales para personalización
    },
  });
  </script>
  