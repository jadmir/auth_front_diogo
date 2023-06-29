<template>
  <q-page padding>
    <module-description-card :title="title" :description="description" />

    <module-header
      :new-label="newItemLabel"
      refresh-label="Actualizar"
      @refresh="handleRefresh({ refreshPage: true })"
      @new="showModal"
    />

    <users-table
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
      @assign:role="handleAssignRole"
    />

    <q-dialog v-model="isShowing" width="350px" @before-hide="resetItem">
      <user-form
        :u="item"
        :is-editing="isEditing"
        @handleSubmit="handleSubmit"
      />
    </q-dialog>

    <q-dialog v-model="rolesModalShowing" width="350px">
      <assing-role-form :u="assingRoleUser" @created="handleRoleUpdated" />
    </q-dialog>
  </q-page>
</template>

<script setup>
  import { computed, ref } from 'vue'

  import useRetrive from 'src/hooks/services/useRetrive'
  import useCreate from 'src/hooks/services/useCreate'
  import useDelete from 'src/hooks/services/useDelete'
  import useModal from 'src/hooks/ui/useModal'

  import ModuleDescriptionCard from 'src/lib/commonComponents/ModuleDescriptionCard.vue'
  import ModuleHeader from 'src/lib/commonComponents/ModuleHeader.vue'

  import UserForm from 'pages/Users/components/UserForm.vue'
  import UsersTable from 'pages/Users/components/UsersTable.vue'

  import AssingRoleForm from 'pages/Users/components/AssingRoleForm.vue'
  import { deepCloneObject } from 'src/utils/base.utils'
  import { UserCrudService } from 'src/services/crud/user.crud.service'
  import { ActiveStatusEnum } from 'src/services/utils/http.types'

  const title = 'Usuarios'
  const description = 'Creación y edición de usuarios'
  const newItemLabel = 'Nuevo usuario'
  const service = new UserCrudService()
  const initItem = {
    document: '',
    name: '',
    email: '',
    phone_number: '',
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

  const [rolesModalShowing, showRolesModal, hideRolesModal] = useModal()
  const assingRoleUser = ref({})

  const q = ref('')

  const handleRefresh = ({ refreshPage = true }) => {
    if (q.value.length > 0) {
      all({ query: q.value, refreshPage })
    } else {
      all({ refreshPage })
    }
  }

  const handleEdit = async (item) => {
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

  const handleAssignRole = async (item) => {
    console.log(item)
    assingRoleUser.value = deepCloneObject(item)
    showRolesModal()
  }

  const handleRoleUpdated = async () => {
    await handleRefresh({ refreshPage: false })
    hideRolesModal()
  }
</script>

<style scoped></style>
