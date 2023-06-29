import BaseModel from 'src/models/base.model'
import { SectionalModel } from 'src/models/sectional.model'

export class CfpModel extends BaseModel {
  constructor(id = 0, name = '', sectional_id = 0, meta = {}) {
    super()
    this.id = id
    this.name = name
    this.sectional_id = sectional_id
    this.meta = meta

    this.sectional = {}
  }

  static fromDto(dto) {
    const c = new CfpModel()
    const entity = BaseModel.fromJson(dto, c)
    if (dto.sectional) {
      entity.sectional = SectionalModel.fromDto(dto.sectional)
    }
    return entity
  }

  static fromArray(array) {
    return array.map((dto) => CfpModel.fromDto(dto))
  }
}
