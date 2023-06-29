<template>
  <q-dialog v-model="showAuthVerifyModal" persistent>
    <q-card>
      <q-card-section>
        <div>
          <q-banner class="bg-primary text-white text-center">
            Solicita a tu administrador que te autorice el acceso.
          </q-banner>
        </div>
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="verifyAuthCode(code)">
          <div class="q-my-sm">
            <js-input
              v-model="code"
              label="Código de verificación"
              type="password"
              required
              required-label="El código es obligatorio"
            />
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
  import JsInput from 'src/lib/jsComponents/JsInput.vue'

  const useLoginStore = loginStore()

  const { verifyAuthCode } = useLogin()

  const code = ref('')
  const showAuthVerifyModal = computed(() => useLoginStore.showAuthCodeRequired)
</script>

<style scoped></style>
