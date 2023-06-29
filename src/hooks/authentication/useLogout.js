import authStore from 'src/stores/authStore'
import { useRouter } from 'vue-router'

const useLogout = () => {
  const useAuthStore = authStore()
  const $router = useRouter()
  const handleLogout = () => {
    useAuthStore.logout()
    void $router?.replace('/')
  }

  return {
    handleLogout,
  }
}

export default useLogout
