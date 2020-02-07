import objectMap from "./objectMap"

describe('objectMap', () => {
  test('Only mapping values', () => {
    const input = { a: 1, b: 2, c: 3 }

    const output = objectMap(
      ([key, val]) => [key, val * 2],
      input
    )

    expect(output).toEqual({ a: 2, b: 4, c: 6 })
  })

  test('Only mapping keys', () => {
    const input = { a: 1, b: 2, c: 3 }

    const output = objectMap(
      ([key, val]) => [key.toUpperCase(), val],
      input
    )

    expect(output).toEqual({ A: 1, B: 2, C: 3 })
  })

  test('mapping keys and values', () => {
    const input = { a: 1, b: 2, c: 3 }

    const output = objectMap(
      ([key, val]) => [key.toUpperCase(), val * 2],
      input
    )

    expect(output).toEqual({ A: 2, B: 4, C: 6 })
  })
})