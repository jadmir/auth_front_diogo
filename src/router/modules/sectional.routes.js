const SectionalRoutes = [
  {
    path: 'sectionals',
    name: 'SectionalsPage',
    component: () => import('pages/Sectionals/SectionalsPage.vue'),
    meta: {
      title: 'Seccionales',
      requireAuth: true,
      noAuth: false,
      checkPermissions: true,
    },
  },
]

export default SectionalRoutes
