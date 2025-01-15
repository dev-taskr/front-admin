<template>
    <div>
      <input
        :type="type"
        :id="id"
        :placeholder="placeholder"
        :value="modelValue"
        @input="onInput"
        :class="[
          'block w-full p-2.5 text-sm rounded-lg',
          'bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500',
          'dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
          error ? 'border-red-500' : ''
        ]"
        :required="required"
      />
      <p v-if="error" class="text-sm text-red-500 mt-1">{{ error }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, defineEmits, defineProps } from "vue";
  
  const props = defineProps({
    modelValue: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    id: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    validation: {
      type: Function,
      default: null,
    },
  });
  
  const emit = defineEmits(["update:modelValue"]);
  
  const error = ref("");
  
  const onInput = (event) => {
    const value = event.target.value;
    emit("update:modelValue", value);
    validate(value);
  };
  
  const validate = (value) => {
    if (props.validation) {
      const validationError = props.validation(value);
      error.value = validationError || "";
    }
  };
  
  // Revalida cuando cambie `modelValue` en el padre
  watch(() => props.modelValue, (newValue) => {
    validate(newValue);
  });
  </script>
  