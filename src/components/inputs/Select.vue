<template>
    <div class="w-full">
      <select
        v-model="field.value"
        :id="field.id || field.name"
        class="block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 sm:text-sm"
        @change="handleChange($event)"
      >
        <option disabled value="" hidden>
          {{ field.placeholder || "Seleccione una opción" }}
        </option>
        <option
          v-for="(option, index) in field.options"
          :key="index"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from "vue";
  
  const props = defineProps({
    field: {
      type: Object,
      required: true,
      default: () => ({
        id: "",
        name: "",
        label: "",
        placeholder: "",
        value: "",
        options: [],
        dependentId: null, // ID del select dependiente (opcional)
      }),
    },
  });
  
  const emit = defineEmits(["update-dependent"]);
  
  // Emitir evento al cambiar el valor
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    console.log(selectedValue);
  
    // Si tiene un campo dependiente, emite el valor seleccionado
    if (props.field.dependentId) {
      emit("update-dependent", { id: props.field.dependentId, value: selectedValue });
    }
  };
  </script>
  
  <style scoped>
  /* Estilos opcionales */
  </style>
  