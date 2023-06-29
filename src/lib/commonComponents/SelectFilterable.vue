<template>
  <q-select
    :options="optionsFiltered"
    map-options
    emit-value
    outlined
    dense
    hide-bottom-space
    :option-label="optionLabel"
    :option-value="optionValue"
    v-model="model"
    use-input
    :label="label"
    :clearable="clearable"
    @filter="filterMethod"
    :multiple="multiple"
    @update:model-value="emit('input')"
    :disable="disable"
  />
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue'

  onMounted(() => {
    optionsFiltered.value = props.items
  })

  const props = defineProps({
    items: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    optionLabel: {
      type: String,
      required: true,
    },
    v: {
      type: [String, Number, Array],
      default: null,
    },
    optionValue: {
      type: String,
      required: true,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    disable: {
      type: Boolean,
      default: false,
    },
  })

  const emit = defineEmits(['update:v', 'input'])

  const optionsFiltered = ref(props.items)

  const model = computed({
    get() {
      return props.v
    },
    set(v) {
      emit('update:v', v)
    },
  })

  const filterMethod = (val, update) => {
    if (val === '') {
      update(() => {
        optionsFiltered.value = props.items
      })
      return
    }
    update(() => {
      const needle = val.toLowerCase()
      optionsFiltered.value = props.items.filter(
        (v) => v[props.optionLabel].toLowerCase().indexOf(needle) > -1
      )
    })
  }
</script>
