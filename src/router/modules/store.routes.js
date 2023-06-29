const StoreRoutes = [
  {
    path: 'stores',
    name: 'storesPage',
    component: () => import('pages/stores/StoresPage.vue'),
    meta: {
      title: 'Almacenes',
      requireAuth: true,
      noAuth: false,
      checkPermissions: true,
    },
  },
]

export default StoreRoutes
