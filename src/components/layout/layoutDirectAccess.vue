<template>
  <q-btn
    flat
    dense
    no-wrap
    color="primary"
    icon="add"
    no-caps
    class="q-ml-sm q-px-md"
  >
    <q-menu anchor="top end" self="top end">
      <q-list class="text-grey-8" style="min-width: 100px">
        <q-item
          v-for="menu in createMenu"
          :key="menu.text"
          clickable
          v-close-popup
          aria-hidden="true"
          :to="menu.path"
        >
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>{{ menu.text }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup>
  import { ref } from 'vue'

  const createMenu = ref([
    { path: '/', text: 'Album' },
    { path: '/', text: 'Shared Album' },
    { path: '/', text: 'Movie' },
    { path: '/otro', text: 'Animation' },
    { path: '/algun', text: 'Collage' },
  ])
</script>

<style scoped></style>
