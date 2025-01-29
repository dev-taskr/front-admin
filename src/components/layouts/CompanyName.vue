<template>
  <div class="text-center flex-grow">
    <span class="text-lg font-semibold">{{ companyData.name }}</span>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Obtenemos los datos desde localStorage
const storedCompany = localStorage.getItem("selectedCompany");
const companyData = ref(storedCompany ? JSON.parse(storedCompany) : { name: "" });

// Computed para las iniciales del nombre de la empresa
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
