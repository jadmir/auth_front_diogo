<template>
  <q-page padding>
    <module-description-card
      :title="role?.name || 'Permisos'"
      :description="
        role?.name
          ? `Administracion de permisos del rol ${role.name}`
          : 'Administracion de permisos'
      "
    />

    <q-list padding>
      <q-expansion-item
        expand-separator
        icon="perm_identity"
        :label="permission.groupTitle"
        v-for="permission in modules"
        :key="permission.groupId"
      >
        <q-item v-for="module in permission.modules" :key="module.id" clickable>
          <q-item-section>
            <q-item-label>{{ module.title }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-toggle v-model="module.permitted" color="primary" />
          </q-item-section>
        </q-item>
      </q-expansion-item>
    </q-list>

    <div class="text-right col-xs-12 q-my-md">
      <q-btn
        label="Volver a cargar Permisos"
        size="sm"
        color="primary"
        @click="loadModulesAndPermissions"
        class="q-mr-xs"
      />
      <q-btn
        label="Actualizar Permisos"
        size="sm"
        color="primary"
        @click="handleUpdatePermissions"
      />
    </div>
  </q-page>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import useFind from 'src/hooks/services/useFind'
  import { isActiveFilterEnum } from 'src/types/http.types'
  import ModuleDescriptionCard from 'src/lib/commonComponents/ModuleDescriptionCard.vue'
  import userRoleService from 'src/services/userRole.service'
  import { showNotifySuccess } from 'src/utils/notify.utils'
  import { RoleCrudService } from 'src/services/crud/role.crud.service'
  import { ActiveStatusEnum } from 'src/services/utils/http.types'
  import { AuthService } from 'src/services/auth.service'

  const route = useRoute()
  const { id } = route.params
  const role = ref({})
  const modules = ref([])

  const service = new RoleCrudService()
  const [find] = useFind({ service, activeStatus: ActiveStatusEnum.active })

  const loadModulesAndPermissions = async () => {
    try {
      const authService = new AuthService()
      const permissions = await authService.retrievePermissionsByRoleService({
        role_id: id,
      })
      modules.value = permissions.map((module) => {
        module.modules = module.modules.map((module) => {
          module.permitted = module.hasAccess === 1
          return module
        })
        return module
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdatePermissions = async () => {
    try {
      const permissionsChanged = modules.value
        .map((module) => {
          return {
            modules: module.modules
              .filter((module) => module.permitted)
              .map((module) => {
                return module.id
              }),
          }
        })
        .reduce((acc, val) => {
          return acc.concat(val.modules)
        }, [])

      const authService = new AuthService()
      await authService.updateRolePermissionsService({
        roleId: id,
        permissionsChanged,
      })
      showNotifySuccess('Permisos actualizados correctamente')
    } catch (error) {
      console.log(error)
    }
  }

  onMounted(async () => {
    role.value = await find({ id, isActiveStatus: isActiveFilterEnum.ALL })
    await loadModulesAndPermissions()
  })
</script>

<style scoped></style>
