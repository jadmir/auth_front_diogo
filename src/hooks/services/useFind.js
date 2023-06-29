const useFind = ({ service }) => {
  const find = async ({ id, activeStatus }) => {
    try {
      return await service.read(id, { activeStatus })
    } catch (error) {
      console.error(error)
    }
  }

  return [find]
}

export default useFind
