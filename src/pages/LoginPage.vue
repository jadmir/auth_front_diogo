<template>
  <q-page class="column items-center justify-center LoginPage">
    <q-card bordered style="max-width: 320px; width: 100%; padding-top: 25px">
      <div class="column items-center justify-center">
        <logo :width="180" class="q-ma-none" />
      </div>
      <q-card-section horizontal>
        <div class="q-px-lg q-pb-lg" style="width: 100%">
          <login-form />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
  import Logo from 'components/LogoImage.vue'
  import LoginForm from 'components/login/LoginForm.vue'
</script>

<style scoped>
  .LoginPage {
    background-image: url('/bg.webp');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
</style>
