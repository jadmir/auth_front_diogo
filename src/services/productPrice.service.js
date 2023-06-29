import { laravelAxiosConfig } from 'src/services/config'

class ProductPriceService {
  constructor() {
    this.http = laravelAxiosConfig
    this.baseUri = 'product-price'
  }

  getPricesByProductId({ productId }) {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${this.baseUri}/get-prices-by-product-id/${productId}`)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  savePrice({ price }) {
    return new Promise((resolve, reject) => {
      this.http
        .post(`${this.baseUri}/save`, price)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  updatePrice({ price }) {
    return new Promise((resolve, reject) => {
      this.http
        .post(`${this.baseUri}/update`, price)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  deletePrice({ price }) {
    return new Promise((resolve, reject) => {
      this.http
        .post(`${this.baseUri}/delete`, price)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  restorePrice({ price }) {
    return new Promise((resolve, reject) => {
      this.http
        .post(`${this.baseUri}/restore`, price)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

export default new ProductPriceService()
