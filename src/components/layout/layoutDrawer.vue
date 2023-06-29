<template>
  <q-drawer v-model="useUiStore.photosDrawer" bordered behavior="mobile">
    <q-scroll-area class="fit">
      <q-toolbar class="GPL__toolbar">
        <q-toolbar-title
          class="row items-center justify-center text-grey-8 q-my-lg"
        >
          <logo :width="110" />
        </q-toolbar-title>
      </q-toolbar>

      <q-list padding>
        <q-expansion-item
          expand-separator
          icon="perm_identity"
          :label="permission.groupTitle"
          v-for="permission in permissions"
          :key="permission.groupId"
        >
          <q-item
            v-for="module in permission.modules"
            :key="module.id"
            clickable
            class="GPL__drawer-item"
            :to="module.path"
            exact-active-class="active-link"
          >
            <q-item-section avatar>
              <q-icon name="book" />
            </q-item-section>
            <q-item-section>
              <q-item-label>
                {{ module.title }}

                <q-badge v-if="module.wip" rounded color="red">
                  <q-tooltip
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[10, 10]"
                  >
                    En desarrollo
                  </q-tooltip>
                </q-badge>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup>
  import { computed } from 'vue'
  import uiStore from 'stores/uiStore'
  import Logo from 'components/LogoImage.vue'
  import authStore from 'stores/authStore'
  import { deepCloneObject } from 'src/utils/base.utils'

  const useUiStore = uiStore()

  const useAuthStore = authStore()
  const permissions = computed(() => {
    const permissions = deepCloneObject(useAuthStore.permissions)

    return permissions
      .map((permission) => {
        permission.modules = permission.modules
          .filter((module) => module.isShow === 1)
          .map((module) => {
            if (['Afiliados', 'Hijos', 'Herederos'].includes(module.title)) {
              module.wip = true
            }
            return module
          })
        return permission
      })
      .filter((permission) => permission.modules.length > 0)
  })
</script>

<style>
  .active-link {
    background-color: #f5f5f5;
  }
</style>
