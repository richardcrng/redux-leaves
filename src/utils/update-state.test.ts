import { updateState } from "."

describe('updateState', () => {
  test("Handles nested state pointing to an array", () => {
    const initialState = { arr: [{ nested: true }] }

    const result = updateState(initialState, ['arr', 0, 'nested'], false)
    expect(initialState).toEqual({ arr: [{ nested: true }] })
    expect(result).toEqual({ arr: [{ nested: false }] })
  })
})