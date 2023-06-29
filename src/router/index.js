import { route } from 'quasar/wrappers'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import routes from 'src/router/routes'
import {
  handleAuthenticationGuard,
  setDocumentTitle,
} from 'src/router/utils.router'
import { isAuthenticatedFromStorage } from 'src/utils/auth.utils'

export default route(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    history: createHistory(
      process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  })

  Router.beforeEach((to, _, next) => {
    const { requireAuth, noAuth } = to.meta

    const isAuthenticated = isAuthenticatedFromStorage()

    handleAuthenticationGuard({
      noAuth: typeof noAuth === 'boolean' ? noAuth : false,
      requireAuth: typeof requireAuth === 'boolean' ? requireAuth : false,
      isAuthenticated,
      next,
      redirect: to.fullPath,
    })
  })

  Router.afterEach((to) => {
    const { title } = to.meta
    if (typeof title === 'string') {
      setDocumentTitle({ title })
    } else {
      setDocumentTitle({})
    }
  })

  return Router
})
