import { vanillaReducerLeaf } from "../";

describe("**Feature**: created reducer returns null when an action is dispatched with '.../CLEAR' and a path consistent with the initialised prefix and route", () => {

  describe("GIVEN a reducer from { prefix: 'app/prefix', route: ['path', 'deep'], initialState: true }", () => {
    const reducer = vanillaReducerLeaf({ prefix: "app/prefix", route: ["path", "deep"], initialState: true })

    describe("WHEN the reducer is called with state = true and action type 'app/prefix/path/deep/CLEAR'", () => {
      const result = reducer(true, { type: "app/prefix/path/deep/CLEAR" })

      test("THEN it returns null", () => {
        expect(result).toBeNull()
      })
    })

    describe("WHEN the reducer is called with state = true and action type 'app/prefix/path/CLEAR'", () => {
      const result = reducer(true, { type: "app/prefix/path/CLEAR" })

      test("THEN it returns null", () => {
        expect(result).toBeNull()
      })
    })

    describe("WHEN the reducer is called with state = true and action type 'app/prefix/CLEAR'", () => {
      const result = reducer(true, { type: "app/prefix/CLEAR" })

      test("THEN it returns null", () => {
        expect(result).toBeNull()
      })
    })

    describe("WHEN the reducer is called with state = true and action type 'CLEAR'", () => {
      const result = reducer(true, { type: "CLEAR" })

      test("THEN it returns null", () => {
        expect(result).toBeNull()
      })
    })
  })
})

describe("**Feature**: created reducer does not return null when an action is dispatched with '.../CLEAR', a path inconsistent with the initialised prefix and route, and non-null state", () => {

  describe("GIVEN a reducer from { prefix: 'app/prefix', route: ['path', 'deep'], initialState: true }", () => {
    const reducer = vanillaReducerLeaf({ prefix: "app/prefix", route: ["path, deep"], initialState: true })

    describe("WHEN the reducer is called with state = true and action type 'app/prefix/path/wrong/CLEAR'", () => {
      const result = reducer(true, { type: "app/prefix/route/path/wrong/CLEAR" })

      test("THEN it returns true", () => {
        expect(result).toBe(true)
      })
    })


    describe("WHEN the reducer is called with state = 'string' and action type 'will/not/CLEAR'", () => {
      const string = 'string'
      const result = reducer(string, { type: "will/not/CLEAR" })

      test("THEN it returns the same string", () => {
        expect(result).toBe(string)
      })
    })
  })

  describe("GIVEN a reducer from { prefix: 'app/prefix',  initialState: true }", () => {
    const reducer = vanillaReducerLeaf({ prefix: "app/prefix", initialState: true })

    describe("WHEN the reducer is called with state = true and action type 'app/prefix/path/deep/CLEAR'", () => {
      const result = reducer(true, { type: "app/prefix/path/deep/CLEAR" })

      test("THEN it does not clear (and returns true)", () => {
        expect(result).toBe(true)
      })
    })

    describe("WHEN the reducer is called with state = true and action type 'app/prefix/CLEAR'", () => {
      const result = reducer(true, { type: "app/prefix/path/CLEAR" })

      test("THEN it returns true", () => {
        expect(result).toBe(true)
      })
    })

    describe("WHEN the reducer is called with state = true and action type 'CLEAR'", () => {
      const result = reducer(true, { type: "CLEAR" })

      test("THEN it returns null", () => {
        expect(result).toBeNull()
      })
    })
  })
})