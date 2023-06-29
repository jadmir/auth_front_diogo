import { CrudAdapter } from 'src/adapter/crud.adapter'
import laravelConfig from 'src/services/config/laravelConfig'
import { CivilStatusModel } from 'src/models/civilStatus.model'

export class CivilStatusCrudService extends CrudAdapter {
  constructor() {
    super('/civil_status', laravelConfig)
  }

  adapt(apiObject) {
    return CivilStatusModel.fromDto(apiObject)
  }

  adaptArray(apiObject) {
    return CivilStatusModel.fromArray(apiObject)
  }
}
