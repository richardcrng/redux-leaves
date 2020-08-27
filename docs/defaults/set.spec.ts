import { createStore } from "redux";
import reduxLeaves from '../../src';

describe.skip("leaf.create.set(path, value): returns an action that, when dispatched, updates the leaf's state by non-mutatively setting value at state object's path", () => {
  const initialState = {
    foo: {},
    bar: { props: true }
  }

  const [reducer, actions] = reduxLeaves(initialState)
  const store = createStore(reducer)

  test("Setting a new property", () => {
    const setInFoo = actions.foo.create.set
    store.dispatch(setInFoo('accessed', true))
    expect(store.getState().foo).toEqual({ accessed: true })
  })

  test("Overwriting a property", () => {
    const setInBar = actions.bar.create.set
    store.dispatch(setInBar('props', false))
    expect(store.getState().bar).toEqual({ props: false })
  })
})