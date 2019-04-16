import _ from 'lodash';
import { createStore } from "redux";
import reduxLeaves from '../../../..';

describe("leaf.create.reset(): returns an action that, when dispatched, updates the leaf's state to the reducer's initialised state", () => {

  describe("Documentation example 1", () => {
    describe("GIVEN setup of initialState, otherState and store as documented", () => {
      const initialState = {
        num: 2,
        arr: [1, 2, 3],
      }

      const otherState = {
        num: 11,
        arr: ['a', 'b', 'c']
      }

      const [reducer, actions] = reduxLeaves(initialState)
      let store

      beforeEach(() => {
        store = createStore(reducer, otherState)
      })

      test("THEN store is initialised with otherState", () => {
        expect(store.getState()).toEqual(otherState)
      })

      describe("WHEN we execute store.dispatch(actions.num.create.reset()))", () => {
        beforeEach(() => {
          store.dispatch(actions.num.create.reset())
        })

        test("THEN the store's state.num is 2", () => {
          expect(store.getState().num).toBe(2)
        })

        describe("AND we execute store.dispatch(actions.create.reset())", () => {
          beforeEach(() => {
            store.dispatch(actions.create.reset())
          })

          test("THEN the store's state is { num: 2, arr: [1, 2, 3] }", () => {
            expect(store.getState()).toEqual({
              num: 2,
              arr: [1, 2, 3]
            })
          })
        })
      })
    })


  })

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

      test("THEN actions.counter.create.reset is a function", () => {
        expect(typeof actions.counter.create.reset).toBe("function")
      })

      test("AND actions.foo.create.reset is a function", () => {
        expect(typeof actions.foo.create.reset).toBe("function")
      })

      test("AND actions.nested.deep.create.reset is a function", () => {
        expect(typeof actions.nested.deep.create.reset).toBe("function")
      })

      test("AND actions.nested.state.manageable.create.reset is a function", () => {
        expect(typeof actions.nested.state.manageable.create.reset).toBe("function")
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

        describe("AND we dispatch actions.counter.create.reset()", () => {
          beforeEach(() => {
            store.dispatch(actions.counter.create.reset())
          })

          test("THEN actions.counter resets to 1", () => {
            const state = store.getState()
            expect(state.counter).toBe(1)
            expect(state).toEqual({ ...otherState, counter: 1 })
          })
        })

        describe("AND we dispatch actions.foo.create.reset()", () => {
          beforeEach(() => {
            store.dispatch(actions.foo.create.reset())
          })

          test("THEN actions.foo resets to ['bar']", () => {
            const state = store.getState()
            expect(state.foo).toEqual(['bar'])
            expect(state).toEqual({ ...otherState, foo: ['bar'] })
          })
        })

        describe("AND we dispatch actions.nested.deep.create.reset()", () => {
          beforeEach(() => {
            store.dispatch(actions.nested.deep.create.reset())
          })

          test("THEN actions.nested.deep resets to {}", () => {
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

        describe("AND we dispatch actions.nested.state.manageable.create.reset()", () => {
          beforeEach(() => {
            store.dispatch(actions.nested.state.manageable.create.reset())
          })

          test("THEN actions.nested.state.manageable resets to 'maybe...?'", () => {
            const state = store.getState()
            expect(state.nested.state.manageable).toEqual('maybe...?')
            expect(state).toEqual({
              ...otherState,
              nested: {
                ...otherState.nested,
                state: {
                  ...otherState.nested.state,
                  manageable: 'maybe...?'
                }
              }
            })
          })
        })

      })
    })
  })
})