<template>
  <q-page padding>
    <module-description-card
      title="Mis Datos"
      description="Aquí podrás actualizar tus datos personales"
    />

    <div class="flex row justify-center">
      <q-card class="q-ma-md col-xs-12 col-md-6">
        <q-card-section>
          <p class="text-h6">Datos personales</p>
        </q-card-section>
        <q-card-section>
          <q-banner inline-actions class="text-white bg-red">
            Recuerde que si actualiza su correo, este será el que se utilizará
            para iniciar sesión.
          </q-banner>
        </q-card-section>
        <q-card-section>
          <q-form class="row">
            <div class="q-pa-xs col-xs-12 col-md-6">
              <js-input
                label="Nombre"
                required
                required-label="Nombre obligatorio"
                v-model="currentUser.name"
              />
            </div>
            <div class="q-pa-xs col-xs-12 col-md-6">
              <js-input
                label="Apellido"
                required
                required-label="Apellido obligatorio"
                v-model="currentUser.last_name"
              />
            </div>
            <div class="q-pa-xs col-xs-12 col-md-6">
              <js-input
                label="Correo"
                required
                required-label="Correo obligatorio"
                v-model="currentUser.email"
              />
            </div>
            <div class="q-pa-xs col-xs-12 col-md-6">
              <js-input
                type="password"
                label="Contraseña"
                v-model="password"
                :min="8"
              />
            </div>
            <div class="text-right col-xs-12 q-my-md">
              <q-btn
                label="Actualizar"
                size="sm"
                color="primary"
                @click="updateUser"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>

      <q-card class="q-ma-md col-xs-12 col-md-6">
        <q-card-section>
          <p class="text-h6">Mis permisos</p>
        </q-card-section>
        <q-card-section>
          <q-list>
            <q-item>
              <strong>Rol:</strong> &nbsp; {{ currentRol.name }}
            </q-item>
            <q-item>
              <strong>Descripción:</strong> &nbsp; {{ currentRol.description }}
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
  import ModuleDescriptionCard from 'src/lib/commonComponents/ModuleDescriptionCard.vue'
  import JsInput from 'src/lib/jsComponents/JsInput.vue'
  import { onMounted, ref } from 'vue'
  import authStore from 'stores/authStore'
  import useLogout from 'src/hooks/authentication/useLogout'
  import { useQuasar } from 'quasar'
  import { showNotifySuccess } from 'src/utils/notify.utils'
  const { handleLogout } = useLogout()
  const currentUser = ref({})
  const lastStateUser = ref({})
  const currentRol = ref({})
  const password = ref('')
  const $q = useQuasar()

  const handleConfirmChange = () => {
    return new Promise((resolve) => {
      $q.dialog({
        title: 'Confirmar cambio de contraseña',
        message: '¿Estás seguro de que deseas cambiar tu contraseña?',
        cancel: {
          label: 'Cancelar',
          color: 'primary',
        },
        ok: {
          label: 'Cambiar',
          color: 'negative',
        },
        persistent: true,
      })
        .onOk(() => {
          resolve(true)
        })
        .onOk(() => {
          resolve(true)
        })
        .onCancel(() => {
          resolve(false)
        })
        .onDismiss(() => {
          resolve(false)
        })
    })
  }

  const updateUser = async () => {
    const isPasswordChanged = password.value.length > 0
    let isConfirmed = true
    if (isPasswordChanged) {
      isConfirmed = await handleConfirmChange()

      if (!isConfirmed) {
        return
      }
    }
    try {
      const { user } = await updateUserData({
        id: currentUser.value.id,
        data: currentUser.value,
        password: isPasswordChanged ? password.value : undefined,
        last_state: lastStateUser.value,
      })

      showNotifySuccess()

      if (isPasswordChanged) {
        handleLogout()
        return
      }

      currentUser.value = StrapiUserClass.fromDto(user)
      authStore().setUser(currentUser.value)
    } catch (error) {
      console.error(error)
    }
  }

  onMounted(async () => {
    try {
      const { user, rol } = await findMe()
      currentUser.value = StrapiUserClass.fromDto(user)
      lastStateUser.value = StrapiUserClass.fromDto(user)
      currentRol.value = StrapiRolClass.fromDto(rol)
      authStore().setUser(currentUser.value)
    } catch (e) {
      console.error(e)
    }
  })
</script>

<style scoped></style>
