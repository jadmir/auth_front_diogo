<template>
  <!--  <q-input outlined dense hide-bottom-space v-model="t" label="Titulo" />-->
  <q-input
    outlined
    dense
    hide-bottom-space
    v-model="data"
    :label="labelInput"
    lazy-rules
    :rules="inputRules"
    :type="type"
    @keyup.enter="emit('keyup:enter')"
    :disable="disable"
  />
</template>

<script setup>
  import { computed } from 'vue'

  const emit = defineEmits(['update:modelValue', 'keyup:enter'])

  const props = defineProps({
    rules: {
      type: Array,
      default: () => [],
    },
    required: {
      type: Boolean,
      default: false,
    },
    requiredLabel: {
      type: String,
      default: 'Campo obrigatorio',
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 0,
    },
    label: {
      type: String,
      default: '',
    },
    modelValue: {
      required: true,
    },
    type: {
      type: String,
      default: 'text',
      validator: (value = 'text') =>
        ['text', 'email', 'password', 'textarea', 'number', 'date'].indexOf(
          value
        ) !== -1,
    },
    disable: {
      type: Boolean,
      default: false,
    },
    // title: {
    //   type: String,
    //   required: true,
    // },
  })

  const inputRules = computed(() => {
    return [
      props.required &&
        ((val) => (val && val.length > 0) || props.requiredLabel),
      props.min > 0 &&
        ((val) =>
          (val && val.length >= props.min) ||
          `El campo debe contener por lo menos ${props.min} caracteres`),
      props.max > 0 &&
        ((val) =>
          (val && val.length <= props.max) ||
          `El campo debe contener máximo ${props.max} caracteres`),
      ...props.rules,
    ]
  })

  const labelInput = computed(() => {
    return props.required ? `${props.label} *` : props.label
  })

  const data = computed({
    get: () => props.modelValue,
    set: (val) => {
      emit('update:modelValue', val)
    },
  })

  // const t = computed<string>({
  //   get: () => props.title,
  //   set: (val: string) => {
  //     console.log('t', val)
  //     emit('update:title', val)
  //   },
  // })
</script>

<style scoped></style>
