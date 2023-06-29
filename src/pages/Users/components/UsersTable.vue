<template>
  <div class="text-center q-my-md" v-if="hasActiveStatus">
    <q-btn-toggle
      push
      v-model="aciveStatus"
      toggle-color="primary"
      :options="[
        { label: 'Activo', value: ActiveStatusEnum.active },
        { label: 'Inactivo', value: ActiveStatusEnum.inactive },
        { label: 'Todos', value: ActiveStatusEnum.all },
      ]"
      @update:model-value="handleRefresh"
    />
  </div>

  <filter-table
    v-if="hasFilters"
    v-model:query="filterQuery"
    @filter="handleFilter"
    @clean="handleRefresh"
  />

  <div class="q-my-sm">
    <js-table-wrapper>
      <thead>
        <tr>
          <th v-for="h in tableHeaders" :key="h.name" :class="[h.align]">
            {{ h.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, key) in props.items"
          :key="item.id"
          :class="[!!item.meta.deletedAt ? 'deleteRow' : '']"
        >
          <td class="text-center">{{ perPage * (page - 1) + key + 1 }}</td>
          <td v-for="p in properties" :key="p">
            {{ getPropertyValue[p]?.(item) || item[p] }}
          </td>
          <td class="text-center">
            <q-btn color="primary" label="Opciones" size="sm">
              <q-menu>
                <q-list style="min-width: 100px">
                  <q-item
                    v-if="!isItemDeleted(item)"
                    clickable
                    v-close-popup
                    @click="emit('edit', item)"
                  >
                    <q-item-section>Editar</q-item-section>
                  </q-item>
                  <q-item
                    clickable
                    v-close-popup
                    @click="emit('delete', item)"
                    v-if="!isItemDeleted(item)"
                  >
                    <q-item-section>Eliminar</q-item-section>
                  </q-item>
                  <q-item
                    clickable
                    v-close-popup
                    @click="emit('restore', item)"
                    v-else
                  >
                    <q-item-section>Restaurar</q-item-section>
                  </q-item>
                  <q-item
                    v-if="!isItemDeleted(item)"
                    clickable
                    v-close-popup
                    @click="emit('assign:role', item)"
                  >
                    <q-item-section>Asignar rol</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </td>
        </tr>
      </tbody>
    </js-table-wrapper>
  </div>

  <div class="q-pa-lg flex flex-center" v-if="hasPagination">
    <q-pagination
      v-model="page"
      :max="maxPage"
      @update:model-value="handlePageChange"
    />
  </div>
</template>

<script setup>
  import { computed } from 'vue'

  import JsTableWrapper from 'src/lib/commonComponents/JsTableWrapper.vue'

  import FilterTable from 'src/lib/commonComponents/FilterTable.vue'

  import { isActiveFilterEnum } from 'src/types/http.types'
  import { ActiveStatusEnum } from 'src/services/utils/http.types'

  const tableHeaders = [
    { name: 'N°', align: 'text-center' },
    { name: 'Documento' },
    { name: 'Nombres' },
    { name: 'Correo' },
    { name: 'Rol' },
    { name: 'Acciones', align: 'text-center' },
  ]

  const properties = ['document', 'name', 'email', 'roles']
  const getPropertyValue = {
    roles: (item) => item.roles[0]?.name || 'Sin rol asignado',
  }

  const props = defineProps({
    items: {
      type: Array,
      required: true,
    },
    query: {
      type: String,
      default: '',
    },
    hasFilters: {
      type: Boolean,
      default: false,
    },
    hasActiveStatus: {
      type: Boolean,
      default: false,
    },
    activeStatus: {
      type: String,
      default: isActiveFilterEnum.ALL,
    },
    page: {
      type: Number,
      default: 1,
    },
    maxPage: {
      type: Number,
      default: 1,
    },
    hasPagination: {
      type: Boolean,
      default: false,
    },
  })

  const filterQuery = computed({
    get: () => props.query,
    set: (value) => {
      emit('update:query', value)
    },
  })

  const aciveStatus = computed({
    get: () => props.activeStatus,
    set: (value) => {
      emit('update:activeStatus', value)
    },
  })

  const handleFilter = () => {
    emit('filter', { refreshPage: true })
  }

  const handlePageChange = (page) => {
    emit('filter', { refreshPage: false })
  }

  const handleRefresh = () => {
    page.value = 1
    filterQuery.value = ''
    emit('refresh')
  }

  const perPage = 15
  const page = computed({
    get: () => props.page,
    set: (value) => {
      emit('update:page', value)
    },
  })

  const isItemDeleted = (item) => !!item.meta.deletedAt

  const emit = defineEmits([
    'edit',
    'update:query',
    'update:activeStatus',
    'update:page',
    'filter',
    'refresh',
    'delete',
    'restore',
    'assign:role',
  ])
</script>

<style scoped>
  .deleteRow {
    background-color: rgba(213, 158, 158, 0.73);
    /*color: white;*/
  }
</style>
