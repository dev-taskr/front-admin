<template>
    <component :is="level" class="font-bold text-gray-800 dark:text-gray-100" :class="customClass">
        {{ html }}
    </component>
  </template>
  
  <script setup>
  import { ref, watch, defineEmits, defineProps } from "vue";
  
  const props = defineProps({
    level: {
      type: String,
      default: "h1", // Define el nivel del encabezado (h1, h2, h3, etc.)
    },
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
  