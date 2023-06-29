import authStore from 'stores/authStore'
import {
  currentSessionDataFromStorage,
  getSessionData,
} from 'src/utils/auth.utils'

const useAuthInfo = () => {
  const useAuthStore = authStore()
  const getAuthInfo = async () => {
    const { user, token, rol, refreshToken, remember, expirationToken } =
      currentSessionDataFromStorage()

    const isAuthenticated = !!user && !!token && !!rol && !!refreshToken
    if (isAuthenticated) {
      await getSessionData({
        token,
        tokenRefresh: refreshToken,
        remember,
        expirationToken: expirationToken,
      })
      return
    }
    useAuthStore.logout()
  }

  return { getAuthInfo }
}

export default useAuthInfo
