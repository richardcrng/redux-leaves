import { vanillaReducerLeaf } from "..";

describe("**Feature**: created reducer non-mutatively pushes action payload into the state array when an action is dispatched with '.../PUSH' at the exact path implied by the prefix and route", () => {

  describe("GIVEN a reducer from { prefix: 'app/prefix', route: ['path', 'deep'], initialState: 10 }", () => {
    const reducer = vanillaReducerLeaf({ prefix: "app/prefix", route: ["path", "deep"], initialState: 10 })

    describe("WHEN the reducer is called with state = ['a'], action type 'app/prefix/path/deep/PUSH' and payload 'b'", () => {
      const prevState = ['a']
      const element = 'b'
      const result = reducer(prevState, { type: "app/prefix/path/deep/PUSH", payload: element })

      test("THEN it returns ['a', 'b']", () => {
        expect(result).toEqual(['a', 'b'])
      })

      test("AND the last element has referential identity with the action's element", () => {
        expect(result[1]).toBe(element)
      })

      test("AND the previous state is unchanged", () => {
        expect(prevState).toEqual(['a'])
      })
    })
  })
})