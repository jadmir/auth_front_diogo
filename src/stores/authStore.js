import { defineStore } from 'pinia'
import { getPrefixStorage } from 'src/utils/base.utils'
import { LocalStorage, SessionStorage } from 'quasar'
import { BaseEnum } from 'src/types/base.types'
import { showNotifyError } from 'src/utils/notify.utils'
const storagePrefixKey = getPrefixStorage()
const authTokenKey = BaseEnum.authTokenKey
const authTokenRefreshKey = BaseEnum.authTokenRefreshKey
const authUserKey = BaseEnum.authUserKey
const authRolKey = BaseEnum.authRolKey
const authExpirationKey = BaseEnum.authTokenExpirationKey

const authStore = defineStore({
  id: 'authStore',
  state: () => ({
    user: null,
    token: null,
    rol: null,
    tokenRefresh: null,
    remembered: false,
    expirationToken: '',
    permissions: [],
  }),
  actions: {
    async login({
      user,
      token,
      tokenRefresh,
      rol,
      remember = false,
      expirationToken,
      permissions,
    }) {
      if (!user || !token) {
        return
      }

      if (remember) {
        this.saveDataToLocalStorage(authUserKey, user)
        this.saveDataToLocalStorage(authRolKey, rol)
      } else {
        this.saveDataToSessionStorage(authUserKey, user)
        this.saveDataToSessionStorage(authRolKey, rol)
      }

      LocalStorage.set('rememberSession', remember)

      this.setTokens(token, tokenRefresh, expirationToken)

      this.user = user
      this.rol = rol
      this.remembered = remember

      await this.setPermissions(permissions)
    },

    setTokens(token, refreshToken, tokenExpirationTime) {
      const remembered = LocalStorage.getItem('rememberSession')

      if (remembered) {
        this.saveDataToLocalStorage(authTokenKey, token)
        this.saveDataToLocalStorage(authTokenRefreshKey, refreshToken)
        this.saveDataToLocalStorage(authExpirationKey, tokenExpirationTime)
      } else {
        this.saveDataToSessionStorage(authTokenKey, token)
        this.saveDataToSessionStorage(authTokenRefreshKey, refreshToken)
        this.saveDataToSessionStorage(authExpirationKey, tokenExpirationTime)
      }

      this.token = token
      this.tokenRefresh = refreshToken
      this.expirationToken = tokenExpirationTime
    },
    saveDataToLocalStorage(key, value) {
      LocalStorage.set(`${storagePrefixKey}-${key}`, value)
    },
    saveDataToSessionStorage(key, value) {
      SessionStorage.set(`${storagePrefixKey}-${key}`, value)
    },
    async setPermissions(permissions) {
      try {
        if (permissions.length <= 0) {
          showNotifyError(
            'No tienes permisos asignados, comunicate con el administrador'
          )
        }
        this.permissions = permissions
        const locationArray = location.pathname.split('/')
        const pathnameLocation = `/${locationArray[1]}`

        const hasAccess = this.permissions.some((permission) =>
          permission.modules.some((module) => module.path === pathnameLocation)
        )

        if (
          !hasAccess &&
          pathnameLocation !== '/' &&
          pathnameLocation !== '/inicio'
        ) {
          location.href = '/'
        }
      } catch (error) {
        console.error(error)
      }
    },

    setUser(user) {
      this.user = user
    },

    logout() {
      LocalStorage.clear()
      SessionStorage.clear()
      this.$reset()
    },
  },
  getters: {
    currentToken: (state) => state.token,
    currentRefreshToken: (state) => state.tokenRefresh,
    currentRol: (state) => state.rol,
    currentUser: (state) => state.user,
    isAuthenticated: (state) => !!state.token && !!state.user,
  },
})

export default authStore
