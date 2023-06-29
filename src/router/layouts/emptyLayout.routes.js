const emptyLayoutRoutes = [
  {
    path: '/',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/LoginPage.vue'),
        meta: {
          title: 'Login',
          requireAuth: false,
          noAuth: true,
          checkPermissions: false,
        },
      },
    ],
  },
]

export default emptyLayoutRoutes
