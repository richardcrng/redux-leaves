import { createStore } from "redux";
import reduxLeaves from '../../../src';

describe("leaf.create.concat(array): returns an action that, when dispatched, updates the leaf's state by non-mutatively concatenating it with array", () => {

  describe("GIVEN initialState is an object", () => {
    const initialState = {
      empty: [],
      integers: [1, 2, 3]
    }

    describe("WHEN [reducer, actions] = reduxLeaves(initialState)", () => {
      const [reducer, actions] = reduxLeaves(initialState)

      test("THEN actions.empty.create.concat is a function", () => {
        expect(typeof actions.empty.create.concat).toBe("function")
      })

      test("AND actions.integers.create.concat is a function", () => {
        expect(typeof actions.integers.create.concat).toBe("function")
      })

      describe("AND store = createStore(reducer)", () => {
        let store
        beforeEach(() => {
          store = createStore(reducer)
        })

        test("THEN store is initialised with state = initialState", () => {
          expect(store.getState()).toEqual(initialState)
        })

        describe("AND we dispatch actions.empty.create.concat([1, 2, 3])", () => {
          beforeEach(() => {
            store.dispatch(actions.empty.create.concat([1, 2, 3]))
          })

          test("THEN actions.empty state updates non-mutatively to [1, 2, 3]", () => {
            const state = store.getState()
            expect(state).toEqual({
              ...initialState,
              empty: [1, 2, 3]
            })
            expect(initialState.empty).toEqual([])
          })
        })

        describe("AND we dispatch actions.integers.create.concat([4, 5, 6])", () => {
          beforeEach(() => {
            store.dispatch(actions.integers.create.concat([4, 5, 6]))
          })

          test("THEN actions.integers state updates non-mutatively to [1, 2, 3,4, 5, 6]", () => {
            const state = store.getState()
            expect(state).toEqual({
              ...initialState,
              integers: [1, 2, 3, 4, 5, 6]
            })
            expect(initialState.integers).toEqual([1, 2, 3])
          })
        })
      })
    })
  })
})