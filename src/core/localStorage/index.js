export const loadState = (itemKey) => {
  try {
    const serializedState = localStorage.getItem(itemKey)
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const removeState = (itemKey) => localStorage.removeItem(itemKey)

export const saveState = (itemKey, itemValue) => {
  try {
    const serializedState = JSON.stringify(itemValue)
    localStorage.removeItem(itemKey)
    localStorage.setItem(itemKey, serializedState)
  } catch {
    // ignore write errors
  }
}
