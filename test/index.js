var expect = require('chai').expect
var coerceTo = require('..').coerceTo

function stringify(x) {
  switch (typeof x) {
    case 'undefined':
      return 'undefined'
    case 'number':
      return String(x)
    case 'bigint':
      return String(x) + 'n'
  }
  return JSON.stringify(x)
}

function tests(fn, cases) {
  describe(fn.name, function() {
    cases.forEach(function(values) {
      var input = values[0]
      var expected = values[1]
      it(stringify(input) + ' ->  ' + stringify(expected), function() {
        expected !== expected
          ? expect(fn(input)).to.be.NaN
          : expect(fn(input)).to.equal(expected)
      })
    })
  })
}

tests(coerceTo.number, [
  [0, 0],
  [1, 1],
  [1n, 1],
  [-1, -1],
  [NaN, NaN],
  [Infinity, Infinity],
  [-Infinity, -Infinity],
  [24.5e3, 24.5e3],
  [null, null],
  [undefined, null],
  ['', null],
  ['3', 3],
  ['24.5e3', 24.5e3],
  ['Infinity', Infinity],
  ['-Infinity', -Infinity],
  ['foob', null],
  ['NaN', NaN],
  [false, 0],
  [true, 1],
  [new Date(12345), 12345],
  [{}, null],
  [[], null],
])

tests(coerceTo.bigint, [
  [0, 0n],
  [1, 1n],
  [1n, 1n],
  [-1, -1n],
  [NaN, null],
  [Infinity, null],
  [-Infinity, null],
  [24.5e3, 24500n],
  [3.5, 4n],
  [null, null],
  [undefined, null],
  ['', null],
  ['3', 3n],
  ['24.5e3', 24500n],
  ['Infinity', null],
  ['-Infinity', null],
  ['foob', null],
  ['NaN', null],
  [false, 0n],
  [true, 1n],
  [new Date(12345), 12345n],
  [{}, null],
  [[], null],
])

tests(coerceTo.numberOrBigInt, [
  [0, 0],
  [1, 1],
  [1n, 1n],
  [-1, -1],
  [NaN, NaN],
  [Infinity, Infinity],
  [-Infinity, -Infinity],
  [24.5e3, 24.5e3],
  [String(Number.MIN_SAFE_INTEGER), Number.MIN_SAFE_INTEGER],
  [String(Number.MAX_SAFE_INTEGER), Number.MAX_SAFE_INTEGER],
  [
    String(BigInt(Number.MIN_SAFE_INTEGER) - BigInt(1)),
    BigInt(Number.MIN_SAFE_INTEGER) - BigInt(1),
  ],
  [
    String(BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1)),
    BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1),
  ],
  [null, null],
  [undefined, null],
  ['', null],
  ['3', 3],
  ['24.5e3', 24.5e3],
  ['Infinity', Infinity],
  ['-Infinity', -Infinity],
  ['foob', null],
  ['NaN', NaN],
  [false, 0],
  [true, 1],
  [new Date(12345), 12345],
  [{}, null],
  [[], null],
])

tests(coerceTo.string, [
  ['', ''],
  ['3', '3'],
  ['24.5e3', '24.5e3'],
  [0, '0'],
  [1, '1'],
  [1n, '1'],
  [NaN, 'NaN'],
  [Infinity, 'Infinity'],
  [-Infinity, '-Infinity'],
  [24.5e3, '24500'],
  [null, null],
  [undefined, null],
  [false, 'false'],
  [true, 'true'],
  [{ foo: [1, 2, 3] }, '{"foo":[1,2,3]}'],
  [[1, 2, 3], '[1,2,3]'],
  [new Date('Jan 1 2020'), new Date('Jan 1 2020').toISOString()],
])

tests(coerceTo.boolean, [
  [false, false],
  [true, true],
  [0, false],
  [1, true],
  [0n, false],
  [1000n, true],
  [-1, true],
  [2, true],
  [NaN, null],
  [Infinity, true],
  [-Infinity, true],
  [null, null],
  [undefined, null],
  ['False', false],
  ['FALSE', false],
  ['false', false],
  ['F', false],
  ['f', false],
  ['True', true],
  ['TRUE', true],
  ['true', true],
  ['T', true],
  ['t', true],
  ['0', false],
  ['1', true],
  ['', null],
  ['3', null],
  ['24.5e3', null],
  ['fals', null],
  ['tru', null],
  [new Date(12345), null],
  [{}, null],
  [[], null],
])
