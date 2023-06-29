const EducationLevelRoutes = [
  {
    path: 'education-levels',
    name: 'EducationsLevelsPage',
    component: () => import('pages/EducationLevels/EducationLevelsPage.vue'),
    meta: {
      title: 'Niveles educativos',
      requireAuth: true,
      noAuth: false,
      checkPermissions: true,
    },
  },
]

export default EducationLevelRoutes
