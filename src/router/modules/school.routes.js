const SchoolRoutes = [
  {
    path: 'schools',
    name: 'SchoolsPage',
    component: () => import('pages/Schools/SchoolsPage.vue'),
    meta: {
      title: 'Escuelas',
      requireAuth: true,
      noAuth: false,
      checkPermissions: true,
    },
  },
]

export default SchoolRoutes
