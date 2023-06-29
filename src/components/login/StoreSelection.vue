<template>
  <q-dialog v-model="showStoreSelectionModal" persistent>
    <q-card>
      <q-card-section>
        <div>
          <q-banner class="bg-primary text-white text-center">
            Selecciona el almacén en el cual vas a operar.
          </q-banner>
        </div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="selectStore(selectedStore)">
          <div class="q-my-sm">
            <q-select
              :options="useLoginStore.rolStores"
              outlined
              dense
              hide-bottom-space
              map-options
              emit-value
              option-value="storeId"
              :option-label="(option) => option.storeName.toString()"
              v-model="selectedStore"
              label="Almacén"
              placeholder="Selecciona un almacén"
              :rules="[{ required: true, message: 'Selecciona un almacén' }]"
            ></q-select>
          </div>
          <div class="text-center">
            <q-btn color="primary" label="Verificar" size="sm" type="submit" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
  import loginStore from 'stores/loginStore'
  import { computed, ref } from 'vue'
  import useLogin from 'src/hooks/authentication/useLogin'

  const useLoginStore = loginStore()

  const { selectStore } = useLogin()

  const selectedStore = ref(null)

  const showStoreSelectionModal = computed(
    () => useLoginStore.showStoreSelection
  )
</script>

<style scoped></style>
