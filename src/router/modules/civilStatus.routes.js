const CivilStatusRoutes = [
  {
    path: 'civil-statuses',
    name: 'CivilStatusesPage',
    component: () => import('pages/CivilStatuses/CivilStatusesPage.vue'),
    meta: {
      title: 'Estados civiles',
      requireAuth: true,
      noAuth: false,
      checkPermissions: true,
    },
  },
]

export default CivilStatusRoutes
