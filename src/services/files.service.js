import { laravelAxiosConfig } from 'src/services/config'

export class FilesService {
  static upload(file, folderName) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', folderName)
    return new Promise((resolve, reject) => {
      laravelAxiosConfig
        .request({
          method: 'post',
          url: '/v1/files/upload',
          data: formData,
        })
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => reject(error))
    })
  }

  static delete(nameWithFolder) {
    return new Promise((resolve, reject) => {
      laravelAxiosConfig
        .request({
          method: 'post',
          url: '/v1/files/delete',
          data: {
            nameWithFolder,
          },
        })
        .then(() => {
          resolve()
        })
        .catch((error) => reject(error))
    })
  }
}
