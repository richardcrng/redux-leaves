import _ from 'lodash';
import { createStore } from "redux";
import reduxLeaves from '../../../..';

describe("leaf.create.toggle(): returns an action that, when dispatched, updates the leaf's state to !state", () => {

  describe("GIVEN initialState is an object", () => {
    const initialState = {
      true: true,
      false: false
    }

    describe("WHEN [reducer, actions] = reduxLeaves(initialState)", () => {
      const [reducer, actions] = reduxLeaves(initialState)

      test("THEN actions.true.create.toggle is a function", () => {
        expect(typeof actions.true.create.toggle).toBe("function")
      })

      test("AND actions.false.create.toggle is a function", () => {
        expect(typeof actions.false.create.toggle).toBe("function")
      })

      describe("AND store = createStore(reducer)", () => {
        let store
        beforeEach(() => {
          store = createStore(reducer)
        })

        test("THEN store is initialised with state = initialState", () => {
          expect(store.getState()).toEqual(initialState)
        })

        describe("AND we dispatch actions.true.create.toggle()", () => {
          beforeEach(() => {
            store.dispatch(actions.true.create.toggle())
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

        describe("AND we dispatch actions.false.create.toggle()", () => {
          beforeEach(() => {
            store.dispatch(actions.false.create.toggle())
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
