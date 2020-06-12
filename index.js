'use strict'

function coerceToNumber(x) {
  switch (typeof x) {
    case 'bigint':
      return Number(x)
    case 'string': {
      var parsed = Number(x)
      if (isNaN(parsed) || x === '') {
        return x.toLowerCase() === 'nan' ? NaN : null
      }
      return parsed
    }
    case 'object':
      if (x == null || !(x instanceof Date)) return null
      break
    case 'undefined':
      return null
  }
  return Number(x)
}

function coerceToBigInt(x) {
  switch (typeof x) {
    case 'bigint':
      return x
    case 'string':
      if (x === '') return null
      break
    case 'object':
      if (x == null || !(x instanceof Date)) return null
      break
    case 'undefined':
      return null
    case 'number':
      x = Math.round(x)
      break
  }
  try {
    return BigInt(x)
  } catch (e) {
    if (typeof x === 'string') return coerceToBigInt(coerceToNumber(x))
    return null
  }
}

function coerceToNumberOrBigInt(x) {
  switch (typeof x) {
    case 'number':
    case 'bigint':
      return x
    case 'string': {
      if (x === '') return null
      const parsed = Number(x)
      if (isNaN(parsed) || x === '') {
        return x.toLowerCase() === 'nan' ? NaN : null
      }
      if (
        parsed < Number.MIN_SAFE_INTEGER ||
        parsed > Number.MAX_SAFE_INTEGER
      ) {
        try {
          return BigInt(x)
        } catch (e) {
          return parsed
        }
      }
      break
    }
    case 'object':
      if (x == null || !(x instanceof Date)) return null
      break
    case 'undefined':
      return null
  }
  return Number(x)
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
exports.coerceToNumberOrBigInt = coerceToNumberOrBigInt
exports.coerceToString = coerceToString
exports.coerceToBoolean = coerceToBoolean
exports.coerceToBigInt = coerceToBigInt
exports.coerceTo = {
  number: coerceToNumber,
  numberOrBigInt: coerceToNumberOrBigInt,
  string: coerceToString,
  boolean: coerceToBoolean,
  bigint: coerceToBigInt,
}
