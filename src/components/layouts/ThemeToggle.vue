<template>
    <div class="px-4 py-2">
      <label for="theme-toggle" class="flex items-center cursor-pointer space-x-3">
        <span class="text-lg">🌞</span>
        <div class="relative">
          <input
            id="theme-toggle"
            type="checkbox"
            class="sr-only"
            :checked="isDarkMode"
            @change="toggleTheme"
          />
          <div
            class="block w-10 h-6 rounded-full"
            :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-300'"
          ></div>
          <div
            class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform"
            :class="isDarkMode ? 'translate-x-4' : 'translate-x-0'"
          ></div>
        </div>
        <span class="text-lg">🌙</span>
      </label>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  
  const isDarkMode = ref(false);
  
  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value;
    document.documentElement.classList.toggle("dark", isDarkMode.value);
    localStorage.setItem("theme", isDarkMode.value ? "dark" : "light");
  };
  
  onMounted(() => {
    const savedTheme = localStorage.getItem("theme");
    isDarkMode.value = savedTheme === "dark";
  });
  </script>
  