import { laravelAxiosConfig } from 'src/services/config'

class UserRoleService {
  constructor() {
    this.http = laravelAxiosConfig
  }

  async updateUserRoleService(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post('/role/update', data)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  async retrieveModulesAndPermissionsService({ role_id }) {
    return new Promise((resolve, reject) => {
      this.http
        .get(`permissions/active-modules/${role_id}`)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  async updatePermissions(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post('role/update-permissions', data)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

export default new UserRoleService()
