<template>
  <div :class="theme,classFilter" class="flex items-center justify-between mb-4">
    <!-- Botones -->
    <div class="flex gap-4">
      <button
        v-if="dashboard"
        @click="goToDashboard"
        class="px-4 py-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 dark:bg-teal-700 dark:hover:bg-teal-800"
      >
        Inicio
      </button>
      <button
        v-if="ircumplimiento"
        class="px-4 py-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 dark:bg-teal-700 dark:hover:bg-teal-800"
      >
        Ir a Cumplimiento
      </button>
      <button
        v-if="back"
        @click="handleBackClick"
        class="px-4 py-2 bg-teal-500 text-white rounded-full flex items-center gap-2 hover:bg-teal-600 dark:bg-teal-700 dark:hover:bg-teal-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Atrás
      </button>
    </div>

    <!-- Campo de búsqueda -->
    <div class="flex items-center gap-2 relative">
      <input
        v-if="showSearchBox"
        type="text"
        placeholder="Buscar..."
        v-model="searchQuery"
        @input="$emit('update', $event.target.value)"
        class="absolute right-full mr-4 px-4 py-2 w-60 border border-gray-300 rounded-full focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:ring-teal-400 transition-transform transform origin-right scale-x-100"
      />
      <button
        v-if="search"
        @click="toggleSearch"
        class="p-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 dark:bg-teal-700 dark:hover:bg-teal-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-4.35-4.35M18 10a8 8 0 11-16 0 8 8 0 0116 0z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  dashboard: Boolean,
  ircumplimiento: Boolean,
  back: Boolean,
  sucursal: Boolean,
  periodo: Boolean,
  search: Boolean,
  records: {
    type: Array,
    default: () => [],
  },
  filterKey: {
    type: String,
    default: "title", // Campo que se filtrará (por defecto, "title")
  },
  classFilter: {
    type: String,
    default: ""
  }
});

const emit = defineEmits(["update"]);

const router = useRouter();
const theme = ref("light");
const showSearchBox = ref(false);
const searchQuery = ref("");

const handleBackClick = () => {
  const previousRoute = localStorage.getItem("previousRoute");
  router.push(previousRoute);
};

const goToDashboard = () => {
  router.push({ name: "Dashboard" });
};

const toggleSearch = () => {
  showSearchBox.value = !showSearchBox.value;
};

// Computed para filtrar datos
const filteredRecords = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return props.records.filter((record) => {
    const fieldValue = record[props.filterKey]?.toString().toLowerCase();
    return fieldValue?.includes(query);
  });
});

// Emitir datos filtrados al componente padre
/* const emitFilteredData = () => {
  emit("update", filteredRecords.value);
}; */
</script>

<style scoped>
:global(.dark) {
  transition: background-color 0.3s, color 0.3s;
}
</style>
