import { vanillaReducerLeaf } from "../";

describe("**Feature**: created reducer returns null when an action is dispatched with '.../CLEAR' and a path consistent with the initialised prefix and route", () => {

  describe("GIVEN a reducer from { prefix: 'app/prefix', route: ['path', 'deep'], initialState: true }", () => {
    const reducer = vanillaReducerLeaf({ prefix: "app/prefix", route: ["path, deep"], initialState: true })

    describe("WHEN the reducer is called with state = true and action type 'app/prefix/route/path/deep/CLEAR'", () => {
      const result = reducer(true, { type: "app/prefix/route/path/deep/CLEAR" })

      test("THEN it returns null", () => {
        expect(result).toBeNull
      })
    })

    describe("WHEN the reducer is called with state = true and action type 'app/prefix/route/path/CLEAR'", () => {
      const result = reducer(true, { type: "app/prefix/route/path/CLEAR" })

      test("THEN it returns null", () => {
        expect(result).toBeNull
      })
    })

    describe("WHEN the reducer is called with state = true and action type 'app/prefix/CLEAR'", () => {
      const result = reducer(true, { type: "app/prefix/CLEAR" })

      test("THEN it returns null", () => {
        expect(result).toBeNull
      })
    })

    describe("WHEN the reducer is called with state = true and action type 'CLEAR'", () => {
      const result = reducer(true, { type: "CLEAR" })

      test("THEN it returns null", () => {
        expect(result).toBeNull
      })
    })
  })
})

describe("**Feature**: created reducer does not returs null when an action is dispatched with '.../CLEAR', a path inconsistent with the initialised prefix and route, and non-null state", () => {

  describe("GIVEN a reducer from { prefix: 'app/prefix', route: ['path', 'deep'], initialState: true }", () => {
    const reducer = vanillaReducerLeaf({ prefix: "app/prefix", route: ["path, deep"], initialState: true })

    describe("WHEN the reducer is called with state = true and action type 'app/prefix/route/path/wrong/CLEAR'", () => {
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
})

// describe("FEATURE: behaves as expected when integrated with createStore()", () => {
//   describe("GIVEN argument { prefix: 'app/prefix', route: ['some', 'route'] }", () => {
//     const reducer = vanillaReducerLeaf({ prefix: "app/prefix", route: ["some, route"] })

//     describe("WHEN the store is loaded from the reducer with a specific string, 'string'", () => {
//       const string = "string"
//       let store
//       beforeEach(() => {
//         store = createStore(reducer, string)
//       })

//       test("THEN the store has state equal to that string", () => {
//         expect(store.getState()).toBe(string)
//       })

//       describe("AND an action with type 'app/prefix/some/route/CLEAR is dispatched", () => {
//         beforeEach(() => {
//           store.dispatch({ type: "app/prefix/some/route" })
//         })

//         test("THEN the store has state of null", () => {
//           expect(store.getState()).toBeNull
//         })
//       })

//       describe("AND an action with type 'app/prefix/other/route/CLEAR is dispatched", () => {
//         beforeEach(() => {
//           store.dispatch({ type: "app/prefix/other/route" })
//         })

//         test("THEN the store has state of the same string", () => {
//           expect(store.getState()).toBe(string)
//         })
//       })
//     })
//   })
// })