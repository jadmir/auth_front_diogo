export const getPrefixStorage = () => {
  return process.env.PREFIX_STORAGE || 'JS'
}

export const deepCloneObject = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}
