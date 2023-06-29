import { CrudAdapter } from 'src/adapter/crud.adapter'
import laravelConfig from 'src/services/config/laravelConfig'
import { CfpModel } from 'src/models/cfp.model'

export class CfpCrudService extends CrudAdapter {
  constructor() {
    super('/cfp', laravelConfig)
  }

  adapt(apiObject) {
    return CfpModel.fromDto(apiObject)
  }

  adaptArray(apiObject) {
    return CfpModel.fromArray(apiObject)
  }
}
