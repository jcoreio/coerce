# @jcoreio/coerce

[![CircleCI](https://circleci.com/gh/jcoreio/coerce.svg?style=svg)](https://circleci.com/gh/jcoreio/coerce)
[![Coverage Status](https://codecov.io/gh/jcoreio/coerce/branch/master/graph/badge.svg)](https://codecov.io/gh/jcoreio/coerce)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![npm version](https://badge.fury.io/js/%40jcoreio%2Fcoerce.svg)](https://badge.fury.io/js/%40jcoreio%2Fcoerce)

Our company standard JS type coercions for time series values

# API

## `coerceToNumber(x: any): number | null`

Coerces the given value to a number.

```
const { coerceToNumber } = require('@jcoreio/coerce')
console.log(coerceToNumber(true)) // 1
```

### Rules:

- `null`, `undefined`, or string that isn't a valid number literal get coerced to `null`
- `Date` gets coerced to timestamp
- Any other object gets coerced to `null`
- Any other primitive value gets coerced with `Number(x)`

## `coerceToBigInt(x: any): bigint | null`

Coerces the given value to a bigint.

```
const { coerceToBigInt } = require('@jcoreio/coerce')
console.log(coerceToBigInt(true)) // 1n
```

### Rules:

- `null`, `undefined`, or string that isn't a valid number literal get coerced to `null`
- `Date` gets coerced to timestamp bigint
- Any other object gets coerced to `null`
- Any other primitive value gets coerced with `BigInt(x)`
  - numbers get rounded first
  - if `BigInt(string)` fails, uses `BigInt(coerceToNumber(string))`

## `coerceToNumberOrBigInt(x: any): bigint | null`

Coerces the given value to a number or bigint, whichever is more suitable.

```
const { coerceToNumberOrBigInt } = require('@jcoreio/coerce')
console.log(coerceToNumberOrBigInt('25e4')) // 250000
console.log(coerceToNumberOrBigInt('9007199254740992')) // 9007199254740992n
```

### Rules:

- `null`, `undefined`, or string that isn't a valid number literal get coerced to `null`
- integer string literals outside the safe integer range get coerced to bigint
- `Date` gets coerced to timestamp number
- Any other object gets coerced to `null`
- Any other primitive value gets coerced with `Number(x)`

## `coerceToString(x: any): string | null`

Coerces the given value to a string.

```
const { coerceToString } = require('@jcoreio/coerce')
console.log(coerceToString(1)) // '1'
```

### Rules:

- `null` and `undefined` get coerced to `null`
- `Date` gets coerced to ISO string
- Any other object gets `JSON.stringify`ed
- Any other primitive value gets coerced with `String(x)`

## `coerceToBoolean(x: any): boolean | null`

Coerces the given value to a boolean.

```
const { coerceToBoolean } = require('@jcoreio/coerce')
console.log(coerceToBoolean(1)) // true
```

### Rules:

- `'0'`, `'f'`, and `'false'` (in any case) get coerced to `false`
- `'1'`, `'t'`, and `'true'` (in any case) get coerced to `true`
- Any number besides `NaN` gets coerced with `Boolean(x)`
- Any other non-boolean value gets coerced to `null`

## `coerceTo['number' | 'bigint' | 'numberOrBigInt' | 'string' | 'boolean']`

This is just a map from the type name to the coercion function:

```
const { coerceTo } = require('@jcoreio/coerce')
console.log(coerceTo['string'](3)) // '3'
```
