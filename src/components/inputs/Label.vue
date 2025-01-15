<template>
    <label 
      :for="forId" 
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      <slot />
    </label>
  </template>
  
  <script setup>
  const props = defineProps({
    forId: {
      type: String,
      required: true,
    },
  });
  </script>
  