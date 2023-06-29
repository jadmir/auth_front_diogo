import { ref } from 'vue'
import { showNotifySuccess } from 'src/utils/notify.utils'
import { deepCloneObject } from 'src/utils/base.utils'

const useCreate = ({
  service,
  initItem = {},
  retriveItemBeforeUpdate = true,
}) => {
  const item = ref(deepCloneObject(initItem))
  const isEditing = ref(false)
  const isSuccessful = ref(false)

  const setItemUpdate = async (entity) => {
    isEditing.value = true
    if (retriveItemBeforeUpdate) {
      const data = await service.read(entity.id)
      item.value = deepCloneObject(data)
    } else {
      item.value = deepCloneObject(entity)
    }
  }

  const resetItem = () => {
    item.value = deepCloneObject(initItem)
    isEditing.value = false
  }

  const update = async (entity) => {
    isSuccessful.value = false
    try {
      await service.update(entity.id, entity)
      showNotifySuccess()
      isSuccessful.value = true
      resetItem()
    } catch (error) {
      console.error(error)
      isSuccessful.value = false
    }
  }

  const store = async (entity) => {
    isSuccessful.value = false
    try {
      await service.create(entity)
      showNotifySuccess()
      isSuccessful.value = true
    } catch (error) {
      console.error(error)
      isSuccessful.value = false
    } finally {
      resetItem()
    }
  }

  return [
    item,
    isEditing,
    setItemUpdate,
    resetItem,
    update,
    store,
    isSuccessful,
  ]
}

export default useCreate
