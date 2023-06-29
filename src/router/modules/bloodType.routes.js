const BloodTypesRoutes = [
  {
    path: 'blood-types',
    name: 'BloodTypesPage',
    component: () => import('pages/BloodTypes/BloodTypesPage.vue'),
    meta: {
      title: 'Tipo de sangre',
      requireAuth: true,
      noAuth: false,
      checkPermissions: true,
    },
  },
]

export default BloodTypesRoutes
