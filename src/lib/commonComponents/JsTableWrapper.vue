<template>
  <q-markup-table separator="cell" class="TableWrapper" dense>
    <slot />
  </q-markup-table>
</template>

<script setup>
  const props = defineProps({
    headerBgColor: {
      type: String,
      default: '#3888D7',
    },
  })
</script>

<style lang="scss">
  .TableWrapper {
    thead tr:first-child th {
      background-color: v-bind(headerBgColor);
      position: sticky;
      top: 0;
      opacity: 1;
      z-index: 1;
      color: white;
    }

    .q-table__top,
    .q-table__bottom {
      background-color: v-bind(headerBgColor);
    }
  }
</style>
