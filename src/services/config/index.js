import laravelAxiosConfig, {
  setLaravelToken,
} from 'src/services/config/laravelConfig'

const setCredentialsToken = (token) => {
  setLaravelToken(token)
}
export { laravelAxiosConfig, setCredentialsToken }
