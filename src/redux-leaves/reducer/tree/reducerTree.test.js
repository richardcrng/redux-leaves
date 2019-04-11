import { reducerTree } from "./";
import { createStore } from "redux";


describe("**Feature**: it produces a reducer with reducer leaves from initial state and prefix", () => {

  describe("GIVEN nested initialState with non-null values for shape { bool, counter, foo: { value, nesting: { deep, manageable } } }", () => {
    const initialState = {
      bool: true,
      counter: 0,
      foo: {
        value: "foo",
        nesting: {
          deep: true,
          manageable: false
        }
      }
    }

    describe("AND prefix = 'app/'", () => {
      const prefix = "app/"

      describe("WHEN reducer = reducerTree(initialState, prefix)", () => {
        const reducer = reducerTree(initialState, prefix)

        test("THEN reducer is a function", () => {
          expect(typeof reducer).toBe("function")
        })

        test("AND reducer.children is defined", () => {
          expect(reducer.children).toBeDefined()
        })

        test("AND reducer.children.bool is a function", () => {
          expect(typeof reducer.children.bool).toBe("function")
        })

        test("AND reducer.children.bool.update is an action creator of type 'app/bool/SET'", () => {
          expect(typeof reducer.children.bool.update).toBe("function")
          expect(reducer.children.bool.update.type).toBe("app/bool/SET")
        })

        test("AND reducer.children.foo is an object", () => {
          expect(typeof reducer.children.foo).toBe("object")
        })

        test("AND reducer.children.foo.value is a function", () => {
          expect(typeof reducer.children.foo.value).toBe("function")
        })

        test("AND reducer.children.foo.value.reset is an action creator of type 'app/foo/value/RESET'", () => {
          expect(typeof reducer.children.foo.value.reset).toBe("function")
          expect(reducer.children.foo.value.reset.type).toBe("app/foo/value/RESET")
        })

        test("AND reducer.children.foo.value.update('foobar') returns an action with payload 'foobar'", () => {
          expect(reducer.children.foo.value.update('foobar')).toEqual({ type: "app/foo/value/SET", payload: "foobar" })
        })

        describe("AND store = createStore(reducer)", () => {
          let store
          beforeEach(() => {
            store = createStore(reducer)
          })

          test("THEN store is initialised with state = initialState", () => {
            expect(store.getState()).toEqual(initialState)
          })

          describe("AND an action to clear only bool slice of state is dispatched (reducer.children.bool.clear())", () => {
            beforeEach(() => {
              store.dispatch(reducer.children.bool.clear())
            })

            test("THEN only bool is updated in the store's state", () => {
              expect(store.getState()).toEqual({
                ...initialState,
                bool: null
              })
            })
          })

          describe("AND an action to update only foo.value sub-slice of state is dispatched (reducer.children.foo.value.update())", () => {
            beforeEach(() => store.dispatch(reducer.children.foo.value.update("foobar")))

            test("THEN only foo.value is updated in the store's state", () => {
              expect(store.getState()).toEqual({
                ...initialState,
                foo: {
                  ...initialState.foo,
                  value: "foobar"
                }
              })
            })
          })

          describe("AND an action to clear only foo.nesting sub-slice of state is dispatched", () => {
            beforeEach(() => {
              store.dispatch(reducer.children.foo.nesting.clear())
            })

            test("THEN all sub-slices of state in foo.nesting are cleared", () => {
              expect(store.getState()).toEqual({
                ...initialState,
                foo: {
                  value: "foo",
                  nesting: {
                    deep: null,
                    manageable: null
                  }
                }
              })
            })
          })

          describe("AND an action to clear all of foo slice of state is dispatched", () => {
            beforeEach(() => {
              store.dispatch(reducer.children.foo.clear())
            })

            test("THEN all sub-slices of state in foo are cleared", () => {
              expect(store.getState()).toEqual({
                ...initialState,
                foo: {
                  value: null,
                  nesting: {
                    deep: null,
                    manageable: null
                  }
                }
              })
            })
          })

          describe("AND an action to clear all sub-slices of state is dispatched", () => {
            beforeEach(() => {
              store.dispatch(reducer.clear())
            })

            test("THEN all sub-slices of state in foo are cleared", () => {
              expect(store.getState()).toEqual({
                bool: null,
                counter: null,
                foo: {
                  value: null,
                  nesting: {
                    deep: null,
                    manageable: null
                  }
                }
              })
            })

            describe("AND an action to reset all of state is dispatched", () => {
              beforeEach(() => store.dispatch(reducer.reset()))

              test("THEN all of state has been reset", () => {
                expect(store.getState()).toEqual(initialState)
              })
            })
          })
        })
      })
    })
  })
})