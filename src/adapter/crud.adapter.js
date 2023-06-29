import { ActiveStatusEnum } from 'src/services/utils/http.types'

/**
 * Clase abstracta para definir los métodos de un servicio CRUD
 */
export class CrudAdapter {
  /**
   * Constructor de la clase
   * @param baseUrl
   * @param http
   */
  constructor(baseUrl, http) {
    this.baseUrl = baseUrl
    this.http = http
  }

  async readAll({
    page = 1,
    activeStatus = ActiveStatusEnum.active,
    query,
    filters,
    limit,
  }) {
    console.log(`query to search ${query}`, limit)
    filters?.forEach((filter) => {
      console.log(filter)
    })
    const { data } = await this.http.get(this.baseUrl, {
      params: {
        page,
        isActive:
          activeStatus === ActiveStatusEnum.all ? undefined : activeStatus,
        q: query?.length > 0 ? query : undefined,
        limit: limit >= 0 ? limit : undefined,
      },
    })

    return {
      data: this.adaptArray(data.data),
      page: data.meta?.current_page,
      total: data.meta?.total,
      perPage: data.meta?.per_page,
      lastPage: data.meta?.last_page,
    }
  }

  async create(object) {
    const { data } = await this.http.post(this.baseUrl, object)
    return this.adapt(data.data)
  }

  async read(id, { activeStatus } = { activeStatus: ActiveStatusEnum.active }) {
    const { data } = await this.http.get(`${this.baseUrl}/${id}`, {
      params: {
        isActive:
          activeStatus === ActiveStatusEnum.all ? undefined : activeStatus,
      },
    })
    return this.adapt(data.data)
  }

  async update(id, object) {
    const { data } = await this.http.put(`${this.baseUrl}/${id}`, object)
    return this.adapt(data.data)
  }

  async delete(id) {
    const { data } = await this.http.delete(`${this.baseUrl}/${id}`)
    return this.adapt(data.data)
  }

  async restore(id) {
    const { data } = await this.http.put(`${this.baseUrl}/restore/${id}`)
    return this.adapt(data.data)
  }

  adapt(apiObject) {} // Método abstracto para adaptar la respuesta de la API a la interfaz de objeto genérico

  adaptArray(apiObject) {} // Método abstracto para adaptar la respuesta de la API a la interfaz de objeto genérico
}
