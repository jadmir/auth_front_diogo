import BaseModel from 'src/models/base.model'

export class DegreeModel extends BaseModel {
  constructor(id = 0, name = '', meta = {}) {
    super()
    this.id = id
    this.name = name
    this.meta = meta
  }

  static fromDto(dto) {
    const c = new DegreeModel()
    return BaseModel.fromJson(dto, c)
  }

  static fromArray(array) {
    return array.map((dto) => DegreeModel.fromDto(dto))
  }
}
