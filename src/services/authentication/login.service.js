import { laravelAxiosConfig, setCredentialsToken } from 'src/services/config'

export default class LoginService {
  constructor() {
    this.http = laravelAxiosConfig
  }

  async login({ userLoginDto, extraHeaders }) {
    return new Promise((resolve, reject) => {
      this.http
        .post('/auth/signing', userLoginDto, {
          headers: {
            ...extraHeaders,
          },
        })
        .then(({ data }) => {
          setCredentialsToken(data.token)
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  async refreshToken({ refreshToken }) {
    return new Promise((resolve, reject) => {
      this.http
        .post(
          '/auth/refresh-token',
          { refreshToken },
          {
            headers: {
              hideLoading: true,
            },
          }
        )
        .then(({ data }) => {
          setCredentialsToken(data.token)
          resolve({
            token: data.token,
            refreshToken: data.refreshToken,
            tokenExpirationTime: data.tokenExpirationTime,
          })
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  async retrieveUserInfo() {
    return new Promise((resolve, reject) => {
      this.http
        .get('/auth/user-info')
        .then(({ data }) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
