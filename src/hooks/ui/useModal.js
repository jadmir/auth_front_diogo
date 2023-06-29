import { ref, watch } from 'vue'

const defaultProps = {
  showCallback: () => {},
  hideCallback: () => {},
}

const useModal = ({
  showCallback = defaultProps.showCallback,
  hideCallback = defaultProps.hideCallback,
} = defaultProps) => {
  const isShowing = ref(false)

  const showModal = () => {
    showCallback()
    isShowing.value = true
  }

  const hideModal = () => {
    hideCallback()
    isShowing.value = false
  }

  watch(isShowing, (newValue) => {
    if (newValue) {
      showCallback()
    } else {
      hideCallback()
    }
  })

  return [isShowing, showModal, hideModal]
}
export default useModal
