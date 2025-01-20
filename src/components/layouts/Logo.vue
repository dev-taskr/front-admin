<template>
  <img 
    src="@/assets/taskr_logo.svg" 
    alt="Taskr Logo" 
    class="logo" 
    @click="goToDashboard"
  />
</template>

<script setup>
import { useRouter } from 'vue-router';

// Usa el router para la navegación
const router = useRouter();

// Función para redirigir al dashboard
const goToDashboard = () => {
  router.push('dashboard'); // Cambia 'dashboard' por el nombre de tu ruta
};
</script>

<style scoped>
.logo {
  width: 100%; /* Ajusta según tus necesidades */
  max-width: 200px; /* Ejemplo de tamaño máximo */
  cursor: pointer; /* Indica que es clickeable */
}
</style>
