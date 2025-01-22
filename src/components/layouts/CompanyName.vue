<template>
    <div class="text-center flex-grow">
      <span class="text-lg font-semibold">{{ companyData.name }}</span>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCompanyStore } from "@/stores/storeEmpresa.js";

// Acceso al store de Pinia
const companyStore = useCompanyStore();

// Datos de la empresa desde el store
const companyData = computed(() => companyStore.selectedCompany);

// Iniciales del nombre de la empresa
const initials = computed(() =>
  companyData.value.name
    ? companyData.value.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
    : ""
);
</script>
  
  <style scoped>
  /* Estilos opcionales */
  </style>
  