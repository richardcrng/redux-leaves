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

  test('Calling create(actionType).update on a leaf', () => {
    const updateNum = actions.num.create('UPDATE_NUM').update
    store.dispatch(updateNum(9001))
    expect(store.getState().num).toBe(9001)
  })

  test('Calling create.update on a branch', () => {
    const updateState = actions.create.update
    store.dispatch(updateState({ any: { properties: true } }))
    expect(store.getState()).toEqual({ any: { properties: true } })
  })
})