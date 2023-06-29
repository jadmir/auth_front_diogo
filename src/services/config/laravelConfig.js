import axios from 'axios'
import { callRefreshToken, handleRequestError } from 'src/services/config/utils'
import { Loading } from 'quasar'

const laravelAxiosConfig = axios.create({
  baseURL: process.env.LARAVEL_SERVICE_URL,
})

export const setLaravelToken = (token) => {
  laravelAxiosConfig.defaults.headers = {
    Token: token,
    'Content-type': 'application/json',
  }
}

laravelAxiosConfig.interceptors.request.use(
  async (config) => {
    const { url, headers } = config
    !headers?.hideLoading && Loading.show()
    await callRefreshToken(url, headers)
    return config
  },
  (error) => {
    return handleRequestError(error)
  }
)
laravelAxiosConfig.interceptors.response.use(
  (response) => {
    !response.config.headers?.hideLoading && Loading.hide()
    return response
  },
  (error) => {
    Loading.hide()
    void handleRequestError(error)
    return Promise.reject(error)
  }
)

export default laravelAxiosConfig
