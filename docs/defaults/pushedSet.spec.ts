import { createStore } from "redux";
import reduxLeaves from '../../src';

describe("leaf.create.set(path, value): returns an action that, when dispatched, updates the leaf's state at an auto-generated key (that orders chronologically after previous keys) with value", () => {
  const initialState = {
    foo: {},
    bar: {}
  }

  const [reducer, actions] = reduxLeaves(initialState)
  const store = createStore(reducer)

  test("Passing a value", () => {
    const pushedSetInFoo = actions.foo.create.pushedSet
    store.dispatch(pushedSetInFoo('my first item'))
    store.dispatch(pushedSetInFoo('my second item'))
    expect(Object.values(store.getState().foo)).toEqual(['my first item', 'my second item'])
  })

  test("Passing a callback", () => {
    const pushedSetInBar = actions.bar.create.pushedSet
    store.dispatch(pushedSetInBar((key: string) => ({ id: key, text: 'my first item' })))
    const barState = store.getState().bar
    expect(Object.values(barState)[0]).toHaveProperty('id', Object.keys(barState)[0])
    expect(Object.values(barState)[0]).toHaveProperty('text', 'my first item')
  })
})