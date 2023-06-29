import { showNotifySuccess } from 'src/utils/notify.utils'

const useDelete = ({ service }) => {
  const remove = async (entity) => {
    try {
      await service.delete(entity.id)
      showNotifySuccess()
    } catch (error) {
      console.error(error)
    }
  }

  const restore = async (entity) => {
    try {
      await service.restore(entity.id)
      showNotifySuccess()
    } catch (error) {
      console.error(error)
    }
  }

  return [remove, restore]
}

export default useDelete
