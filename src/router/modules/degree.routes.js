const DegreeRoutes = [
  {
    path: 'degrees',
    name: 'DegreesPage',
    component: () => import('pages/Degrees/DegreesPage.vue'),
    meta: {
      title: 'Grados',
      requireAuth: true,
      noAuth: false,
      checkPermissions: true,
    },
  },
]

export default DegreeRoutes
