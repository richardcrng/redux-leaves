import { vanillaReducerLeaf } from "..";

describe("**Feature**: created reducer invokes payload (function) with (state, action) when an action is dispatched with '.../APPLY' at the exact path implied by the prefix, route and meta", () => {

  describe("GIVEN a reducer from { prefix: 'app/prefix', route: ['path', 'deep'], initialState: 10 }", () => {
    const reducer = vanillaReducerLeaf({ prefix: "app/prefix", route: ["path", "deep"], initialState: 10 })

    describe("WHEN the reducer is called with state = 5, action type 'app/prefix/path/deep/APPLY' and payload = n => n*2", () => {
      const result = reducer(5, { type: "app/prefix/path/deep/APPLY", payload: n => n*2 })

      test("THEN it returns 10", () => {
        expect(result).toBe(10)
      })
    })

    describe("WHEN the reducer is called with state = 5, action type 'app/prefix/path/deep/APPLY', payload = (state, { n }) => state*meta and n = 3", () => {
      const result = reducer(5, { type: "app/prefix/path/deep/APPLY", payload: (state, { n }) => state*n, n: 3 })

      test("THEN it returns 15", () => {
        expect(result).toBe(15)
      })
    })
  })
})

describe("**Feature**: created reducer invokes typically mutative functions in a non-mutative way", () => {

  describe("GIVEN a reducer from { prefix: 'app/prefix', route: ['path', 'deep'], initialState: 10 }", () => {
    const reducer = vanillaReducerLeaf({ prefix: "app/prefix", route: ["path", "deep"], initialState: 10 })

    describe("WHEN the reducer is called with state = ['a', 'b'], action type 'app/prefix/path/deep/APPLY' and (a typically mutative) payload = arr => arr.reverse()", () => {
      const prevState = ['a', 'b']
      const result = reducer(prevState, { type: "app/prefix/path/deep/APPLY", payload: arr => arr.reverse() })

      test("THEN it returns ['b', 'a']", () => {
        expect(result).toEqual(['b', 'a'])
      })

      test("AND the previous state is still ['a', 'b']", () => {
        expect(prevState).toEqual(['a', 'b'])
      })
    })
  })
})