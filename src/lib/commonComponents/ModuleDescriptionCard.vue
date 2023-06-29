<template>
  <q-card>
    <q-card-section>
      <div class="text-h6 text-center">{{ props.title }}</div>
      <div v-if="props.description && props.description.length">
        {{ props.description }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
  })
</script>

<style scoped></style>
