<template>
  <q-page class="flex justify-center items-center" padding>
    <p class="text-h5">BIENVENIDO {{ name }}</p>
  </q-page>
</template>

<script setup>
  import authStore from 'stores/authStore'
  import { computed } from 'vue'
  const useAuthStore = authStore()
  const name = computed(() => useAuthStore.user?.name.toUpperCase())
</script>
