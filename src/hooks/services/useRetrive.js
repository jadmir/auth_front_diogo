import { onMounted, ref } from 'vue'

const useRetrive = ({
  service,
  loadOnMount = true,
  page = 1,
  isActiveStatus,
  limit,
}) => {
  const items = ref([])
  const totalPagination = ref(0)
  const hookPage = ref(page)

  const all = async (
    { refreshPage, query } = {
      refreshPage: false,
      query: '',
    }
  ) => {
    if (refreshPage) {
      hookPage.value = 1
    }
    try {
      const { data, lastPage } = await service.readAll({
        page: hookPage.value,
        activeStatus: isActiveStatus.value,
        query,
        filters: [],
        limit,
      })
      items.value = data
      totalPagination.value = lastPage
    } catch (error) {
      console.error(error)
    }
  }

  onMounted(async () => {
    if (!loadOnMount) return
    await all()
  })

  return [items, all, totalPagination]
}

export default useRetrive
