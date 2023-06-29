<template>
  <div style="max-width: 500px; margin: auto" class="q-my-sm text-center">
    <js-input
      :label="inputLabel"
      v-model="filterQuery"
      @keyup:enter="handleFilter"
    />
    <q-btn
      class="q-mt-sm"
      label="Buscar"
      size="sm"
      color="primary"
      @click="handleFilter"
      :disable="!isFiltering"
    />
    <q-btn
      class="q-mt-sm q-ml-sm"
      label="Limpiar"
      size="sm"
      color="negative"
      @click="handleClearFilter"
    />
  </div>
</template>

<script setup>
  import JsInput from 'src/lib/jsComponents/JsInput.vue'
  import { computed } from 'vue'

  const props = defineProps({
    inputLabel: {
      type: String,
      default: 'Buscar',
    },
    query: {
      type: String,
      default: '',
    },
  })

  const filterQuery = computed({
    get: () => props.query,
    set: (value) => {
      emit('update:query', value)
    },
  })

  const isFiltering = computed(() => filterQuery.value.length > 0)

  const handleFilter = () => {
    emit('filter')
  }

  const handleClearFilter = () => {
    emit('clean')
  }

  const emit = defineEmits(['update:query', 'filter', 'clean'])
</script>

<style scoped></style>
