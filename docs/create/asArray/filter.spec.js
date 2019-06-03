import { createStore } from "redux";
import reduxLeaves from '../../../src';

describe("leaf.filter(callback): returns an action that, when dispatched, updates the leaf's state by filtering it with the callback", () => {

  describe("Documentation example 1", () => {

    describe("GIVEN initialState, reducer, actions and created store", () => {
      const initialState = {
        foo: [1, 2, 3, 4, 5]
      }
      const [reducer, actions] = reduxLeaves(initialState)

      let store

      beforeEach(() => store = createStore(reducer))

      test("THEN the store initialises with initialState", () => {
        expect(store.getState()).toEqual(initialState)
      })

      test("AND actions.foo.create.filter is a function", () => {
        expect(typeof actions.foo.create.filter).toBe("function")
      })

      describe("WHEN we dispatch foo.create.filter(e => !(e % 2))", () => {
        beforeEach(() => {
          store.dispatch(actions.foo.create.filter(e => !(e % 2)))
        })

        test("THEN state.foo updates to [2, 4]", () => {
          expect(store.getState()).toEqual({ foo: [2, 4] })
        })
      })

    })

  })
})