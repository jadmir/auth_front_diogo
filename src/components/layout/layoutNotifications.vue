<template>
  <q-btn round dense flat color="grey-8" icon="notifications">
    <q-badge
      color="red"
      text-color="white"
      floating
      v-if="notificationsQuantity > 0"
    >
      {{ notificationsQuantity }}
    </q-badge>
    <q-tooltip>Notifications</q-tooltip>
  </q-btn>
</template>

<script setup>
  import { ref } from 'vue'

  const notificationsQuantity = ref(0)
</script>

<style scoped></style>
