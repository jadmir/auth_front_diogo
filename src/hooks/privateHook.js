const usePrivateHook = () => {
  const setUserPropValue = ({ props }) => {
    const { user } = props
    if (typeof user === 'string') {
      return JSON.parse(user)
    } else if (typeof user === 'object') {
      return user
    }
    return {}
  }

  return { setUserPropValue }
}

export default usePrivateHook
