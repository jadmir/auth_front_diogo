import { boot } from 'quasar/wrappers'
import authStore from 'stores/authStore'

export default boot(({ app, store }) => {
  const useAuthStore = authStore(store)
  const mixin = {
    computed: {
      currentToken() {
        return useAuthStore.token
      },

      currentUser() {
        return useAuthStore.user
      },

      isAuthenticated() {
        return useAuthStore.isAuthenticated
      },
    },
  }

  app.mixin(mixin)
})
