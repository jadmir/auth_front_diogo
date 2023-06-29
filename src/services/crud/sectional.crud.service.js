import { CrudAdapter } from 'src/adapter/crud.adapter'
import laravelConfig from 'src/services/config/laravelConfig'
import { SectionalModel } from 'src/models/sectional.model'

export class SectionalCrudService extends CrudAdapter {
  constructor() {
    super('/sectional', laravelConfig)
  }

  adapt(apiObject) {
    return SectionalModel.fromDto(apiObject)
  }

  adaptArray(apiObject) {
    return SectionalModel.fromArray(apiObject)
  }
}
