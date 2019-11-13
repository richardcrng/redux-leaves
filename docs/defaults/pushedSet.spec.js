import { createStore } from "redux";
import reduxLeaves from '../../src';

describe("leaf.create.set(path, value): returns an action that, when dispatched, updates the leaf's state at an auto-generated key (that orders chronologically after previous keys) with value", () => {
  const initialState = {
    foo: {},
  }

  const [reducer, actions] = reduxLeaves(initialState)
  const store = createStore(reducer)

  test("Setting some new properties", () => {
    const pushedSetInFoo = actions.foo.create.pushedSet
    store.dispatch(pushedSetInFoo('my first item'))
    store.dispatch(pushedSetInFoo('my second item'))
    expect(Object.values(store.getState().foo)).toEqual(['my first item', 'my second item'])
  })
})