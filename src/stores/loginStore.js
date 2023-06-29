import { defineStore } from 'pinia'

export default defineStore({
  id: 'loginStore',
  state: () => ({
    userResponse: {},
    rolResponse: {
      id: 0,
      name: '',
      description: '',
    },
    tokenResponse: '',
    tokenRefreshResponse: '',
    rememberMe: false,
    tokenExpirationTime: '',
    permissionsResponse: [],
  }),
  actions: {
    setUserResponse(payload) {
      this.userResponse = payload
    },
    setRolResponse(payload) {
      this.rolResponse = payload
    },
    setTokenResponse(payload) {
      this.tokenResponse = payload
    },
    setTokenRefreshResponse(payload) {
      this.tokenRefreshResponse = payload
    },
    setRememberMe(payload) {
      this.rememberMe = payload
    },
    setTokenExpirationTime(payload) {
      this.tokenExpirationTime = payload
    },
    setPermissionsResponse(payload) {
      this.permissionsResponse = payload
    },
  },
})
