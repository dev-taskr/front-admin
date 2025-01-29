<template>
<!-- Título -->
<h3 class="text-lg font-bold mb-2" :class="'text-green-600 dark:text-gray-400'">
    {{ title }}
</h3>

<!-- Visualización de imágenes -->
<div v-if="config?.images && !config.fields && !config.buttons" class="mb-4">
    <div class="grid grid-cols-2 gap-2">
        <img v-for="(image, index) in config.images" :key="index" :src="image" alt="Image" class="w-full h-auto rounded-md shadow-sm cursor-pointer hover:shadow-md transition-shadow" @click="viewImage(image)" />
    </div>
</div>

<!-- Configuración dinámica -->
<div v-else>
    <!-- Mensaje -->
    <p v-if="config?.message" class="text-gray-700 dark:text-gray-300 mb-4">
        {{ config.message }}
    </p>

    <p v-if="config?.description" class="text-gray-700 dark:text-gray-300 mb-4">
        {{ config.description }}
    </p>

    <!-- Renderizar Label + Inputs dinámicamente -->
    <div v-if="config?.fields" class="grid grid-cols-2 gap-4 mb-6">
        <div v-for="(field, index) in config.fields" :key="index" class="mb-4">
            <!-- Componente Label -->
            <Label :forId="field.id || field.name">{{ field.label }}</Label>

            <!-- Renderizar el campo adecuado según su tipo -->
            <component v-if="field.type === 'text' || field.type === 'textarea' || field.type === 'select'" :is="getComponent(field.type)" :field="field" :id="field.id || field.name" v-model="field.value" @update-dependent="$emit('update-dependent', $event)" />

            <!-- Renderizar Switch Three Phase -->
            <SwitchThreePhase v-if="field.type === 'SwitchThreePhase'" v-model="field.value" :isLocked="false" />
            <Switch v-if="field.type === 'Switch'" v-model="field.value" :isLocked="false" />
        </div>
    </div>
</div>

<!-- Botones dinámicos -->
<div v-if="config && config.buttons" class="flex justify-end space-x-2">
    <button v-for="(button, index) in config.buttons" :key="index" @click="handleButtonClick(button.action)" class="px-4 py-2 rounded text-white transition-colors duration-200" :class="[ 
            button.type === 'primary'
              ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
              : 'bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600',
          ]">
        {{ button.text }}
    </button>
</div>
</template>

  
<script setup>
import { ref, defineEmits, defineProps } from "vue";
import Input from "@/components/inputs/Input.vue";
import Textarea from "@/components/inputs/Textarea.vue";
import SwitchThreePhase from "@/components/inputs/SwitchThreePhase.vue";
import Switch from "@/components/inputs/Switch.vue";
import Label from "@/components/inputs/Label.vue";
import SelectInput from "@/components/inputs/Select.vue";

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    /* message: {
      type: String,
      required: true,
    }, */
    type: {
        type: String,
        default: "success",
    },
    config: {
        type: Object,
        default: null,
    },
});

const emit = defineEmits(["update-dependent"]);

const closeModal = () => {
    console.log("Cerrar");
};

const getComponent = (type) => {
    if (type === "text") return Input;
    if (type === "textarea") return Textarea;
    if (type === "switchThreePhase") return SwitchThreePhase;
    if (type === "select") return SelectInput;
    return null;
};

const handleButtonClick = (action) => {
    if (typeof action === "function") {
        action();
    } else {
        console.warn("La acción del botón no es una función válida");
    }
};
</script>

  
<style scoped>
.container {
    max-width: 800px;
}
</style>
