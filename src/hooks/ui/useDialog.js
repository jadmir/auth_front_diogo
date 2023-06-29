import { useQuasar } from 'quasar'

const useDialog = () => {
  const $q = useQuasar()

  const showConfirm = ({
    title,
    message,
    cancel = true,
    persistent = false,
    ok = 'OK',
  }) => {
    return new Promise((resolve) => {
      $q.dialog({
        title,
        message,
        cancel,
        persistent,
        ok,
      })
        .onOk(() => {
          resolve(true)
        })
        .onOk(() => {
          resolve(true)
        })
        .onCancel(() => {
          resolve(false)
        })
        .onDismiss(() => {
          resolve(false)
        })
    })
  }

  return {
    showConfirm,
  }
}

export default useDialog
