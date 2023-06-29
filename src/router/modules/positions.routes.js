const PositionsRoutes = [
  {
    path: 'positions',
    name: 'PositionsPage',
    component: () => import('pages/Positions/PositionsPage.vue'),
    meta: {
      title: 'Cargos',
      requireAuth: true,
      noAuth: false,
      checkPermissions: true,
    },
  },
]

export default PositionsRoutes
