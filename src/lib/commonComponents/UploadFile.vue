<template>
  <div class="q-pa-xs cols-xs-12">
    <q-file
      v-model="file"
      :label="label"
      outlined
      use-chips
      dense
      hide-bottom-space
      :accept="fileAccepted"
    >
      <template v-slot:append>
        <q-btn
          flat
          round
          color="primary"
          @click="uploadFile(file)"
          icon="attach_file"
        />
      </template>
    </q-file>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { FilesService } from 'src/services/files.service'

  const file = ref(null)

  const props = defineProps({
    label: {
      type: String,
      default: 'Seleccionar un archivo',
    },
    folder: {
      type: String,
      required: true,
    },
    fileAccepted: {
      type: String,
      default: '.pdf',
    },
  })

  const uploadFile = async (file) => {
    if (!file) return
    try {
      const { url, name, nameWithFolder } = await FilesService.upload(
        file,
        props.folder
      )
      emit('uploaded', {
        url,
        name,
        nameWithFolder,
      })
    } catch (error) {
      console.error(error)
    }
  }

  const emit = defineEmits(['uploaded'])
</script>

<style scoped></style>
