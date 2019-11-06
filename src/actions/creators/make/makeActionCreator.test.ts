import { makeActionCreator } from ".";

describe("**Feature**: when provided one argument (type), it returns an action creator function for that type", () => {

  describe("GIVEN an action type constant, 'ACTION_TYPE_CONSTANT'", () => {
    const ACTION_TYPE_CONSTANT = "ACTION_TYPE_CONSTANT"

    describe("WHEN it is called with that constant", () => {
      const actionCreator = makeActionCreator(ACTION_TYPE_CONSTANT)
      
      test("THEN it returns a function with type 'ACTION_TYPE_CONSTANT'", () => {
        expect(typeof actionCreator).toBe("function")
        expect(actionCreator.type).toBe(ACTION_TYPE_CONSTANT)
      })

      describe("AND the returned function is executed with no arguments", () => {
        const result = actionCreator()

        test("THEN the result is { type: 'ACTION_TYPE_CONSTANT' }", () => {
          // Check overall object
          expect(result).toEqual({ type: ACTION_TYPE_CONSTANT })
          // Check type for referential identity
          expect(result.type).toBe(ACTION_TYPE_CONSTANT)
        })
      })

      describe("AND the returned function is executed with one argument: 'arg one'", () => {
        const argOne = "arg one"
        const result = actionCreator(argOne)

        test("THEN the result is { type: 'ACTION_TYPE_CONSTANT', payload: 'arg one' }", () => {
          // Check overall object
          expect(result).toEqual({ type: ACTION_TYPE_CONSTANT, payload: argOne })
          // Check type and payload for referential identity
          expect(result.type).toBe(ACTION_TYPE_CONSTANT)
          expect(result.payload).toBe(argOne)
        })
      })

      describe("AND the returned function is executed with two arguments: 'arg one', 'arg two'", () => {
        const argOne = "arg one"
        const argTwo = "arg two"
        const result = actionCreator(argOne, argTwo)

        test("THEN the result is { type: 'ACTION_TYPE_CONSTANT', payload: 'arg one', meta: 'arg two' }", () => {
          // Check overall object
          expect(result).toEqual({ type: ACTION_TYPE_CONSTANT, payload: argOne, meta: argTwo })
          // Check type, payload and meta for referential identity
          expect(result.type).toBe(ACTION_TYPE_CONSTANT)
          expect(result.payload).toBe(argOne)
          expect(result.meta).toBe(argTwo)
        })
      })
    })
  })
})