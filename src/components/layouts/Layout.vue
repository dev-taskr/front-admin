<template>
  <div class="min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
    <Navbar />
    <main>
      <div class="max-w-[1200px] mx-auto mt-6">
        <!-- Muestra el texto del título dinámico -->
        <h1 class="text-2xl font-bold mb-6" v-if="title != ''">{{ title }}</h1>
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import Navbar from "@/components/layouts/Navbar.vue";

// Definimos las props utilizando `defineProps`
const props = defineProps({
  title: {
    type: String,       // La prop debe ser un string
    required: false,    // No es obligatoria
  },
});
</script>
