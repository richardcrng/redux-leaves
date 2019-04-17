import _ from 'lodash';
import { createStore } from "redux";
import reduxLeaves from '../../../src';

describe("leaf.create.drop(n = 1): returns an action that, when dispatched, updates the leaf's state by non-mutatively dropping the first n values", () => {

  describe("GIVEN initialState is an object", () => {
    const initialState = {
      empty: [],
      integers: [1, 2, 3]
    }

    describe("WHEN [reducer, actions] = reduxLeaves(initialState)", () => {
      const [reducer, actions] = reduxLeaves(initialState)

      test("THEN actions.empty.create.drop is a function", () => {
        expect(typeof actions.empty.create.drop).toBe("function")
      })

      test("AND actions.integers.create.drop is a function", () => {
        expect(typeof actions.integers.create.drop).toBe("function")
      })

      describe("AND store = createStore(reducer)", () => {
        let store
        beforeEach(() => {
          store = createStore(reducer)
        })

        test("THEN store is initialised with state = initialState", () => {
          expect(store.getState()).toEqual(initialState)
        })

        describe("AND we dispatch actions.integers.create.drop()", () => {
          beforeEach(() => {
            store.dispatch(actions.integers.create.drop())
          })

          test("THEN actions.integers state updates non-mutatively to [2, 3]", () => {
            const state = store.getState()
            expect(state).toEqual({
              ...initialState,
              integers: [2, 3]
            })
            expect(initialState.integers).toEqual([1, 2, 3])
          })
        })

        describe("AND we dispatch actions.integers.create.drop(2)", () => {
          beforeEach(() => {
            store.dispatch(actions.integers.create.drop(2))
          })

          test("THEN actions.integers state updates non-mutatively to [3]", () => {
            const state = store.getState()
            expect(state).toEqual({
              ...initialState,
              integers: [3]
            })
            expect(initialState.integers).toEqual([1, 2, 3])
          })
        })
      })
    })
  })
})