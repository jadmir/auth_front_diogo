import BaseModel from 'src/models/base.model'

export class BloodTypeModel extends BaseModel {
  constructor(id = 0, name = '', meta = {}) {
    super()
    this.id = id
    this.name = name
    this.meta = meta
  }

  static fromDto(dto) {
    const c = new BloodTypeModel()
    return BaseModel.fromJson(dto, c)
  }

  static fromArray(array) {
    return array.map((dto) => BloodTypeModel.fromDto(dto))
  }
}
