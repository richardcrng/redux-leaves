import { createStore } from "redux";
import reduxLeaves from '../../src';

describe("leaf.create.path(path, value): returns an action that, when dispatched, updates the leaf's state by setting a proprety at path as value", () => {
  const initialState = {
    foo: {},
    bar: { arbitrary: { keys: 3 } }
  }

  const [reducer, actions] = reduxLeaves(initialState)
  const store = createStore(reducer)
  
  test("Setting a new property", () => {
    const setAtPathInFoo = actions.foo.create.path
    store.dispatch(setAtPathInFoo(['nested', 'deep'], true))
    expect(store.getState().foo).toEqual({ nested: { deep: true } })
  })

  test("Overwriting a property", () => {
    const setAtPathInBar = actions.bar.create.path
    store.dispatch(setAtPathInBar(['arbitrary', 'keys'], 5))
    expect(store.getState().bar).toEqual({ arbitrary: { keys: 5 }})
  })
})