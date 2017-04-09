export function getItem (key) {
  return JSON.parse(global.localStorage.getItem(key))
}

export function setItem (key, value) {
  return global.localStorage.setItem(key, JSON.stringify(value))
}

export function removeItem (key) {
  return global.localStorage.removeItem(key)
}
