import { laravelAxiosConfig } from 'src/services/config'

export class AuthService {
  constructor() {
    this.baseUrl = '/auth'
    this.http = laravelAxiosConfig
  }

  async retrievePermissionsByRoleService({ role_id }) {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${this.baseUrl}/permissions-role/${role_id}`)
        .then((response) => {
          resolve(response.data.permissions)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  async updateRolePermissionsService({ roleId, permissionsChanged }) {
    return new Promise((resolve, reject) => {
      this.http
        .post(`${this.baseUrl}/change-role-permissions`, {
          roleId,
          permissionsChanged,
        })
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
