<template>
  <div class="relative inline-flex items-center cursor-pointer">
    <button
      ref="button"
      class="w-20 h-7 rounded-full relative transition-colors duration-200"
      :class="{
        'bg-green-500': modelValue === 'completed',
        'bg-gray-500': modelValue === 'neutro',
        'bg-red-500': modelValue === 'failed'
      }"
      @click="handleClick"
      :disabled="isLocked"
    >
      <!-- Indicador deslizante -->
      <div
        class="absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-200 shadow-md"
        :class="{
          'left-1': modelValue === 'completed',
          'left-[29px]': modelValue === 'neutro',
          'left-[55px]': modelValue === 'failed'
        }"
      ></div>
    </button>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
    validator: (value) => ['completed', 'neutro', 'failed'].includes(value),
  },
  isLocked: Boolean, // Bloquear el interruptor
});

const emit = defineEmits(['update:modelValue']);
const button = ref(null);

const handleClick = (event) => {
  if (props.isLocked) return;

  const buttonWidth = button.value.offsetWidth;
  const clickPosition = event.offsetX;

  // Determinar la sección donde se hizo clic
  const third = buttonWidth / 3;
  if (clickPosition < third) {
    emit('update:modelValue', 'completed'); // Izquierda
  } else if (clickPosition < third * 2) {
    emit('update:modelValue', 'neutro'); // Centro
  } else {
    emit('update:modelValue', 'failed'); // Derecha
  }
};
</script>
