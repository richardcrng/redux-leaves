import { vanillaReducerLeaf } from "..";

describe("**Feature**: created reducer non-mutatively concats action payload into the state array when an action is dispatched with '.../CONCAT' at the exact path implied by the prefix and route", () => {

  describe("GIVEN a reducer from { prefix: 'app/prefix', route: ['path', 'deep'], initialState: 10 }", () => {
    const reducer = vanillaReducerLeaf({ prefix: "app/prefix", route: ["path", "deep"], initialState: 10 })

    describe("WHEN the reducer is called with state = ['a'], action type 'app/prefix/path/deep/CONCAT' and payload ['b', 'c']", () => {
      const prevState = ['a']
      const result = reducer(prevState, { type: "app/prefix/path/deep/CONCAT", payload: ['b', 'c'] })

      test("THEN it returns ['a', 'b', 'c']", () => {
        expect(result).toEqual(['a', 'b', 'c'])
      })
      test("AND the previous state is unchanged", () => {
        expect(prevState).toEqual(['a'])
      })
    })
  })
})