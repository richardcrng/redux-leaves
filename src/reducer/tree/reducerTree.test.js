import { reducerTree } from "../tree";
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
          manageable: false,
        }
      },
      object: {}
    }

    describe("AND prefix = 'app/'", () => {
      const prefix = "app/"

      describe("WHEN reducer = reducerTree(initialState, prefix)", () => {
        const reducer = reducerTree(initialState, prefix)

        test("THEN reducer is a function", () => {
          expect(typeof reducer).toBe("function")
        })

        test("AND reducer.bool is a function, as is reducer.bool", () => {
          expect(typeof reducer.bool).toBe("function")
          expect(typeof reducer.bool).toBe("function")
        })

        test("AND reducer.object is a function, as is reducer.object", () => {
          expect(typeof reducer.object).toBe("function")
          expect(typeof reducer.object).toBe("function")
        })

        test("AND reducer.object.set('bar', 'foo') returns the correct action", () => {
          expect(reducer.object.set('bar', 'foo')).toEqual({
            type: "app/object/SET",
            payload: 'bar',
            meta: 'foo'
          })
        })

        test("AND reducer.bool.update is an action creator of type 'app/bool/SET'", () => {
          expect(typeof reducer.bool.update).toBe("function")
          expect(reducer.bool.update.type).toBe("app/bool/SET")
        })

        test("AND reducer.foo is an object", () => {
          expect(typeof reducer.foo).toBe("object")
        })

        test("AND reducer.foo.value is a function", () => {
          expect(typeof reducer.foo.value).toBe("function")
        })

        test("AND reducer.foo.value.reset is an action creator of type 'app/foo/value/RESET'", () => {
          expect(typeof reducer.foo.value.reset).toBe("function")
          expect(reducer.foo.value.reset.type).toBe("app/foo/value/RESET")
        })

        test("AND reducer.foo.value.update('foobar') returns an action with payload 'foobar'", () => {
          expect(reducer.foo.value.update('foobar')).toEqual({ type: "app/foo/value/SET", payload: "foobar" })
        })

        describe("AND store = createStore(reducer)", () => {
          let store
          beforeEach(() => {
            store = createStore(reducer)
          })

          test("THEN store is initialised with state = initialState", () => {
            expect(store.getState()).toEqual(initialState)
          })

          describe("AND an action to set a property in the object slice of state is dispatched (reducer.object.set('bar', 'foo'))", () => {
            beforeEach(() => {
              store.dispatch(reducer.object.set('bar', 'foo'))
            })

            test("THEN only object is updated in the store's state", () => {
              expect(store.getState()).toEqual({
                ...initialState,
                object: { foo: 'bar' }
              })
            })
          })

          describe("AND an action to clear only bool slice of state is dispatched (reducer.bool.clear())", () => {
            beforeEach(() => {
              store.dispatch(reducer.bool.clear())
            })

            test("THEN only bool is updated in the store's state", () => {
              expect(store.getState()).toEqual({
                ...initialState,
                bool: null
              })
            })
          })

          describe("AND an action to update only foo.value sub-slice of state is dispatched (reducer.foo.value.update())", () => {
            beforeEach(() => store.dispatch(reducer.foo.value.update("foobar")))

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
              store.dispatch(reducer.foo.nesting.clear())
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
              store.dispatch(reducer.foo.clear())
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
                },
                object: null
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