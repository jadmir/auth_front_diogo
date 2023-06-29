<template>
  <h1>private</h1>
  <p>{{ n }}</p>
  <p>{{ test }}</p>
  <pre>{{ u }}</pre>
</template>

<script setup>
  import { toRefs } from 'vue'
  import usePrivateHook from 'src/hooks/privateHook'

  const props = defineProps({
    n: {
      type: Number,
      default: 11,
    },
    test: {
      type: String,
      default: 'holi',
    },
  })

  const { n, test } = toRefs(props)
  const { setUserPropValue } = usePrivateHook()

  const u = setUserPropValue({ props })
</script>

<style scoped></style>
