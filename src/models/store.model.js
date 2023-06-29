import BaseModel from 'src/models/base.model'
import { RoleClass } from 'src/models/role.model'

export class StoreClass extends BaseModel {
  constructor(
    id = 0,
    name = '',
    address = '',
    phone = '',
    observations = '',
    roles = [],
    meta = {}
  ) {
    super()
    this.id = id
    this.name = name
    this.address = address
    this.phone = phone
    this.observations = observations
    this.roles = roles
    this.meta = meta
  }

  static fromDto(dto) {
    return BaseModel.fromJson(dto, new StoreClass())
  }

  static fromArray(array) {
    return array.map((dto) => {
      const store = StoreClass.fromDto(dto)
      if (dto.roles?.length) store.roles = RoleClass.fromArray(dto.roles)
      return store
    })
  }
}
