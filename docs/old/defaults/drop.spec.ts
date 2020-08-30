import { createStore } from "redux";
import riduce from '../../../src';

describe("leaf.create.drop(n = 1): returns an action that, when dispatched, updates the leaf's state by non-mutatively dropping the first n values", () => {
  const initialState = {
    foo: ['a', 'b', 'c'],
  bar: ['a', 'b', 'c']
  }

  const [reducer, actions] = riduce(initialState)
  const store = createStore(reducer)

  test("No argument provided", () => {
    const dropFromFoo = actions.foo.create.drop
    store.dispatch(dropFromFoo())
    expect(store.getState().foo).toEqual(['b', 'c'])
  })

  test("Providing an argument", () => {
    const dropFromBar = actions.bar.create.drop
    store.dispatch(dropFromBar(2))
    expect(store.getState().bar).toEqual(['c'])
  })
})