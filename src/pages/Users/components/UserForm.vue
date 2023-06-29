<template>
  <q-card>
    <q-card-section>
      <module-description-card :title="title" />
    </q-card-section>

    <q-card-section>
      <q-form class="row" @submit.prevent="handleSubmit">
        <div class="q-pa-xs col-xs-12 col-md-6">
          <js-input
            label="Documento"
            required
            required-label="Documento obligatorio"
            v-model="item.document"
            :disable="isEditing"
          />
        </div>

        <div class="q-pa-xs col-xs-12 col-md-6">
          <js-input
            label="Nombres"
            required
            required-label="Nombres obligatorio"
            v-model="item.name"
          />
        </div>

        <div class="q-pa-xs col-xs-12 col-md-6">
          <js-input
            label="Correo"
            required
            required-label="Correo obligatorio"
            v-model="item.email"
            type="email"
          />
        </div>

        <div class="q-pa-xs col-xs-12 col-md-6" v-if="!props.isEditing">
          <js-input
            type="password"
            label="Contraseña"
            :required="!props.isEditing"
            required-label="Contraseña obligatoria"
            v-model="password"
            :min="8"
          />
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

  import JsInput from 'src/lib/jsComponents/JsInput.vue'
  import ModuleDescriptionCard from 'src/lib/commonComponents/ModuleDescriptionCard.vue'

  const CREATE_TITLE = 'Crear usuario'
  const EDIT_TITLE = 'Editar usuario'
  const CREATE_BUTTON_LABEL = 'Crear'
  const EDIT_BUTTON_LABEL = 'Editar'

  const item = ref({})
  const password = ref('')

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
    item.value = props.u
  })

  onUnmounted(() => {
    item.value = {}
  })

  const buttonLabel = computed(() =>
    props.isEditing ? EDIT_BUTTON_LABEL : CREATE_BUTTON_LABEL
  )
  const title = computed(() => (props.isEditing ? EDIT_TITLE : CREATE_TITLE))
  const emit = defineEmits(['handleSubmit'])
  const handleSubmit = async () => {
    emit(
      'handleSubmit',
      props.isEditing ? item.value : { ...item.value, password: password.value }
    )
  }
</script>

<style scoped></style>
