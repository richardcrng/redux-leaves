import { vanillaReducerLeaf } from "..";

describe("**Feature**: created reducer updates state with the action payload when an action is dispatched with '.../UPDATE' at the exact path implied by the prefix and route and meta", () => {

  describe("GIVEN a reducer from { prefix: 'app/prefix', route: ['path', 'deep'], initialState: 10 }", () => {
    const reducer = vanillaReducerLeaf({ prefix: "app/prefix", route: ["path", "deep"], initialState: 10 })
    let result

    describe("WHEN the reducer is called with state = 5, action type 'app/prefix/path/deep/UPDATE' and payload 'new state'", () => {
      const newState = 'new state'
      beforeEach(() => {
        result = reducer(5, { type: "app/prefix/path/deep/UPDATE", payload: newState })
      })

      test("THEN it returns 'new state'", () => {
        expect(result).toBe(newState)
      })
    })

    describe("WHEN the reducer is called with state = 5, action type 'app/prefix/path/UPDATE', payload = [10] and meta = 'deep'", () => {
      const newState = [10]
      beforeEach(() => {
        result = reducer(5, { type: "app/prefix/path/UPDATE", payload: newState, meta: "deep" })
      })

      test("THEN it returns [10]", () => {
        expect(result).toBe(newState)
      })
    })
  })
})