import { createStore } from "redux";
import reduxLeaves from '../../src';

describe.skip("leaf.create.off(): returns an action that, when dispatched, updates the leaf's state to false", () => {

  describe("GIVEN initialState is an object", () => {
    const initialState = {
      foo: true,
      bar: true
    }

    const [reducer, actions] = reduxLeaves(initialState)
    const store = createStore(reducer)

    test('Calling create.off', () => {
      const turnOffFoo = actions.foo.create.off
      store.dispatch(turnOffFoo())
      expect(store.getState().foo).toBe(false)
    })

    test('Calling create(actionType).off', () => {
      const turnOffBar = actions.bar.create("TURN_OFF_BAR").off
      store.dispatch(turnOffBar())
      expect(store.getState().bar).toBe(false)
    })
  })
})