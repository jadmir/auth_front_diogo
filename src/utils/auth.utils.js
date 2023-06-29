import { callRefreshToken } from 'src/services/config/utils'
import { setCredentialsToken } from 'src/services/config'
import { showNotifyError } from 'src/utils/notify.utils'
import authStore from 'src/stores/authStore'
import useLoading from 'src/hooks/ui/useLoading'
import { LocalStorage, SessionStorage } from 'quasar'
import { getPrefixStorage } from 'src/utils/base.utils'
import { BaseEnum } from 'src/types/base.types'
import ResourceService from 'src/services/resource.service'
import LoginService from 'src/services/authentication/login.service'

export const getSessionData = async ({
  token,
  tokenRefresh,
  remember,
  expirationToken,
}) => {
  const { showLoading, hideLoading } = useLoading()
  const useAuthStore = authStore()
  setCredentialsToken(token)

  showLoading()
  try {
    await callRefreshToken(undefined, undefined)
    const loginService = new LoginService()
    const { user, role, permissions } = await loginService.retrieveUserInfo()

    await useAuthStore.login({
      user,
      token,
      tokenRefresh,
      rol: role,
      remember,
      expirationToken,
      permissions,
    })
  } catch (error) {
    console.error(error)
    showNotifyError(
      'Algo salió mal obteniendo sus datos, si el problema persiste comuniquese con el administrador.'
    )
    useAuthStore.logout()
  } finally {
    hideLoading()
  }
}

export const currentSessionDataFromStorage = () => {
  const storagePrefixKey = getPrefixStorage()
  const authTokenKey = BaseEnum.authTokenKey
  const authTokenRefreshKey = BaseEnum.authTokenRefreshKey
  const authUserKey = BaseEnum.authUserKey
  const authRolKey = BaseEnum.authRolKey
  const authExpirationKey = BaseEnum.authTokenExpirationKey

  let user
  let token
  let rol
  let refreshToken
  let expirationToken

  const remember = LocalStorage.getItem('rememberSession')

  if (!remember) {
    user = SessionStorage.getItem(`${storagePrefixKey}-${authUserKey}`)
    token = SessionStorage.getItem(`${storagePrefixKey}-${authTokenKey}`)
    rol = SessionStorage.getItem(`${storagePrefixKey}-${authRolKey}`)

    refreshToken = SessionStorage.getItem(
      `${storagePrefixKey}-${authTokenRefreshKey}`
    )
    expirationToken = SessionStorage.getItem(
      `${storagePrefixKey}-${authExpirationKey}`
    )
  } else {
    user = LocalStorage.getItem(`${storagePrefixKey}-${authUserKey}`)
    token = LocalStorage.getItem(`${storagePrefixKey}-${authTokenKey}`)
    rol = LocalStorage.getItem(`${storagePrefixKey}-${authRolKey}`)
    refreshToken = LocalStorage.getItem(
      `${storagePrefixKey}-${authTokenRefreshKey}`
    )
    expirationToken = LocalStorage.getItem(
      `${storagePrefixKey}-${authExpirationKey}`
    )
  }

  return {
    user,
    token,
    rol,
    refreshToken,
    remember,
    expirationToken,
  }
}

export const currentRefreshFromStorage = () => {
  let currentRefreshToken
  const storagePrefixKey = getPrefixStorage()
  const authTokenRefreshKey = BaseEnum.authTokenRefreshKey
  const remembered = LocalStorage.getItem('rememberSession')
  if (remembered) {
    currentRefreshToken = LocalStorage.getItem(
      `${storagePrefixKey}-${authTokenRefreshKey}`
    )
  } else {
    currentRefreshToken = SessionStorage.getItem(
      `${storagePrefixKey}-${authTokenRefreshKey}`
    )
  }

  return currentRefreshToken
}

export const isAuthenticatedFromStorage = () => {
  const storagePrefixKey = getPrefixStorage()
  const authTokenKey = BaseEnum.authTokenKey
  const authUserKey = BaseEnum.authUserKey

  let user
  let token

  const remember = LocalStorage.getItem('rememberSession')

  if (!remember) {
    user = SessionStorage.getItem(`${storagePrefixKey}-${authUserKey}`)
    token = SessionStorage.getItem(`${storagePrefixKey}-${authTokenKey}`)
  } else {
    user = LocalStorage.getItem(`${storagePrefixKey}-${authUserKey}`)
    token = LocalStorage.getItem(`${storagePrefixKey}-${authTokenKey}`)
  }

  return !!user && !!token
}
