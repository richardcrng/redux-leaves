import { createStore } from "redux";
import reduxLeaves from '../../../src';

describe("leaf.create.on(): returns an action that, when dispatched, updates the leaf's state to true", () => {

  describe("GIVEN initialState is an object", () => {
    const initialState = {
      true: true,
      false: false
    }

    describe("WHEN [reducer, actions] = reduxLeaves(initialState)", () => {
      const [reducer, actions] = reduxLeaves(initialState)

      test("THEN actions.true.create.on is a function", () => {
        expect(typeof actions.true.create.on).toBe("function")
      })

      test("AND actions.false.create.on is a function", () => {
        expect(typeof actions.false.create.on).toBe("function")
      })

      describe("AND store = createStore(reducer)", () => {
        let store
        beforeEach(() => {
          store = createStore(reducer)
        })

        test("THEN store is initialised with state = initialState", () => {
          expect(store.getState()).toEqual(initialState)
        })

        describe("AND we dispatch actions.true.create.on()", () => {
          beforeEach(() => {
            store.dispatch(actions.true.create.on())
          })

          test("THEN actions.true state remains true", () => {
            const state = store.getState()
            expect(state).toEqual({
              ...initialState,
              true: true
            })
            expect(initialState.true).toBe(true)
          })
        })

        describe("AND we dispatch actions.false.create.on()", () => {
          beforeEach(() => {
            store.dispatch(actions.false.create.on())
          })

          test("THEN actions.false state updates non-mutatively to true", () => {
            const state = store.getState()
            expect(state).toEqual({
              ...initialState,
              false: true
            })
            expect(initialState.false).toBe(false)
          })
        })
      })
    })
  })
})