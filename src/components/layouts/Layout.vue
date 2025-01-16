<template>
    <div class="min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      <Navbar />
      <main><!--  class="p-6" -->
        <div class="max-w-[1200px] mx-auto mt-6">
          <slot />
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import Navbar from "@/components/layouts/Navbar.vue";
  </script>
  