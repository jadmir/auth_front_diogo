import { CrudAdapter } from 'src/adapter/crud.adapter'
import laravelConfig from 'src/services/config/laravelConfig'
import { ProfessionModel } from 'src/models/profession.model'

export class ProfessionCrudService extends CrudAdapter {
  constructor() {
    super('/profession', laravelConfig)
  }

  adapt(apiObject) {
    return ProfessionModel.fromDto(apiObject)
  }

  adaptArray(apiObject) {
    return ProfessionModel.fromArray(apiObject)
  }
}
