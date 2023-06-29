<template>
  <div class="q-my-lg">
    <q-btn
      v-if="showNew"
      :label="props.newLabel"
      size="sm"
      color="primary"
      class="q-mx-sm"
      @click="emit('new')"
    />
    <q-btn
      :label="props.refreshLabel"
      size="sm"
      color="primary"
      class="q-mx-sm"
      @click="emit('refresh')"
    />
  </div>
</template>

<script setup>
  const props = defineProps({
    showNew: {
      type: Boolean,
      default: true,
    },
    newLabel: {
      type: String,
      default: 'Nuevo',
    },
    refreshLabel: {
      type: String,
      default: 'Actualizar',
    },
  })

  const emit = defineEmits(['new', 'refresh'])
</script>

<style scoped></style>
