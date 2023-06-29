import userRoutes from 'src/router/modules/user.routes'
import professionRoutes from 'src/router/modules/profession.routes'
import positionsRoutes from 'src/router/modules/positions.routes'
import bloodTypeRoutes from 'src/router/modules/bloodType.routes'
import diseaseRoutes from 'src/router/modules/disease.routes'
import sportRoutes from 'src/router/modules/sport.routes'
import sectionalRoutes from 'src/router/modules/sectional.routes'
import schoolRoutes from 'src/router/modules/school.routes'
import civilStatusRoutes from 'src/router/modules/civilStatus.routes'
import educationLevelRoutes from 'src/router/modules/educationLevel.routes'
import cfpRoutes from 'src/router/modules/cfp.routes'
import degreeRoutes from 'src/router/modules/degree.routes'
import storeRoutes from 'src/router/modules/store.routes'

const childrenRoutes = [
  ...storeRoutes,
  ...userRoutes,
  ...professionRoutes,
  ...positionsRoutes,
  ...bloodTypeRoutes,
  ...diseaseRoutes,
  ...sportRoutes,
  ...sectionalRoutes,
  ...schoolRoutes,
  ...civilStatusRoutes,
  ...educationLevelRoutes,
  ...cfpRoutes,
  ...degreeRoutes,
]

const principalLayoutRoutes = [
  {
    path: '/',
    component: () => import('layouts/PrincipalLayout.vue'),
    children: [
      {
        path: 'inicio',
        name: 'IndexPage',
        component: () => import('pages/IndexPage.vue'),
        meta: {
          title: 'Inicio',
          requireAuth: true,
          noAuth: false,
          checkPermissions: false,
        },
      },
      {
        path: 'account',
        name: 'AccountPage',
        component: () => import('pages/MyAccount/MyData.vue'),
        meta: {
          title: 'Mi cuenta',
          requireAuth: true,
          noAuth: false,
          checkPermissions: true,
        },
      },
      ...childrenRoutes,
    ],
  },
]

export default principalLayoutRoutes
