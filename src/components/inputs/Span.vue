<template>
    <span class="text-gray-700 dark:text-gray-300" :class="customClass">
        {{ html }}
    </span>
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
  