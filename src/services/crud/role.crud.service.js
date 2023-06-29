import { CrudAdapter } from 'src/adapter/crud.adapter'
import laravelConfig from 'src/services/config/laravelConfig'
import { RoleClass } from 'src/models/role.model'

export class RoleCrudService extends CrudAdapter {
  constructor() {
    super('/roles', laravelConfig)
  }

  setRoleToUser({ userId, roleId }) {
    return this.http.post(`${this.baseUrl}/set-to-user`, { roleId, userId })
  }
  adapt(apiObject) {
    return RoleClass.fromDto(apiObject)
  }

  adaptArray(apiObject) {
    return RoleClass.fromArray(apiObject)
  }
}
