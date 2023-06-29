import useLoading from 'src/hooks/ui/useLoading'
import { computed } from 'vue'
import authStore from 'src/stores/authStore'
import { useRouter, useRoute } from 'vue-router'
import loginStore from 'src/stores/loginStore'
import LoginService from 'src/services/authentication/login.service'

const useLogin = () => {
  const useAuthStore = authStore()
  const useLoginStore = loginStore()

  const { showLoading, hideLoading } = useLoading()
  const $router = useRouter()
  const $route = useRoute()

  const redirectPath = computed(() => {
    return $route.query.redirect || '/inicio'
  })

  const loginService = new LoginService()

  const login = async ({ userLoginDto, remember }) => {
    showLoading()
    try {
      const {
        token: loginToken,
        token_expiration_time,
        user: currentUser,
        role,
        permissions,
        refreshToken: currentRefreshToken,
      } = await loginService.login({
        userLoginDto,
        extraHeaders: {
          hideLoading: true,
        },
      })

      useLoginStore.setRememberMe(remember)
      useLoginStore.setTokenResponse(loginToken)

      const { token, refreshToken } = await loginService.refreshToken({
        refreshToken: currentRefreshToken,
      })
      useLoginStore.setTokenResponse(token)
      useLoginStore.setTokenRefreshResponse(refreshToken)
      useLoginStore.setTokenExpirationTime(token_expiration_time)
      useLoginStore.setPermissionsResponse(permissions)

      useLoginStore.setUserResponse(currentUser)
      useLoginStore.setRolResponse(role)

      await handleRedirect()
    } catch (error) {
      console.error('Error in login', error)
    } finally {
      hideLoading()
    }
  }

  const handleRedirect = async () => {
    console.log('redirectPath', redirectPath.value)
    console.log({
      useLoginStore,
    })
    await useAuthStore.login({
      user: useLoginStore.userResponse,
      token: useLoginStore.tokenResponse,
      tokenRefresh: useLoginStore.tokenRefreshResponse,
      rol: useLoginStore.rolResponse,
      remember: useLoginStore.rememberMe,
      expirationToken: useLoginStore.tokenExpirationTime,
      permissions: useLoginStore.permissionsResponse,
    })

    useLoginStore.$reset()
    void (await $router.replace(redirectPath.value.toString()))
  }

  return {
    login,
    handleRedirect,
  }
}
export default useLogin
