import { Loading } from 'quasar'
import { ref } from 'vue'

const useLoading = () => {
  const isLoadingShowing = ref(false)

  const showLoading = () => {
    isLoadingShowing.value = true
    Loading.show()
  }

  const hideLoading = () => {
    isLoadingShowing.value = false
    Loading.hide()
  }

  return {
    showLoading,
    hideLoading,
  }
}

export default useLoading
