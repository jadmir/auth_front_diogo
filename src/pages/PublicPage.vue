<template>
  <h1>public</h1>
  <button @click="backHome">Back to Home</button>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()

  const backHome = () => {
    void router.push({
      name: 'Private',
      params: { n: 1, user: JSON.stringify({ n: 'asdfasdf', x: 'asdfasd' }) },
    })
  }
</script>

<style scoped></style>
