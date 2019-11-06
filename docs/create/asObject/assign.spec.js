import { createStore } from "redux";
import reduxLeaves from '../../../src';

describe("leaf.create.assign(...sources): returns an action that, when dispatched, updates the leaf's state by non-mutatively copying over properties from the sources", () => {

  describe("Documentation example 1", () => {

    describe("GIVEN initial state, reducer, actions and store as in example", () => {
      const initialState = {
        foo: { props: true }
      }

      const [reducer, actions] = reduxLeaves(initialState)
      let store

      beforeEach(() => store = createStore(reducer))

      test("THEN store initialises with initialState", () => {
        expect(store.getState()).toEqual(initialState)
      })

      describe("WHEN we dispatch actions.foo.create.assign({ string: 'foo' })", () => {
        beforeEach(() => {
          store.dispatch(actions.foo.create.assign({ string: 'foo' }))
        })

        test("THEN store state.foo updates to { props: true, string: 'foo' }", () => {
          expect(store.getState()).toEqual({
            foo: { props: true, string: 'foo' }
          })
        })

      })
    })


  })
})