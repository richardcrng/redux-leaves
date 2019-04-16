import _ from 'lodash';
import { createStore } from "redux";
import reduxLeaves from '../../../..';

describe("leaf.create.clear(toNull = false): returns an action that, when dispatched, clear's the leaf's state", () => {

  describe("GIVEN non-trivially nested API (as in the documentation)", () => {
    const initialState = {
      counter: 1,
      foo: ["bar"],
      nested: {
        deep: {},
        state: {
          manageable: "maybe...?"
        }
      }
    }

    describe("WHEN [reducer, actions] = reduxLeaves(initialState)", () => {
      const [reducer, actions] = reduxLeaves(initialState)

      test("THEN actions.counter.create.clear is a function", () => {
        expect(typeof actions.counter.create.clear).toBe("function")
      })

      test("AND actions.foo.create.clear is a function", () => {
        expect(typeof actions.foo.create.clear).toBe("function")
      })

      test("AND actions.nested.deep.create.clear is a function", () => {
        expect(typeof actions.nested.deep.create.clear).toBe("function")
      })

      test("AND actions.nested.state.manageable.create.clear is a function", () => {
        expect(typeof actions.nested.state.manageable.create.clear).toBe("function")
      })


      describe("AND store = createStore(reducer, otherState)", () => {
        let store
        const otherState = {
          counter: 5,
          foo: ["FOOBAR"],
          nested: {
            deep: {
              props: true
            },
            state: {
              manageable: "let's find out"
            }
          }
        }
        beforeEach(() => {
          store = createStore(reducer, otherState)
        })

        test("THEN store is initialised with state = otherState", () => {
          expect(store.getState()).toEqual(otherState)
        })

        describe("AND we dispatch actions.counter.create.clear()", () => {
          beforeEach(() => {
            store.dispatch(actions.counter.create.clear())
          })

          test("THEN actions.counter updates to 0", () => {
            const state = store.getState()
            expect(state.counter).toBe(0)
            expect(state).toEqual({ ...otherState, counter: 0 })
          })
        })

        describe("AND we dispatch actions.counter.create.clear(true)", () => {
          beforeEach(() => {
            store.dispatch(actions.counter.create.clear(true))
          })

          test("THEN actions.counter updates to null", () => {
            const state = store.getState()
            expect(state.counter).toBeNull()
            expect(state).toEqual({ ...otherState, counter: null })
          })
        })

        describe("AND we dispatch actions.foo.create.clear()", () => {
          beforeEach(() => {
            store.dispatch(actions.foo.create.clear())
          })

          test("THEN actions.foo updates to []", () => {
            const state = store.getState()
            expect(state.foo).toEqual([])
            expect(state).toEqual({ ...otherState, foo: [] })
          })
        })

        describe("AND we dispatch actions.foo.create.clear(true)", () => {
          beforeEach(() => {
            store.dispatch(actions.foo.create.clear(true))
          })

          test("THEN actions.foo updates to null", () => {
            const state = store.getState()
            expect(state.foo).toBeNull()
            expect(state).toEqual({ ...otherState, foo: null })
          })
        })

        describe("AND we dispatch actions.nested.deep.create.clear()", () => {
          beforeEach(() => {
            store.dispatch(actions.nested.deep.create.clear())
          })

          test("THEN actions.nested.deep updates to {}", () => {
            const state = store.getState()
            expect(state.nested.deep).toEqual({})
            expect(state).toEqual({
              ...otherState,
              nested: {
                ...otherState.nested,
                deep: {}
              }
            })
          })
        })

        describe("AND we dispatch actions.nested.deep.create.clear(true)", () => {
          beforeEach(() => {
            store.dispatch(actions.nested.deep.create.clear(true))
          })

          test("THEN actions.nested.deep updates to null", () => {
            const state = store.getState()
            expect(state.nested.deep).toBeNull()
            expect(state).toEqual({
              ...otherState,
              nested: {
                ...otherState.nested,
                deep: null
              }
            })
          })
        })

        describe("AND we dispatch actions.nested.state.manageable.create.clear()", () => {
          beforeEach(() => {
            store.dispatch(actions.nested.state.manageable.create.clear())
          })

          test("THEN actions.nested.state.manageable updates to ''", () => {
            const state = store.getState()
            expect(state.nested.state.manageable).toBe('')
            expect(state).toEqual({
              ...otherState,
              nested: {
                ...otherState.nested,
                state: {
                  ...otherState.nested.state,
                  manageable: ''
                }
              }
            })
          })
        })

        describe("AND we dispatch actions.nested.state.manageable.create.clear(true)", () => {
          beforeEach(() => {
            store.dispatch(actions.nested.state.manageable.create.clear(true))
          })

          test("THEN actions.nested.state.manageable updates to null", () => {
            const state = store.getState()
            expect(state.nested.state.manageable).toBeNull()
            expect(state).toEqual({
              ...otherState,
              nested: {
                ...otherState.nested,
                state: {
                  ...otherState.nested.state,
                  manageable: null
                }
              }
            })
          })
        })

        describe("AND we dispatch actions.create.clear(true)", () => {
          beforeEach(() => {
            store.dispatch(actions.create.clear(true))
          })

          test("THEN state updates to null", () => {
            const state = store.getState()
            expect(state).toBeNull()
          })
        })

        describe("AND we dispatch actions.create.clear()", () => {
          beforeEach(() => {
            store.dispatch(actions.create.clear())
          })

          test("THEN state updates to {}", () => {
            const state = store.getState()
            expect(state).toEqual({})
          })
        })
      })
    })
  })
})