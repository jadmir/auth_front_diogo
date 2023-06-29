import BaseModel from 'src/models/base.model'
import { RoleClass } from 'src/models/role.model'

export class UserClass extends BaseModel {
  constructor(
    id = 0,
    document = '',
    name = '',
    email = '',
    roles = [],
    meta = {}
  ) {
    super()
    this.id = id
    this.document = document
    this.name = name
    this.email = email
    this.roles = roles
    this.meta = meta
  }

  static fromDto(dto) {
    return BaseModel.fromJson(dto, new UserClass())
  }

  static fromArray(array) {
    return array.map((dto) => {
      const user = UserClass.fromDto(dto)
      if (dto.roles?.length) user.roles = RoleClass.fromArray(dto.roles)
      return user
    })
  }
}
