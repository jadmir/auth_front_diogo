const userRoutes = [
  {
    path: 'users',
    name: 'UsersPage',
    component: () => import('pages/Users/UsersPage.vue'),
    meta: {
      title: 'Usuarios',
      requireAuth: true,
      noAuth: false,
      checkPermissions: true,
    },
  },
  {
    path: 'roles',
    name: 'RolesPage',
    component: () => import('pages/Roles/RolesPage.vue'),
    meta: {
      title: 'Roles',
      requireAuth: true,
      noAuth: false,
      checkPermissions: true,
    },
  },
  {
    path: 'roles-permissions/:id',
    name: 'RolesPermissionsPage',
    component: () => import('pages/Roles/RolesPermissionsPage.vue'),
    props: true,
    meta: {
      title: 'Roles',
      requireAuth: true,
      noAuth: false,
      pathName: '/roles-permissions',
      checkPermissions: true,
    },
  },
]

export default userRoutes
