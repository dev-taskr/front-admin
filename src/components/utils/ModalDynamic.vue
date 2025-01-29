<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 dark:bg-opacity-70"
    @click.stop
  >
    <div
      class="bg-white rounded-lg shadow-lg w-96 p-6 transition-colors duration-200 dark:bg-gray-800"
    >
      <!-- Título -->
      <h3
        class="text-lg font-bold mb-2"
        :class="'text-green-600 dark:text-gray-400'"
      >
        {{ title }}
      </h3>

      <!-- Visualización de imágenes -->
      <div v-if="config.images && !config.fields && !config.buttons" class="mb-4">
        <div class="grid grid-cols-2 gap-2">
          <img
            v-for="(image, index) in config.images"
            :key="index"
            :src="image"
            alt="Modal Image"
            class="w-full h-auto rounded-md shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            @click="viewImage(image)"
          />
        </div>
      </div>


      <!-- Configuración dinámica -->
      <div v-else>
        <!-- Mensaje -->
        <p v-if="config.message" class="text-gray-700 dark:text-gray-300 mb-4">
          {{ config.message }}
        </p>
        
        <p v-if="config.description" class="text-gray-700 dark:text-gray-300 mb-4">
          {{ config.description }}
        </p>

        <!-- Renderizar Label + Inputs dinámicamente -->
        <div v-if="config.fields" class="mb-4">
          <div
            v-for="(field, index) in config.fields"
            :key="index"
            class="mb-4"
          >
            <!-- Componente Label -->
            <Label :forId="field.id || field.name">{{ field.label }}</Label>

            <!-- Renderizar el campo adecuado según su tipo -->
            <component
              v-if="field.type === 'text' || field.type === 'textarea' || field.type === 'select'"
              :is="getComponent(field.type)"
              :field="field"
              :id="field.id || field.name"
              v-model="field.value"
              @update-dependent="$emit('update-dependent', $event)"
            />

            <!-- Renderizar Switch Three Phase -->
            <SwitchThreePhase
              v-if="field.type === 'SwitchThreePhase'"
              v-model="field.value"
              :isLocked="false"
            />
            <Switch
              v-if="field.type === 'Switch'"
              v-model="field.value"
              :isLocked="false"
            />

            <!-- Renderizar etiquetas P, Span, H -->
            <Paragraph
              v-if="field.type === 'p'"
              :html="field.html"
              :customClass="field.customClass"
            />

            <Sp
              v-if="field.type === 'span'"
              :html="field.html"
              :customClass="field.customClass"
            />

            <Heading
              v-if="field.type === 'h'"
              :level="field.level"
              :html="field.html"
              :customClass="field.customClass"
            />
          </div>
        </div>
      </div>

      <!-- Botones dinámicos -->
      <div v-if="config && config.buttons" class="flex justify-end space-x-2">
        <button
          v-for="(button, index) in config.buttons"
          :key="index"
          @click="handleButtonClick(button.action)"
          class="px-4 py-2 rounded text-white transition-colors duration-200"
          :class="[
            button.type === 'primary'
              ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
              : 'bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600',
          ]"
        >
          {{ button.text }}
        </button>
      </div>

      <!-- Botón de cerrar por defecto -->
      <div v-else class="flex justify-end">
        <button
          @click="closeModal"
          class="px-4 py-2 rounded text-white transition-colors duration-200"
          :class="type === 'success'
            ? 'bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600'
            : 'bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600'"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineEmits, defineProps } from "vue";
import Input from "@/components/inputs/Input.vue"; // Componente Input
import Textarea from "@/components/inputs/Textarea.vue"; // Componente Textarea
import SwitchThreePhase from "@/components/inputs/SwitchThreePhase.vue"; // Componente SwitchThreePhase
import Switch from "@/components/inputs/Switch.vue"; // Componente SwitchThreePhase
import Label from "@/components/inputs/Label.vue"; // Componente Label
import SelectInput from "@/components/inputs/Select.vue"; // Componente Select
import Paragraph from "@/components/inputs/P.vue"; // Componente P
import Sp from "@/components/inputs/Span.vue"; // Componente Span
import Heading from "@/components/inputs/H.vue"; // Componente H

// Definir las props que se pasan al modal
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "success", // 'success' o 'error'
  },
  show: {
    type: Boolean,
    required: true,
  },
  config: {
    type: Object,
    default: null, // Si no se pasa, se muestra el contenido básico
  },
});

// Emitir un evento para cerrar el modal
const emit = defineEmits(["update:show", "update-dependent"]);

// Control de visibilidad
const isVisible = ref(props.show);

const closeModal = () => {
  isVisible.value = false;
  emit("update:show", false); // Actualizar la visibilidad desde el padre
};

// Obtener el componente correcto según el tipo de campo
const getComponent = (type) => {
  if (type === "text") return Input;
  if (type === "textarea") return Textarea;
  if (type === "switchThreePhase") return SwitchThreePhase;
  if (type === "select") return SelectInput;
  if (type === "p") return Paragraph;
  if (type === "span") return Sp;
  if (type === "h") return Heading;
  return null;
};

// Manejo de las acciones de los botones
const handleButtonClick = (action) => {
  if (typeof action === "function") {
    action(); // Ejecutar la acción proporcionada
  } else {
    console.warn("La acción del botón no es una función válida");
  }
};

// Sincronizar visibilidad con la prop `show`
watch(() => props.show, (newVal) => {
  isVisible.value = newVal;
});
</script>

<style scoped>
/* Puedes añadir estilos específicos si es necesario */
</style>
