export function setStorage (key, data) {
  sessionStorage.setItem(key, data)
}
export function getStorage (key) {
  return sessionStorage.getItem(key)
}
