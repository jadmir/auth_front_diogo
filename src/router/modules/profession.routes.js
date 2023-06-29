const ProfessionRoutes = [
  {
    path: 'professions',
    name: 'ProfessionsPage',
    component: () => import('pages/Professions/ProfessionsPage.vue'),
    meta: {
      title: 'Profesiones',
      requireAuth: true,
      noAuth: false,
      checkPermissions: true,
    },
  },
]

export default ProfessionRoutes
