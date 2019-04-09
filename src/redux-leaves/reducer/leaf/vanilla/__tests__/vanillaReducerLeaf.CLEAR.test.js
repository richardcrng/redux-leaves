import { vanillaReducerLeaf } from "../";
import { createStore } from "redux";

describe("GIVEN a prefix of 'app/prefix'", () => {
  const prefix = "app/prefix/"

  describe("AND a defined route of [some, route]", () => {
    const route = ["some", "route"]

    describe("AND an initial state of false", () => {
      const initialState = false

      describe("WHEN vanillaReducerLeaf is called with prefix, route and initialState", () => {
        const reducer = vanillaReducerLeaf({ prefix, route, initialState })
        const store = createStore(reducer)
        let prevState = store.getState()

        describe("AND an action with type 'app/prefix/some/route/CLEAR is dispatched", () => {
          beforeAll(() => {
            store.dispatch({ type: "app/prefix/some/route/CLEAR" })
          })

          test("THEN the store has state of null", () => {
            expect(store.getState()).toBeNull
          })
        })
      })

      describe("WHEN vanillaReducerLeaf is called with prefix = 'app/prefix' and initialState = false, but no route", () => {
        const reducer = vanillaReducerLeaf({ prefix, initialState })
        const store = createStore(reducer)
        let prevState = store.getState()

        describe("AND an action with type 'app/prefix/some/route/CLEAR is dispatched", () => {
          beforeAll(() => {
            prevState = store.getState()
            store.dispatch({ type: "app/prefix/some/route/CLEAR" })
          })

          test("THEN the store still maintains its previous state", () => {
            expect(store.getState()).toBe(prevState)
          })
        })

        describe("AND an action with type 'app/prefix/CLEAR is dispatched", () => {
          beforeAll(() => {
            store.dispatch({ type: "app/prefix/ON" })
          })

          test("THEN the store has state of null", () => {
            expect(store.getState()).toBeNull
          })
        })
      })
    })
  })
})