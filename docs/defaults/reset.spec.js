import { createStore } from "redux";
import reduxLeaves from '../../src';

describe("leaf.create.reset(): returns an action that, when dispatched, updates the leaf's state to the reducer's initialised state", () => {
  const initialState = {
    num: 2,
    arr: [1, 2, 3],
    bool: true
  }

  const otherState = {
    num: 11,
    arr: ['a', 'b', 'c'],
    bool: false
  }

  const [reducer, actions] = reduxLeaves(initialState)
  const store = createStore(reducer, otherState)

  test("State is the preloaded state", () => {
    expect(store.getState()).toEqual(otherState)
  })

  test("Calling create.reset on a leaf", () => {
    const resetNum = actions.num.create.reset
    store.dispatch(resetNum())
    expect(store.getState().num).toBe(2)
  })

  test("Calling create(actionType).reset on a leaf", () => {
    const resetBool = actions.bool.create.reset
    store.dispatch(resetBool())
    expect(store.getState().bool).toBe(true)
  })


  test("Calling create.reset on a branch", () => {
    const resetState = actions.create.reset
    store.dispatch(resetState())
    expect(store.getState()).toEqual({
      num: 2,
      arr: [1, 2, 3],
      bool: true
    })
  })
})