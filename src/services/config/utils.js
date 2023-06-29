import { showNotifyError } from 'src/utils/notify.utils'
import authStore from 'src/stores/authStore'
import {
  currentRefreshFromStorage,
  currentSessionDataFromStorage,
} from 'src/utils/auth.utils'
import { BaseEnum } from 'src/types/base.types'
import LoginService from 'src/services/authentication/login.service'

export const handleRequestError = (error) => {
  const { response } = error

  if (!response) {
    showNotifyError('Algo salió mal, intenta de nuevo')
    return Promise.reject(error)
  }

  let { hideNotifyError = false } = error.config

  const { message, hideNotifyErrorBack = false } = response.data

  hideNotifyError = hideNotifyError || hideNotifyErrorBack

  const responseStatus = response?.status || 500
  if (!hideNotifyError) {
    StatusResponseNotify[responseStatus](message)
  }
}

const StatusResponseNotify = {
  400: (message) => {
    showNotifyError(message || 'Algo salió mal, intenta de nuevo.')
  },
  401: (message) => {
    showNotifyError(
      message || 'Su autorización es incorrecta, vuelve a ingresar.'
    )
  },
  403: (message) => {
    showNotifyError(message || 'No tiene permisos para realizar esta acción')
  },
  404: (message) => {
    showNotifyError(message || 'Recurso no encontrado.')
  },
  422: (message) => {
    console.info('422')
    showNotifyError(message || 'Revisa los datos ingresados.')
  },
  500: () => {
    showNotifyError('Algo salió mal, intenta de nuevo.')
  },
}

export const callRefreshToken = async (url, headers) => {
  const urlNotRefresh = ['auth/signing', 'auth/refresh-token']
  if (
    !urlNotRefresh.includes(url) &&
    headers?.notRefreshToken !== 'notRefreshToken'
  ) {
    console.info('CALL REFRESH TOKEN EXECUTED...', { url })
    try {
      const useAuthStore = authStore()

      const { expirationToken } = currentSessionDataFromStorage()
      const currentTime = new Date().getTime()
      const expirationTokenTime = Date.parse(expirationToken)
      const timeDiff = expirationTokenTime - currentTime

      if (timeDiff <= BaseEnum.refreshTokenTime) {
        console.info('REFRESH TOKEN EXECUTED...', { url })
        const currentRefreshToken = currentRefreshFromStorage()

        const loginService = new LoginService()
        const { token, refreshToken, tokenExpirationTime } =
          await loginService.refreshToken({
            refreshToken: currentRefreshToken,
          })

        useAuthStore.setTokens(token, refreshToken, tokenExpirationTime)
      }
    } catch (error) {
      console.error(error)
    }
  }
}
