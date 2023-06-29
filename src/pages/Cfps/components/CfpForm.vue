<template>
  <q-card>
    <q-card-section>
      <module-description-card :title="title" />
    </q-card-section>

    <q-card-section>
      <q-form class="row" @submit.prevent="handleSubmit">
        <div class="q-pa-xs col-xs-12">
          <js-input
            label="Cfp"
            required-label="Nombre de cfp obligatorio"
            v-model="item.name"
            autofocus
          />
        </div>

        <div class="q-pa-xs col-xs-12">
          <sectional-select v-model:v="item.sectional_id" />
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
  import SectionalSelect from 'pages/Sectionals/components/SectionalSelect.vue'

  const CREATE_TITLE = 'Crear seccional'
  const EDIT_TITLE = 'Editar seccional'
  const CREATE_BUTTON_LABEL = 'Crear'
  const EDIT_BUTTON_LABEL = 'Editar'

  const item = ref({})

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
    emit('handleSubmit', item.value)
  }
</script>

<style scoped></style>
