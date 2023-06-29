import { laravelAxiosConfig } from 'src/services/config'

class SaleService {
  constructor() {
    this.http = laravelAxiosConfig
    this.baseUri = 'sale'
  }

  generateSale({ sale }) {
    return new Promise((resolve, reject) => {
      this.http
        .post(`${this.baseUri}`, sale)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  getSalesReport({ date }) {
    return new Promise((resolve, reject) => {
      this.http
        .post(`${this.baseUri}/report/date`, {
          date,
        })
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

export default new SaleService()
