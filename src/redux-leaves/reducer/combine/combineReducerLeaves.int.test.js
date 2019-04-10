import { makeReducerLeaf } from "../leaf";
import { combineReducerLeaves } from './';
import { createStore } from 'redux';


describe("**Feature**: it can combine a dictionary of nested reducers made via makeReducerLeaf", () => {
  describe("GIVEN nested initialState shape", () => {
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

    describe("AND reducerLeaf = makeReducerLeaf(initialState)", () => {
      const reducerLeaf = makeReducerLeaf(initialState)

      describe("AND a dictionary of reducers is produced using this reducerLeaf function", () => {
        const dict = {
          bool: reducerLeaf("bool"),
          counter: reducerLeaf("counter"),
          foo: {
            value: reducerLeaf("foo", "value"),
            nesting: {
              deep: reducerLeaf("foo", "nesting", "deep"),
              manageable: reducerLeaf("foo", "nesting", "manageable")
            }
          }
        }

        describe("WHEN this dictionary is passed to combineReducerLeaves", () => {
          const reducer = combineReducerLeaves(dict)

          test("THEN it returns a function", () => {
            expect(typeof reducer).toBe("function")
          })

          test("AND the function has a defined children property", () => {
            expect(reducer.children).toBeDefined()
          })

          describe("AND the result is passed to redux's createStore", () => {
            let store
            beforeEach(() => {
              store = createStore(reducer)
            })

            test("THEN the initialised store has original initialState", () => {
              expect(store.getState()).toEqual(initialState)
            })

            describe("AND an action to clear only bool slice of state is dispatched", () => {
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

            // describe("AND an action to clear only foo.nesting slice of state is dispatched", () => {
            //   beforeEach(() => {
            //     store.dispatch(reducer.children.foo.nesting.clear())
            //   })

            //   test("THEN all sub-slices of state in foo are cleared", () => {
            //     expect(store.getState()).toEqual({
            //       ...initialState,
            //       foo: {
            //         ...initialState.foo,
            //         nesting: {
            //           deep: null,
            //           manageable: null
            //         }
            //       }
            //     })
            //   })
            // })
          })
        })
      })
    })
  })
})