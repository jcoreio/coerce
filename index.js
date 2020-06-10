'use strict'

function coerceToNumber(x) {
  switch (typeof x) {
    case 'bigint':
      return x
    case 'string': {
      var parsed = Number(x)
      if (isNaN(parsed) || x === '') {
        return x.toLowerCase() === 'nan' ? NaN : null
      }
      return parsed
    }
  }
  return x == null ||
    x === '' ||
    (typeof x === 'object' && !(x instanceof Date))
    ? null
    : Number(x)
}

function coerceToString(x) {
  return x == null
    ? null
    : x instanceof Date
    ? x.toISOString()
    : typeof x === 'object'
    ? JSON.stringify(x)
    : String(x)
}

function coerceToBoolean(x) {
  if (x !== x) return null
  switch (typeof x) {
    case 'string':
      switch (x.toLowerCase()) {
        case 't':
        case 'true':
        case '1':
          return true
        case 'f':
        case 'false':
        case '0':
          return false
        default:
          return null
      }
    case 'number':
    case 'bigint':
      return Boolean(x)
    case 'boolean':
      return x
    default:
      return null
  }
}

exports.coerceToNumber = coerceToNumber
exports.coerceToString = coerceToString
exports.coerceToBoolean = coerceToBoolean
exports.coerceTo = {
  number: coerceToNumber,
  string: coerceToString,
  boolean: coerceToBoolean,
}
