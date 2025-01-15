<template>
    <div class="min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      <Navbar />
      <main class="p-6">
        <div class="max-w-screen-xl mx-auto">
          <slot />
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import Navbar from "@/components/layouts/Navbar.vue";
  </script>
  