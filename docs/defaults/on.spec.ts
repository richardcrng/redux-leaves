import { createStore } from "redux";
import riduce from '../../src';

describe("leaf.create.on(): returns an action that, when dispatched, updates the leaf's state to false", () => {

  describe("GIVEN initialState is an object", () => {
    const initialState = {
      foo: false,
      bar: false
    }

    const [reducer, actions] = riduce(initialState)
    const store = createStore(reducer)

    test('Calling create.on', () => {
      const turnOnFoo = actions.foo.create.on
      store.dispatch(turnOnFoo())
      expect(store.getState().foo).toBe(true)
    })

    test('Calling create(actionType).on', () => {
      const turnOnBar = actions.bar.create("TURN_ON_BAR").on
      store.dispatch(turnOnBar())
      expect(store.getState().bar).toBe(true)
    })
  })
})