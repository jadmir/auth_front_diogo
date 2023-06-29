import { CrudAdapter } from 'src/adapter/crud.adapter'
import laravelConfig from 'src/services/config/laravelConfig'
import { EducationLevelModel } from 'src/models/educationLevel.model'

export class EducationLevelCrudService extends CrudAdapter {
  constructor() {
    super('/education_level', laravelConfig)
  }

  adapt(apiObject) {
    return EducationLevelModel.fromDto(apiObject)
  }

  adaptArray(apiObject) {
    return EducationLevelModel.fromArray(apiObject)
  }
}
