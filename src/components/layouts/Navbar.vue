<template>
  <nav
    class="py-4 px-6 bg-gray-800 text-white dark:bg-gray-700 dark:text-gray-200"
  >
    <!-- Contenedor centrado y con ancho máximo -->
    <div class="max-w-[1200px] mx-auto flex justify-between items-center w-full">
      <!-- Logo -->
      <div class="logo">
        <Logo />
      </div>

      <!-- Nombre de Empresa -->
      <CompanyName :companyName="companyStore.selectedCompany.name" />

      <!-- Componente Dropdown -->
      <Dropdown>
        <!-- Botón personalizado -->
        <template #button-content>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5.121 17.804A9.969 9.969 0 0112 15c2.257 0 4.318.746 5.879 2.004M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>{{ username }}</span>
        </template>
      </Dropdown>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Logo from "@/components/layouts/Logo.vue";
import Dropdown from "@/components/layouts/Dropdown.vue";
import CompanyName from "@/components/layouts/CompanyName.vue"; // Importamos el nuevo componente
import { useCompanyStore } from '@/stores/storeEmpresa';

const router = useRouter();
const username = ref("Usuario");
const companyStore = useCompanyStore(); 

const logout = () => {
  localStorage.removeItem("user");
  router.push("/");
};
</script>

<style scoped>
/* Estilos opcionales */
</style>
