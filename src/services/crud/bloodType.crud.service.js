import { CrudAdapter } from 'src/adapter/crud.adapter'
import laravelConfig from 'src/services/config/laravelConfig'
import { BloodTypeModel } from 'src/models/bloodType.model'

export class BloodTypeCrudService extends CrudAdapter {
  constructor() {
    super('/blood-type', laravelConfig)
  }

  adapt(apiObject) {
    return BloodTypeModel.fromDto(apiObject)
  }

  adaptArray(apiObject) {
    return BloodTypeModel.fromArray(apiObject)
  }
}
