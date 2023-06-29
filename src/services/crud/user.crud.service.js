import { CrudAdapter } from 'src/adapter/crud.adapter'
import { UserClass } from 'src/models/user.model'
import laravelConfig from 'src/services/config/laravelConfig'

export class UserCrudService extends CrudAdapter {
  constructor() {
    super('/users', laravelConfig)
  }
  adapt(apiObject) {
    return UserClass.fromDto(apiObject)
  }

  adaptArray(apiObject) {
    return UserClass.fromArray(apiObject)
  }
}
