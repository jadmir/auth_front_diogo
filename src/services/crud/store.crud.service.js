import { CrudAdapter } from 'src/adapter/crud.adapter'
import { StoreClass } from 'src/models/store.model'
import laravelConfig from 'src/services/config/laravelConfig'

export class StoreCrudService extends CrudAdapter {
  constructor() {
    super('/stores', laravelConfig)
  }
  adapt(apiObject) {
    return StoreClass.fromDto(apiObject)
  }

  adaptArray(apiObject) {
    return StoreClass.fromArray(apiObject)
  }
}
