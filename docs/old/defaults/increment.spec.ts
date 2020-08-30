import { createStore } from "redux";
import riduce from '../../../src';

describe("leaf.create.increment(n = 1): returns an action that, when dispatched, updates the leaf's state by non-mutatively incrementing it by n", () => {
  const initialState = {
    foo: 5,
    bar: 5
  }

  const [reducer, actions] = riduce(initialState)
  const store = createStore(reducer)

  test("No argument provided", () => {
    const incrementFoo = actions.foo.create.increment
    store.dispatch(incrementFoo())
    expect(store.getState().foo).toBe(6)
  })

  test("Providing an argument", () => {
    const incrementBar = actions.bar.create.increment
    store.dispatch(incrementBar(37))
    expect(store.getState().bar).toBe(42)
  })
})
