import { createStore } from "redux";
import reduxLeaves from '../../../src';

describe("leaf.create.off(): returns an action that, when dispatched, updates the leaf's state to false", () => {

  describe("GIVEN initialState is an object", () => {
    const initialState = {
      true: true,
      false: false
    }

    describe("WHEN [reducer, actions] = reduxLeaves(initialState)", () => {
      const [reducer, actions] = reduxLeaves(initialState)

      test("THEN actions.true.create.off is a function", () => {
        expect(typeof actions.true.create.off).toBe("function")
      })

      test("AND actions.false.create.off is a function", () => {
        expect(typeof actions.false.create.off).toBe("function")
      })

      describe("AND store = createStore(reducer)", () => {
        let store
        beforeEach(() => {
          store = createStore(reducer)
        })

        test("THEN store is initialised with state = initialState", () => {
          expect(store.getState()).toEqual(initialState)
        })

        describe("AND we dispatch actions.true.create.off()", () => {
          beforeEach(() => {
            store.dispatch(actions.true.create.off())
          })

          test("THEN actions.true state updates non-mutatively to false", () => {
            const state = store.getState()
            expect(state).toEqual({
              ...initialState,
              true: false
            })
            expect(initialState.true).toBe(true)
          })
        })

        describe("AND we dispatch actions.false.create.off()", () => {
          beforeEach(() => {
            store.dispatch(actions.false.create.off())
          })

          test("THEN actions.false state remains false", () => {
            const state = store.getState()
            expect(state).toEqual({
              ...initialState,
              false: false
            })
            expect(initialState.false).toBe(false)
          })
        })
      })
    })
  })
})