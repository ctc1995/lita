function setStorage (key, data) {
  sessionStorage.setItem(key, data)
}
function getStorage (key) {
  return sessionStorage.getItem(key)
}
function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

// json转义XML
function js2xml (obj) {
  let xml = '<xml>'
  for (let [k, v] of Object.entries(obj)) {
    let el = `<${k}>${v}</${k}>`
    xml += el
  }
  xml += '</xml>'
  return xml
}

// 生成订单号
function createNum (index) {
  let random = new Date().getTime().toString()
  let num = random + this.rand(Math.random() * random.slice(random.length - index))
  return num
}
// 随机数算法
function rnd (seed) {
  seed = (seed * 9301 + 49297) % 233280
  return seed / (233280.0)
}
function rand (number) {
  let today = new Date()
  let seed = today.getTime()
  return Math.ceil(rnd(seed) * number)
}
export default {
  js2xml,
  createNum,
  rand,
  setStorage,
  getStorage
}
