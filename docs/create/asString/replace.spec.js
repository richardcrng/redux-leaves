import _ from 'lodash';
import { createStore } from "redux";
import reduxLeaves from '../../../src';

describe("leaf.create.replace(): returns an action that, when dispatched, updates the leaf's state to !state", () => {

  describe("GIVEN initialState is an object", () => {
    const initialState = {
      foo: "foo"
    }

    describe("WHEN [reducer, actions] = reduxLeaves(initialState)", () => {
      const [reducer, actions] = reduxLeaves(initialState)

      test("THEN actions.foo.create.replace is a function", () => {
        expect(typeof actions.foo.create.replace).toBe("function")
      })

      describe("AND store = createStore(reducer)", () => {
        let store
        beforeEach(() => {
          store = createStore(reducer)
        })

        test("THEN store is initialised with state = initialState", () => {
          expect(store.getState()).toEqual(initialState)
        })

        describe("AND we dispatch actions.foo.create.replace('f', 'b')", () => {
          beforeEach(() => {
            store.dispatch(actions.foo.create.replace('f', 'b'))
          })

          test("THEN actions.foo state updates non-mutatively to 'boo'", () => {
            const state = store.getState()
            expect(state).toEqual({
              ...initialState,
              foo: 'boo'
            })
            expect(initialState.foo).toBe('foo')
          })
        })
      })
    })
  })
})
