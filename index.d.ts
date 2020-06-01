// @flow

export function coerceToNumber(x: any): number | null
export function coerceToString(x: any): string | null
export function coerceToBoolean(x: any): boolean | null

export var coerceTo: {
  number: typeof coerceToNumber
  string: typeof coerceToString
  boolean: typeof coerceToBoolean
}
