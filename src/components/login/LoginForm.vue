<template>
  <q-form @submit.prevent="handleLogin">
    <div class="q-my-md">
      <js-input
        label="Documento"
        required
        required-label="Documento obligatorio"
        v-model="userDto.document"
        autofocus
      />
    </div>

    <div class="q-my-md">
      <js-input
        label="Contraseña"
        required
        required-label="Contraseña obligatoria"
        v-model="userDto.password"
        type="password"
      />
    </div>

    <div class="q-my-md text-center">
      <q-checkbox v-model="remember" label="Recordarme" />
    </div>

    <div class="text-center">
      <q-btn label="Ingresar" size="sm" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script setup>
  import { ref } from 'vue'
  import JsInput from 'src/lib/jsComponents/JsInput.vue'
  import useLogin from 'src/hooks/authentication/useLogin'

  const { login } = useLogin()

  const remember = ref(false)

  const userDto = ref({
    document: '',
    password: '',
  })

  const handleLogin = async () => {
    await login({
      userLoginDto: userDto.value,
      remember: remember.value,
    })
  }
</script>

<style scoped></style>
