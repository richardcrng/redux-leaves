import _ from 'lodash';
import { createStore } from "redux";
import reduxLeaves from '../../..';

describe("leaf.create.increment(n = 1): returns an action that, when dispatched, updates the leaf's state by non-mutatively incrementing it by n", () => {

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

      test("THEN actions.counter.create.increment is a function", () => {
        expect(typeof actions.counter.create.increment).toBe("function")
      })

      describe("AND store = createStore(reducer)", () => {
        let store
        beforeEach(() => {
          store = createStore(reducer)
        })

        test("THEN store is initialised with state = initialState", () => {
          expect(store.getState()).toEqual(initialState)
        })

        describe("AND we dispatch actions.counter.create.increment()", () => {
          beforeEach(() => {
            store.dispatch(actions.counter.create.increment())
          })

          test("THEN actions.counter state non-mutatively updates to 2", () => {
            const state = store.getState()
            expect(state).toEqual({ ...initialState, counter: 2 })
            expect(initialState.counter).toBe(1)
          })
        })

        describe("AND we dispatch actions.counter.create.increment(4)", () => {
          beforeEach(() => {
            store.dispatch(actions.counter.create.increment(4))
          })

          test("THEN actions.counter state non-mutatively updates to 5", () => {
            const state = store.getState()
            expect(state).toEqual({ ...initialState, counter: 5 })
            expect(initialState.counter).toBe(1)
          })
        })

        describe("AND we dispatch actions.counter.create.increment(-1.5)", () => {
          beforeEach(() => {
            store.dispatch(actions.counter.create.increment(-1.5))
          })

          test("THEN actions.counter state non-mutatively updates to -0.5", () => {
            const state = store.getState()
            expect(state).toEqual({ ...initialState, counter: -0.5 })
            expect(initialState.counter).toBe(1)
          })
        })
      })
    })
  })
})
