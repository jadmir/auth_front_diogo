import { showNotifyError } from 'src/utils/notify.utils'
import authStore from 'stores/authStore'
import emptyLayoutRoutes from 'src/router/layouts/emptyLayout.routes'
import principalLayoutRoutes from 'src/router/layouts/principalLayout.routes'

const checkPermissionsGuard = (to, from, next) => {
  const useAuthStore = authStore()
  const pathnameLocation = to.meta.pathName ?? to.path
  const hasAccess = useAuthStore.permissions.some((permission) =>
    permission.modules.some((module) => module.path === pathnameLocation)
  )

  if (
    !hasAccess &&
    pathnameLocation !== '/' &&
    pathnameLocation !== '/inicio'
  ) {
    showNotifyError(
      'No tienes permisos para este recurso, contacta al administrador'
    )
  } else {
    next()
  }
}

const notFoundRoutes = [
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
    meta: {
      title: 'Error 404',
      requireAuth: false,
      noAuth: false,
      checkPermissions: false,
    },
  },
]

const routes = [
  ...emptyLayoutRoutes,
  ...principalLayoutRoutes,
  ...notFoundRoutes,
]
routes.map((route) => {
  if (route.meta?.checkPermissions) {
    route.beforeEnter = checkPermissionsGuard
  }
  route.children?.map((child) => {
    if (child.meta?.checkPermissions) {
      child.beforeEnter = checkPermissionsGuard
    }
  })
})

export default routes
