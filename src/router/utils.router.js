export const setDocumentTitle = ({ title = 'App' }) => {
  document.title = title
}

export const handleAuthenticationGuard = ({
  noAuth,
  requireAuth,
  isAuthenticated,
  next,
  redirect,
}) => {
  if (noAuth) {
    if (isAuthenticated) {
      next('/inicio')
    } else {
      next()
    }
  } else if (requireAuth) {
    if (isAuthenticated) {
      next()
    } else {
      next({
        name: '',
        query: { redirect },
      })
    }
  } else {
    next()
  }
}
