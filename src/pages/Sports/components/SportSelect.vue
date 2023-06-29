<template>
  <select-filterable
    v-if="items.length"
    v-model:v="model"
    option-label="name"
    option-value="id"
    :items="items"
    :label="LABEL"
    :multiple="multiple"
    @input="emit('input')"
  />
</template>

<script setup>
  import { computed, ref, watch } from 'vue'
  import SelectFilterable from 'src/lib/commonComponents/SelectFilterable.vue'
  import useRetrive from 'src/hooks/services/useRetrive'
  import { ActiveStatusEnum } from 'src/services/utils/http.types'
  import { SportCrudService } from 'src/services/crud/sport.crud.service'

  const LABEL = 'Seleccionar un deporte'

  const props = defineProps({
    v: {
      type: [Object, Number, null],
      required: true,
    },
    o: {
      type: Object,
      required: false,
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false,
    },
  })

  const model = computed({
    get() {
      return props.v
    },
    set(v) {
      emit('update:v', v)
    },
  })

  const updateObject = (v) => {
    !props.multiple &&
      emit(
        'update:o',
        items.value.find((item) => item.id === v)
      )
  }

  watch(model, (v) => {
    updateObject(v)
  })

  const emit = defineEmits(['update:v', 'update:o', 'input'])
  const service = new SportCrudService()
  const page = ref(1)
  const isActiveStatus = ref(ActiveStatusEnum.active)
  const [items] = useRetrive({
    service,
    page,
    isActiveStatus,
    limit: 0,
  })
</script>

<style scoped></style>
