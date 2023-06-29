import authStore from 'src/stores/authStore'

export const handleLogError = (error) => {
  if (!error.isAxiosError) {
    return
  }

  const useAuthStore = authStore()

  const logError = {
    message: {
      baseURL: error.config.baseURL,
      url: error.config.url,
      currentUser: useAuthStore.currentUser,
      // config: error.config,
      status: error.response?.status,
      // responseData: error.response,
    },
  }

  console.error(JSON.stringify(logError))
}
