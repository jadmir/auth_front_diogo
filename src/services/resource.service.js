import { laravelAxiosConfig } from 'src/services/config'
import { isActiveFilterEnum, isActiveParamEnum } from 'src/types/http.types'

export default class ResourceService {
  constructor(uriResource) {
    this.http = laravelAxiosConfig
    this.uriResource = uriResource
  }

  all({ page, isActiveStatus = isActiveFilterEnum.ALL, extraParams = {} }) {
    const softDeleteParam = isActiveParamEnum[isActiveStatus]
    return new Promise((resolve, reject) => {
      this.http
        .get(`${this.uriResource}`, {
          params: {
            page,
            ...extraParams,
            ...softDeleteParam,
          },
        })
        .then((response) => {
          resolve({
            data: response.data.data,
            pagination: response.data.meta,
          })
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  search({
    q = '',
    page = 1,
    isActiveStatus = isActiveFilterEnum.ALL,
    extraParams = {},
    extraSearchParams = {},
  }) {
    const softDeleteParam = isActiveParamEnum[isActiveStatus]
    const dataSearch =
      q.length > 0
        ? {
            search: {
              value: q,
              case_sensitive: false,
            },
          }
        : undefined

    return new Promise((resolve, reject) => {
      this.http
        .post(
          `${this.uriResource}/search`,
          { ...dataSearch, ...extraSearchParams },
          { params: { page, ...softDeleteParam, ...extraParams } }
        )
        .then((response) => {
          resolve({
            data: response.data.data,
            pagination: response.data.meta,
          })
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  find({ id, isActiveStatus = isActiveFilterEnum.ALL }) {
    const softDeleteParam = isActiveParamEnum[isActiveStatus]
    return new Promise((resolve, reject) => {
      this.http
        .get(`${this.uriResource}/${id}`, { params: { ...softDeleteParam } })
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  store({ data }) {
    return new Promise((resolve, reject) => {
      this.http
        .post(`${this.uriResource}`, data)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  update({ id, data }) {
    return new Promise((resolve, reject) => {
      this.http
        .put(`${this.uriResource}/${id}`, data)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  remove({ id }) {
    return new Promise((resolve, reject) => {
      this.http
        .delete(`${this.uriResource}/${id}`)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  restore({ id }) {
    return new Promise((resolve, reject) => {
      this.http
        .post(`${this.uriResource}/${id}/restore`)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
