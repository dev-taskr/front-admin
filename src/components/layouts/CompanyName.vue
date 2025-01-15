<template>
    <div class="text-center flex-grow">
      <span class="text-lg font-semibold">{{ companyName }}</span>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    companyName: {
      type: String,
      required: true
    }
  });
  </script>
  
  <style scoped>
  /* Estilos opcionales */
  </style>
  