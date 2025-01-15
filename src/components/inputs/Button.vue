<template>
    <button
      :type="type"
      :class="[
        'text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center', // Clases base
        disabled
          ? 'bg-blue-600 opacity-50 cursor-not-allowed'
          : variantClasses, // Estilos según el estado habilitado/deshabilitado
        customClasses, // Clases personalizadas
      ]"
      :disabled="disabled"
    >
      <slot />
    </button>
  </template>
  
  <script setup>
  import { computed } from "vue";
  
  const props = defineProps({
    type: {
      type: String,
      default: "button", // Puede ser 'button', 'submit', o 'reset'
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: "primary", // Puede ser 'primary', 'secondary', etc.
    },
    customClasses: {
      type: String,
      default: "", // Clases adicionales opcionales
    },
  });
  
  const variantClasses = computed(() => {
    if (props.variant === "primary") {
      return "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";
    } else if (props.variant === "secondary") {
      return "bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800";
    }
    return ""; // Puedes agregar más variantes según necesidad
  });
  </script>
  
  <style>
  button:disabled {
    pointer-events: none; /* Evita la interacción con botones deshabilitados */
  }
  </style>
  