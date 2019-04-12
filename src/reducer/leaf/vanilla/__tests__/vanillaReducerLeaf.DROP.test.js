import { vanillaReducerLeaf } from "..";

describe("**Feature**: created reducer non-mutatively drops payload (n) elements from state array's beginning when an action is dispatched with '.../PUSH' at the exact path implied by the prefix, route and meta", () => {

  describe("GIVEN a reducer from { prefix: 'app/prefix', route: ['path', 'deep'], initialState: 10 }", () => {
    const reducer = vanillaReducerLeaf({ prefix: "app/prefix", route: ["path", "deep"], initialState: 10 })

    describe("WHEN the reducer is called with state = ['a', 'b', 'c', 'd'], action type 'app/prefix/path/deep/PUSH' and no payload", () => {
      const prevState = ['a', 'b', 'c', 'd']
      const result = reducer(prevState, { type: "app/prefix/path/deep/DROP" })

      test("THEN it returns ['b', 'c', 'd']", () => {
        expect(result).toEqual(['b', 'c', 'd'])
      })

      test("AND the previous state is unchanged", () => {
        expect(prevState).toEqual(['a', 'b', 'c', 'd'])
      })
    })

    describe("WHEN the reducer is called with state = ['a', 'b', 'c', 'd'], action type 'app/prefix/path/deep/PUSH' and payload 2", () => {
      const prevState = ['a', 'b', 'c', 'd']
      const result = reducer(prevState, { type: "app/prefix/path/deep/DROP", payload: 2 })

      test("THEN it returns ['c', 'd']", () => {
        expect(result).toEqual(['c', 'd'])
      })

      test("AND the previous state is unchanged", () => {
        expect(prevState).toEqual(['a', 'b', 'c', 'd'])
      })
    })
  })
})