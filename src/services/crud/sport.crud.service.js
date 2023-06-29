import { CrudAdapter } from 'src/adapter/crud.adapter'
import laravelConfig from 'src/services/config/laravelConfig'
import { SportModel } from 'src/models/sport.model'

export class SportCrudService extends CrudAdapter {
  constructor() {
    super('/sport', laravelConfig)
  }

  adapt(apiObject) {
    return SportModel.fromDto(apiObject)
  }

  adaptArray(apiObject) {
    return SportModel.fromArray(apiObject)
  }
}
