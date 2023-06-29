import { Notify } from 'quasar'

export const showNotifyError = (message) => {
  Notify.create({
    message,
    color: 'negative',
    position: 'top-right',
  })
}

export const showNotifySuccess = (
  message = 'La acción fue realizada correctamente'
) => {
  Notify.create({
    message,
    color: 'positive',
    position: 'top-right',
  })
}
