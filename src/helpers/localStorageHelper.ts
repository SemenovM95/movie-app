const saveToLocalStorage = (key: string, value: any) => {
  const stringifiedValue = JSON.stringify(value)
  localStorage.setItem(key, stringifiedValue)
}

const getFromLocalStorage = (key: string) => {
  const found = localStorage.getItem(key)
  if (found) return JSON.parse(found)
  return null
}

const updateToLocalStorage = (key: string, value: any) => {
  const stored = getFromLocalStorage(key)
  if (stored) {
    const found = stored.findIndex((item: any) => item.id === value.id)
    if (found !== -1) {
      stored[found] = value
      saveToLocalStorage(key, stored)
      return true
    }
    saveToLocalStorage(key, [...stored, value])
    return true
  }
  saveToLocalStorage(key, [value])
  return true
}

export default { saveToLocalStorage, getFromLocalStorage, updateToLocalStorage }
