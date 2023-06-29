<template>
  <q-header elevated class="bg-white text-grey-8" height-hint="64">
    <q-toolbar style="height: 64px">
      <q-btn
        flat
        dense
        round
        @click="useUiStore.togglePhotosDrawer"
        aria-label="Menu"
        icon="menu"
        class="q-mx-md"
      />

      <q-space />

      <div class="q-gutter-sm row items-center no-wrap">
        <!--        <photos-layout-direct-access />-->
<!--        <layout-notifications />-->
        <q-space />
        <layout-avatar />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup>
  import uiStore from 'stores/uiStore'
  // import LayoutNotifications from 'components/layout/LayoutNotifications.vue'
  import LayoutAvatar from 'components/layout/layoutAvatar.vue'

  const useUiStore = uiStore()
</script>
