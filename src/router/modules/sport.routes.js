const SportRoutes = [
  {
    path: 'sports',
    name: 'SportsPage',
    component: () => import('pages/Sports/SportsPage.vue'),
    meta: {
      title: 'Deportes',
      requireAuth: true,
      noAuth: false,
      checkPermissions: true,
    },
  },
]

export default SportRoutes
