import { createStore } from "redux";
import reduxLeaves from '../../../src';

describe("leaf.create.set(path, value): returns an action that, when dispatched, updates the leaf's state by non-mutatively setting value at state object's path", () => {

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

      test("THEN actions.nested.deep.create.set is a function", () => {
        expect(typeof actions.nested.deep.create.set).toBe("function")
      })

      describe("AND store = createStore(reducer)", () => {
        let store
        beforeEach(() => {
          store = createStore(reducer)
        })

        test("THEN store is initialised with state = initialState", () => {
          expect(store.getState()).toEqual(initialState)
        })

        describe("AND we dispatch actions.nested.deep.create.set('arbitrarily', true)", () => {
          beforeEach(() => {
            store.dispatch(actions.nested.deep.create.set('arbitrarily', true))
          })

          test("THEN actions.counter state non-mutatively updates to { arbitrarily: true }", () => {
            const state = store.getState()
            expect(state).toEqual({
              ...initialState,
              nested: {
                ...initialState.nested,
                deep: { arbitrarily: true }
              }
            })
            expect(initialState.nested.deep).toEqual({})
          })
        })

        describe("AND we dispatch actions.nested.deep.create.set('arbitrarily.so', true)", () => {
          beforeEach(() => {
            store.dispatch(actions.nested.deep.create.set('arbitrarily.so', true))
          })

          test("THEN actions.counter state non-mutatively updates to { 'arbitrarily.so': true }", () => {
            const state = store.getState()
            expect(state).toEqual({
              ...initialState,
              nested: {
                ...initialState.nested,
                deep: { 'arbitrarily.so': true }
              }
            })
            expect(initialState.nested.deep).toEqual({})
          })
        })
      })
    })
  })
})