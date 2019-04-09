import { vanillaReducerLeaf } from "../";
import { createStore } from "redux";

describe("GIVEN vanillaReducerLeaf({ prefix: 'app/prefix', route: [some, route] })", () => {
  const reducer = vanillaReducerLeaf({ prefix: "app/prefix", route: ["some, route"] })

  describe("AND the store is loaded with a specific string, 'string'", () => {
    const string = "string"
    let store
    beforeEach(() => {
      store = createStore(reducer, string)
    })

    describe("WHEN an action with type 'app/prefix/some/route/CLEAR is dispatched", () => {
      beforeEach(() => {
        store.dispatch({ type: "app/prefix/some/route" })
      })

      test("THEN the store has state of null", () => {
        expect(store.getState()).toBeNull
      })
    })

    describe("WHEN an action with type 'app/prefix/other/route/CLEAR is dispatched", () => {
      beforeEach(() => {
        store.dispatch({ type: "app/prefix/other/route" })
      })

      test("THEN the store has state of the same string", () => {
        expect(store.getState()).toBe(string)
      })
    })
  })
})