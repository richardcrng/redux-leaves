import { vanillaReducerLeaf } from "..";

describe("**Feature**: created reducer increments state when an action is dispatched with '.../INCREMENT' at the exact path implied by the prefix and route", () => {

  describe("GIVEN a reducer from { prefix: 'app/prefix', route: ['path', 'deep'], initialState: true }", () => {
    const reducer = vanillaReducerLeaf({ prefix: "app/prefix", route: ["path", "deep"], initialState: true })

    describe("WHEN the reducer is called with state = true and action type 'app/prefix/path/deep/CLEAR'", () => {
      const result = reducer(true, { type: "app/prefix/path/deep/CLEAR" })

      test("THEN it returns null", () => {
        expect(result).toBeNull()
      })
    })
  })
})