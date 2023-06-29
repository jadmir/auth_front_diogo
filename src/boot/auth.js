import { boot } from 'quasar/wrappers'
import useAuthInfo from 'src/hooks/authentication/useAuthInfo'

export default boot(async ({ store }) => {
  const { getAuthInfo } = useAuthInfo()
  await getAuthInfo()
})
