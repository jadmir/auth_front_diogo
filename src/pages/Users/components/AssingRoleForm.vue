<template>
  <q-card>
    <q-card-section>
      <module-description-card :title="title" />
    </q-card-section>

    <q-card-section>
      <q-form class="row" @submit.prevent="handleSubmit">
        <div class="q-pa-xs col-xs-12 col-md-6">
          <role-select v-model:v="item.role_id" />
        </div>

        <div class="text-right col-xs-12 q-my-md">
          <q-btn :label="buttonLabel" size="sm" color="primary" type="submit" />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { computed, onMounted, onUnmounted, ref } from 'vue'

  import ModuleDescriptionCard from 'src/lib/commonComponents/ModuleDescriptionCard.vue'
  import RoleSelect from 'pages/Roles/components/RoleSelect.vue'
  import userRoleService from 'src/services/userRole.service'
  import { RoleCrudService } from 'src/services/crud/role.crud.service'

  const item = ref({
    role_id: null,
    user_id: null,
  })

  const props = defineProps({
    isEditing: {
      type: Boolean,
      default: false,
    },
    u: {
      type: Object,
      required: true,
    },
  })

  onMounted(() => {
    console.log('props.u', props.u)
    item.value = {
      user_id: props.u.id,
      role_id: props.u.roles[0]?.id || null,
    }
  })

  onUnmounted(() => {
    item.value = {
      role_id: null,
      user_id: null,
    }
  })

  const buttonLabel = computed(() => 'Asignar')
  const title = computed(() => 'Asignar rol')
  const emit = defineEmits(['created'])
  const handleSubmit = async () => {
    try {
      const roleCrudService = new RoleCrudService()
      await roleCrudService.setRoleToUser({
        userId: item.value.user_id,
        roleId: item.value.role_id,
      })
      emit('created')
    } catch (error) {
      console.log('error', error)
    }
  }
</script>

<style scoped></style>
