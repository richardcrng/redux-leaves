import { createStore } from "redux";
import reduxLeaves from '../../src';

describe("leaf.create.update(value): returns an action that, when dispatched, updates the leaf's state to value", () => {

  const initialState = {
    bool: false,
    num: 2,
    str: 'foo',
    arr: [1, 2, 3]
  }

  const [reducer, actions] = reduxLeaves(initialState)
  const store = createStore(reducer)

  test('Calling create.update on a leaf', () => {
    const updateStr = actions.str.create.update
    store.dispatch(updateStr("I can put anything here"))
    expect(store.getState().str).toBe('I can put anything here')
  })

  test('Calling create.update on an array element', () => {
    const updateFirstElementOfArr = actions.arr[1].create.update
    store.dispatch(updateFirstElementOfArr('second'))
    expect(store.getState().arr).toEqual([1, 'second', 3])
  })

  test('Calling create.update on a branch', () => {
    const updateState = actions.create.update
    store.dispatch(updateState({ any: { properties: true } }))
    expect(store.getState()).toEqual({ any: { properties: true } })
  })
})