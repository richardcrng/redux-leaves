import { updateState } from "."

describe('updateState', () => {
  test("Handles nested state pointing to an array", () => {
    const initialState = { arr: [{ nested: true }] }

    const result = updateState(initialState, ['arr', 0, 'nested'], false)
    expect(initialState).toEqual({ arr: [{ nested: true }] })
    expect(result).toEqual({ arr: [{ nested: false }] })
  })

  test("Handles nested state pointing to an object with numeric keys", () => {
    const initialState = { arr: { 0: { nested: true } } }

    const result = updateState(initialState, ['arr', 0, 'nested'], false)
    expect(initialState).toEqual({ arr: { 0: { nested: true } } })
    expect(result).toEqual({ arr: { 0: { nested: false } } })
  })
})