import { vanillaReducerLeaf } from "..";

describe("**Feature**: created reducer updates state with the action payload when an action is dispatched with '.../SET' at the exact path implied by the prefix, route and meta", () => {

  describe("GIVEN a reducer from { prefix: 'app/prefix', route: ['path', 'deep'], initialState: 10 }", () => {
    const reducer = vanillaReducerLeaf({ prefix: "app/prefix", route: ["path", "deep"], initialState: 10 })

    describe("WHEN the reducer is called with state = 5, action type 'app/prefix/path/deep/SET' and payload 'new state'", () => {
      const newState = 'new state'
      const result = reducer(5, { type: "app/prefix/path/deep/SET", payload: newState })

      test("THEN it returns 'new state'", () => {
        expect(result).toBe(newState)
      })
    })

    describe("WHEN the reducer is called with state = 5, action type 'app/prefix/path/SET', payload = [10] and meta = 'deep'", () => {
      const newState = [10]
      const result = reducer(5, { type: "app/prefix/path/SET", payload: newState, meta: "deep" })

      test("THEN it returns [10]", () => {
        expect(result).toBe(newState)
      })
    })
  })
})

describe("**Feature**: created reducer ignores actions of type '.../SET' with irrelevant path implied by the prefix, route and meta", () => {

  describe("GIVEN a reducer from { prefix: 'app/prefix', route: ['path', 'deep'], initialState: 10 }", () => {
    const reducer = vanillaReducerLeaf({ prefix: "app/prefix", route: ["path", "deep"], initialState: 10 })

    describe("WHEN the reducer is called with state = 5, action type 'app/prefix/path/deep/SET', payload = 'boo' and meta = 'junk'", () => {
      const result = reducer(5, { type: "app/prefix/path/deep/SET", payload: "boo", meta: "junk" })

      test("THEN it returns 5", () => {
        expect(result).toBe(5)
      })
    })
  })
})