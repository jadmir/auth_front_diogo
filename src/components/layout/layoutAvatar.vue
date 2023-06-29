<template>
  <q-btn round flat>
    <q-avatar size="40px">
      <img src="https://cdn.quasar.dev/img/boy-avatar.png" alt="Avatar" />
    </q-avatar>
    <q-tooltip>Mi Cuenta</q-tooltip>
    <q-menu>
      <q-list style="min-width: 100px">
        <q-item clickable v-close-popup>
          <q-item-section>Bienvenido {{ userName }}</q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable v-close-popup @click="getAuthInfo">
          <q-item-section>Recargar mis información</q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable v-close-popup @click="handleLogout">
          <q-item-section avatar>
            <q-icon name="logout" color="red" />
          </q-item-section>
          <q-item-section>SALIR</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup>
  import useLogout from 'src/hooks/authentication/useLogout'
  import authStore from 'stores/authStore'
  import { computed } from 'vue'
  import useAuthInfo from 'src/hooks/authentication/useAuthInfo'

  const { handleLogout } = useLogout()
  const { currentUser } = authStore()
  const { getAuthInfo } = useAuthInfo()

  const userName = computed(() => {
    return currentUser?.name || 'Usuario'
  })
</script>

<style scoped></style>
