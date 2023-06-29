export default class BaseModel {
  static fromJson(json, obj) {
    for (const key in json) {
      if (key in obj) {
        obj[key] = json[key]
      }
    }
    return obj
  }
}
