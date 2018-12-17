let getInteger = value => {
  return Math.floor(parseFloat(value))
}

let getFixed1 = value => {
  let float = parseFloat(parseFloat(value) - Math.floor(parseFloat(value))).toFixed(2).substr(1)
  if (float.length === 2) {
    float += '0'
  }
  return float
}
export {
  getInteger,
  getFixed1
}
