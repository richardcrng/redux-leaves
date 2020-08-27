import { createStore } from "redux";
import reduxLeaves from '../../src';

describe.skip("leaf.create.toggle(): returns an action that, when dispatched, updates the leaf's state to false", () => {

  describe("GIVEN initialState is an object", () => {
    const initialState = {
      foo: true,
      bar: false
    }

    const [reducer, actions] = reduxLeaves(initialState)
    const store = createStore(reducer)

    test('Calling create.toggle', () => {
      const turnOnFoo = actions.foo.create.toggle
      store.dispatch(turnOnFoo())
      expect(store.getState().foo).toBe(false)
    })

    test('Calling create(actionType).toggle', () => {
      const turnOnBar = actions.bar.create("TURN_ON_BAR").toggle
      store.dispatch(turnOnBar())
      expect(store.getState().bar).toBe(true)
    })
  })
})