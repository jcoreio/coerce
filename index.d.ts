export function coerceToNumber(x: any): number | null
export function coerceToBigInt(x: any): any
export function coerceToNumberOrBigInt(x: any): any
export function coerceToString(x: any): string | null
export function coerceToBoolean(x: any): boolean | null

export var coerceTo: {
  number: typeof coerceToNumber
  bigint: typeof coerceToBigInt
  numberOrBigInt: typeof coerceToNumberOrBigInt
  string: typeof coerceToString
  boolean: typeof coerceToBoolean
}
