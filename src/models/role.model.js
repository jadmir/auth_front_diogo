import BaseModel from 'src/models/base.model'

export class RoleClass extends BaseModel {
  constructor(id = 0, name = '', description = '', meta = {}) {
    super()
    this.id = id
    this.name = name
    this.description = description
    this.meta = meta
  }

  static fromDto(dto) {
    const c = new RoleClass()
    return BaseModel.fromJson(dto, c)
  }

  static fromArray(array) {
    return array.map((dto) => RoleClass.fromDto(dto))
  }
}
