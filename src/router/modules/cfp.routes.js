const CfpRoutes = [
  {
    path: 'cfps',
    name: 'CfpsPage',
    component: () => import('pages/Cfps/CfpsPage.vue'),
    meta: {
      title: 'Cfps',
      requireAuth: true,
      noAuth: false,
      checkPermissions: true,
    },
  },
]

export default CfpRoutes
