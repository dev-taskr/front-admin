<template>
    <div
        class="bg-white dark:bg-gray-800 rounded-lg border-2 p-4 transition-colors duration-200"
        :class="{
            'border-green-500': localState === 'completed',
            'border-red-500': localState === 'failed',
            'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700': clickable
        }"
        @click="handleItemClick"
    >
        <div class="flex justify-between items-center min-h-[5rem]">
            <div class="flex-1">
                <div class="flex gap-0 items-center h-full">
                    <div class="w-64 shrink-0">
                        <h3 class="font-medium text-gray-800 dark:text-gray-200">{{ truncatedName }}</h3>
                        <div class="mt-1">
                            <p class="text-sm text-gray-500 dark:text-gray-400">
                                {{ item?.frequency || 'Sin frecuencia' }}
                            </p>
                            <p class="text-sm text-gray-500 dark:text-gray-400">
                                ID: {{ item?.id || 'Sin ID' }}
                            </p>
                        </div>
                    </div>
                    <p class="text-gray-600 dark:text-gray-300 flex-1 self-center">
                        {{ truncatedDescription }}
                    </p>
                </div>
            </div>
            <div class="flex items-center gap-16">
                <div class="w-20 relative flex justify-center items-center">
                    <Switch
                        :modelValue="localState"
                        @update:modelValue="handleStateChange"
                    />
                </div>
                <div class="w-20 flex justify-center gap-2">
                    <!-- Botón de imagen -->
                    <button
                        class="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                        :class="{
                            'bg-blue-500 hover:bg-blue-600 text-white': !isDarkMode,
                            'bg-blue-700 hover:bg-blue-800 text-gray-200': isDarkMode
                        }"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                    </button>
                    <!-- Botón de mensaje -->
                    <button
                        class="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                        :class="{
                            'bg-blue-500 hover:bg-blue-600 text-white': !isDarkMode,
                            'bg-blue-700 hover:bg-blue-800 text-gray-200': isDarkMode
                        }"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import Switch from "@/components/inputs/Switch.vue";

// Propiedades
const props = defineProps({
    item: Object, // Información del ítem
    clickable: {
        type: Boolean,
        default: false, // Define si el ítem es clickeable
    },
    baseRoute: {
        type: String,
        default: "", // Ruta base opcional
    },
});

// Eventos emitidos
const emit = defineEmits(["update:status"]);

// Estado local del switch
const localState = ref(props.item?.state || "completed");

// Cálculo del nombre truncado
const truncatedName = computed(() => {
    if (!props.item?.name) return "Sin nombre";
    return props.item.name.length > 25
        ? props.item.name.substring(0, 25) + "..."
        : props.item.name;
});

// Cálculo de la descripción truncada
const truncatedDescription = computed(() => {
    if (!props.item?.description) return "Sin descripción";
    return props.item.description.length > 140
        ? props.item.description.substring(0, 140) + "..."
        : props.item.description;
});

// Manejo de cambios de estado
const handleStateChange = (newValue) => {
    localState.value = newValue;
    emit("update:status", { id: props.item.id, state: newValue });
};

// Propiedad computada para detectar el tema oscuro
const isDarkMode = computed(() =>
    document.documentElement.classList.contains("dark")
);

// Router para manejar la navegación
const router = useRouter();

// Manejo del clic en el ítem
const handleItemClick = () => {
    if (props.clickable && props.baseRoute && props.item?.id) {
        const fullRoute = `${props.baseRoute}/${props.item.id}`;
        router.push(fullRoute);
    }
};
</script>
