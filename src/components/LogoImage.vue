<template>
  <img
    :width="props.width"
    src="https://res.cloudinary.com/dvs9fbw5f/image/upload/v1680140139/diogo/diogo_derybv.jpg"
    alt="Logo"
  />
</template>

<script setup>
  const props = defineProps({
    width: {
      type: Number,
      default: 100,
    },
  })
</script>

<style scoped></style>
