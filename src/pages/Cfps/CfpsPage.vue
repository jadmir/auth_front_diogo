<template>
  <q-page padding>
    <module-description-card :title="title" :description="description" />

    <module-header
      :new-label="newItemLabel"
      refresh-label="Actualizar"
      @refresh="handleRefresh({ refreshPage: true })"
      @new="showModal"
    />

    <cfp-table
      :items="items"
      has-filters
      @filter="handleRefresh"
      v-model:query="q"
      @refresh="all"
      @edit="handleEdit"
      v-model:page="page"
      :max-page="total"
      has-pagination
      v-model:active-status="isActiveStatus"
      has-active-status
      @delete="handleDelete"
      @restore="handleRestore"
    />

    <q-dialog v-model="isShowing" width="350px" @before-hide="resetItem">
      <cfp-form
        :u="item"
        :is-editing="isEditing"
        @handleSubmit="handleSubmit"
      />
    </q-dialog>
  </q-page>
</template>

<script setup>
  import { ref } from 'vue'

  import useRetrive from 'src/hooks/services/useRetrive'
  import useCreate from 'src/hooks/services/useCreate'
  import useDelete from 'src/hooks/services/useDelete'
  import useModal from 'src/hooks/ui/useModal'

  import ModuleDescriptionCard from 'src/lib/commonComponents/ModuleDescriptionCard.vue'
  import ModuleHeader from 'src/lib/commonComponents/ModuleHeader.vue'

  import { ActiveStatusEnum } from 'src/services/utils/http.types'
  import { CfpCrudService } from 'src/services/crud/cfp.crud.service'
  import CfpForm from 'pages/Cfps/components/CfpForm.vue'
  import CfpTable from 'pages/Cfps/components/CfpTable.vue'

  const title = 'Cfps'
  const description = 'Creación y edición de cfp'
  const newItemLabel = 'Nuevo cfp'
  const service = new CfpCrudService()
  const initItem = {
    name: '',
    sectional_id: null,
  }

  const page = ref(1)
  const isActiveStatus = ref(ActiveStatusEnum.active)
  const [items, all, total] = useRetrive({
    service,
    page,
    isActiveStatus,
  })

  const [
    item,
    isEditing,
    setItemUpdate,
    resetItem,
    update,
    store,
    isSuccessful,
  ] = useCreate({
    service,
    initItem,
  })

  const [remove, restore] = useDelete({ service })

  const [isShowing, showModal, hideModal] = useModal()

  const q = ref('')

  const handleRefresh = ({ refreshPage = true }) => {
    if (q.value.length > 0) {
      all({ query: q.value, refreshPage })
    } else {
      all({ refreshPage })
    }
  }

  const handleEdit = async (item) => {
    console.log('item', item)
    await setItemUpdate(item)
    showModal()
  }

  const handleSubmit = async (data) => {
    if (isEditing.value) {
      await update(data)
    } else {
      await store(data)
    }
    if (isSuccessful.value) {
      await handleRefresh({ refreshPage: true })
      hideModal()
    }
  }

  const handleDelete = async (item) => {
    await remove(item)
    await handleRefresh({ refreshPage: true })
  }

  const handleRestore = async (item) => {
    await restore(item)
    await handleRefresh({ refreshPage: true })
  }
</script>

<style scoped></style>
