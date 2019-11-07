import { createStore } from "redux";
import reduxLeaves from '../../src';

describe("leaf.create.path(path, value): returns an action that, when dispatched, updates the leaf's state by setting a proprety at path as value", () => {
  const initialState = {
    foo: {},
    bar: {}
  }

  const [reducer, actions] = reduxLeaves(initialState)
  const store = createStore(reducer)
  
  test("Calling create.path", () => {
    const setAtPathInFoo = actions.foo.create.path
    store.dispatch(setAtPathInFoo(['nested', 'deep'], true))
    expect(store.getState().foo).toEqual({ nested: { deep: true } })
  })

  test("Calling create(actionType)", () => {
    const setAtPathInBar = actions.bar.create("SET_AT_PATH_IN_BAR").path
    store.dispatch(setAtPathInBar(['arbitrary', 'keys'], 4))
    expect(store.getState().bar).toEqual({ arbitrary: { keys: 4 }})
  })
})