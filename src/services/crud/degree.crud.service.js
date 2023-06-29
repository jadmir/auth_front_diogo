import { CrudAdapter } from 'src/adapter/crud.adapter'
import laravelConfig from 'src/services/config/laravelConfig'
import { DegreeModel } from 'src/models/degree.model'

export class DegreeCrudService extends CrudAdapter {
  constructor() {
    super('/degree', laravelConfig)
  }

  adapt(apiObject) {
    return DegreeModel.fromDto(apiObject)
  }

  adaptArray(apiObject) {
    return DegreeModel.fromArray(apiObject)
  }
}
