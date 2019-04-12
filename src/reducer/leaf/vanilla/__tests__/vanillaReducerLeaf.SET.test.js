import { vanillaReducerLeaf } from "..";

describe("**Feature**: created reducer updates state with payload.value at payload.path when an action with type '.../SET' at the exact path implied by the prefix and route", () => {

  describe("GIVEN a reducer from { prefix: 'app/prefix', route: ['path', 'deep'], initialState: {} }", () => {
    const reducer = vanillaReducerLeaf({ prefix: "app/prefix", route: ["path", "deep"], initialState: {} })
    let result

    describe("WHEN the reducer is called with state = { foo: 'foo' }, action type 'app/prefix/path/deep/SET' and payload { value: 'FOO', path: 'foo' }", () => {
      const newState = 'FOO'
      beforeEach(() => {
        result = reducer({ foo: "foo" }, { type: "app/prefix/path/deep/SET", payload: { value: newState, path: 'foo' } })
      })

      test("THEN it returns { foo: 'FOO' }", () => {
        expect(result).toEqual({ foo: "FOO" })
        expect(result.foo).toBe(newState)
      })
    })

    describe("WHEN the reducer is called with state = { foo: 'foo' }, action type 'app/prefix/path/deep/SET' and payload { value: 'bar', path: 'bar' }", () => {
      const newState = 'bar'
      beforeEach(() => {
        result = reducer({ foo: "foo" }, { type: "app/prefix/path/deep/SET", payload: { value: newState, path: 'bar' } })
      })

      test("THEN it returns { foo: 'foo', bar: 'bar' }", () => {
        expect(result).toEqual({ foo: "foo", bar: "bar" })
        expect(result.bar).toBe(newState)
      })
    })
  })
})
