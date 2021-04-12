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

export const saveState = (key, value) => {
  try {
    const serializedState = JSON.stringify(value)
    localStorage.removeItem(key)
    localStorage.setItem(key, serializedState)
  } catch {
    // ignore write errors
  }
}
