const DiseaseRoutes = [
  {
    path: 'diseases',
    name: 'DiseasesPage',
    component: () => import('pages/Diseases/DiseasesPage.vue'),
    meta: {
      title: 'Enfermedades',
      requireAuth: true,
      noAuth: false,
      checkPermissions: true,
    },
  },
]

export default DiseaseRoutes
