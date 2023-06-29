import { CrudAdapter } from 'src/adapter/crud.adapter'
import laravelConfig from 'src/services/config/laravelConfig'
import { DiseaseModel } from 'src/models/disease.model'

export class DiseaseCrudService extends CrudAdapter {
  constructor() {
    super('/disease', laravelConfig)
  }

  adapt(apiObject) {
    return DiseaseModel.fromDto(apiObject)
  }

  adaptArray(apiObject) {
    return DiseaseModel.fromArray(apiObject)
  }
}
