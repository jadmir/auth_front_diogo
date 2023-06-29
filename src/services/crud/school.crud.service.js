import { CrudAdapter } from 'src/adapter/crud.adapter'
import laravelConfig from 'src/services/config/laravelConfig'
import { SchoolModel } from 'src/models/school.model'

export class SchoolCrudService extends CrudAdapter {
  constructor() {
    super('/school', laravelConfig)
  }

  adapt(apiObject) {
    return SchoolModel.fromDto(apiObject)
  }

  adaptArray(apiObject) {
    return SchoolModel.fromArray(apiObject)
  }
}
