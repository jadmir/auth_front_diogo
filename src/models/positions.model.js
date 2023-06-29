import BaseModel from 'src/models/base.model'

export class PositionsModel extends BaseModel {
  constructor(id = 0, name = '', meta = {}) {
    super()
    this.id = id
    this.name = name
    this.meta = meta
  }

  static fromDto(dto) {
    const c = new PositionsModel()
    return BaseModel.fromJson(dto, c)
  }

  static fromArray(array) {
    return array.map((dto) => PositionsModel.fromDto(dto))
  }
}
