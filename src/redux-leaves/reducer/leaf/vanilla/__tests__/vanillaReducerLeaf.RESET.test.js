import { vanillaReducerLeaf } from "../";

describe("**Feature**: created reducer returns its initialState when an action is dispatched with '.../RESET' and a path consistent with the initialised prefix and route", () => {

  describe("GIVEN a reducer from { prefix: 'app/prefix', route: ['path', 'deep'], initialState: true }", () => {
    const reducer = vanillaReducerLeaf({ prefix: "app/prefix", route: ["path", "deep"], initialState: true })

    describe("WHEN the reducer is called with state = false and action type 'app/prefix/path/deep/RESET'", () => {
      const result = reducer(false, { type: "app/prefix/path/deep/RESET" })

      test("THEN it returns true", () => {
        expect(result).toBe(true)
      })
    })

    describe("WHEN the reducer is called with state = false and action type 'app/prefix/path/RESET'", () => {
      const result = reducer(false, { type: "app/prefix/path/RESET" })

      test("THEN it returns true", () => {
        expect(result).toBe(true)
      })
    })

    describe("WHEN the reducer is called with state = false and action type 'app/prefix/RESET'", () => {
      const result = reducer(false, { type: "app/prefix/RESET" })

      test("THEN it returns true", () => {
        expect(result).toBe(true)
      })
    })

    describe("WHEN the reducer is called with state = false and action type 'RESET'", () => {
      const result = reducer(false, { type: "RESET" })

      test("THEN it returns true", () => {
        expect(result).toBe(true)
      })
    })
  })
})

describe("**Feature**: created reducer does not reset when an action is dispatched with '.../RESET' and a path inconsistent with the initialised prefix and route", () => {

  describe("GIVEN a reducer from { prefix: 'app/prefix', route: ['path', 'deep'], initialState: true }", () => {
    const reducer = vanillaReducerLeaf({ prefix: "app/prefix", route: ["path", "deep"], initialState: true })

    describe("WHEN the reducer is called with state = false and action type 'app/prefix/path/wrong/RESET'", () => {
      const result = reducer(false, { type: "app/prefix/path/wrong/RESET" })

      test("THEN it returns false", () => {
        expect(result).toBe(false)
      })
    })


    describe("WHEN the reducer is called with state = 'string' and action type 'will/not/RESET'", () => {
      const string = 'string'
      const result = reducer(string, { type: "will/not/RESET" })

      test("THEN it returns the same string", () => {
        expect(result).toBe(string)
      })
    })
  })

  describe("GIVEN a reducer from { prefix: 'app/prefix',  initialState: false }", () => {
    const reducer = vanillaReducerLeaf({ prefix: "app/prefix", initialState: false })

    describe("WHEN the reducer is called with state = true and action type 'app/prefix/path/deep/RESET'", () => {
      const result = reducer(true, { type: "app/prefix/path/deep/RESET" })

      test("THEN it does not reset (and returns true)", () => {
        expect(result).toBe(true)
      })
    })

    describe("WHEN the reducer is called with state = true and action type 'app/prefix/RESET'", () => {
      const result = reducer(true, { type: "app/prefix/path/RESET" })

      test("THEN it does not reset (returns true)", () => {
        expect(result).toBe(true)
      })
    })

    describe("WHEN the reducer is called with state = true and action type 'RESET'", () => {
      const result = reducer(true, { type: "RESET" })

      test("THEN it resets (returns false)", () => {
        expect(result).toBe(false)
      })
    })
  })
})