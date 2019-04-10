import { vanillaReducerLeaf } from "..";

describe("**Feature**: created reducer increments state when an action is dispatched with '.../INCREMENT' at the exact path implied by the prefix and route", () => {

  describe("GIVEN a reducer from { prefix: 'app/prefix', route: ['path', 'deep'], initialState: 10 }", () => {
    const reducer = vanillaReducerLeaf({ prefix: "app/prefix", route: ["path", "deep"], initialState: 10 })

    describe("WHEN the reducer is called with state = 5 and action type 'app/prefix/path/deep/INCREMENT'", () => {
      const result = reducer(5, { type: "app/prefix/path/deep/INCREMENT" })

      test("THEN it returns 6", () => {
        expect(result).toBe(6)
      })
    })
  })
})

describe("**Feature**: created reducer increments by the provided payload", () => {

  describe("GIVEN a reducer from { prefix: 'app/prefix', route: ['path', 'deep'], initialState: 10 }", () => {
    const reducer = vanillaReducerLeaf({ prefix: "app/prefix", route: ["path", "deep"], initialState: 10 })

    describe("WHEN the reducer is called with state = 5, action type 'app/prefix/path/deep/INCREMENT' and payload = 3", () => {
      const result = reducer(5, { type: "app/prefix/path/deep/INCREMENT", payload: 3 })

      test("THEN it returns 8", () => {
        expect(result).toBe(8)
      })
    })

    describe("WHEN the reducer is called with state = -7, action type 'app/prefix/path/deep/INCREMENT' and payload = -2", () => {
      const result = reducer(-2, { type: "app/prefix/path/deep/INCREMENT", payload: -7 })

      test("THEN it returns -9", () => {
        expect(result).toBe(-9)
      })
    })
  })
  
})