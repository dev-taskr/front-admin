<template>
  <div class="relative" ref="dropdownRef">
    <button
      @click="toggleDropdown"
      class="flex items-center space-x-2 px-4 py-2 rounded-full bg-white text-black hover:bg-gray-100 dark:bg-gray-800  dark:text-gray-200 dark:hover:bg-gray-700">
      <slot name="button-content">
        <!-- Contenido del botón por defecto -->
        <span>Dropdown</span>
      </slot>
    </button>

    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-48 rounded shadow-md z-10 text-black bg-white dark:bg-gray-800 dark:text-gray-200">
      <slot name="dropdown-content">
        <!-- Contenido del dropdown por defecto -->
        <!-- <ul>
          <li>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Opción 1</a>
          </li>
          <li>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Opción 2</a>
          </li>
        </ul> -->

        <ul>
          <li class="flex justify-center py-2">
            <ThemeToggle />
          </li>
          <li class="border-t border-gray-300 dark:border-gray-600"></li>
          <li>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Opción 2</a>
          </li>
          <li>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Opción 3</a>
          </li>
          <li>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" @click="logout">Cerrar Sesión</a>
          </li>
        </ul>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import ThemeToggle from "./ThemeToggle.vue";

const isOpen = ref(false);
const dropdownRef = ref(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const closeDropdown = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", closeDropdown);
});

onUnmounted(() => {
  document.removeEventListener("click", closeDropdown);
});
</script>

<style scoped>
/* Estilos adicionales si es necesario */
</style>
