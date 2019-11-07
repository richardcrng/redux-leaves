import { createStore } from "redux";
import reduxLeaves from '../../src';

describe("leaf.create.apply(callback): returns an action that, when dispatched, updates the leaf's state to the return value of callback(state, entireState)", () => {
  const initialState = {
    bool: false,
    num: 2,
    str: 'foo',
    arr: [1, 2, 3],
    obj: {}
  }

  const [reducer, actions] = reduxLeaves(initialState)
  const store = createStore(reducer)

  test("Calling create.apply on a leaf", () => {
    store.dispatch(actions.str.create.apply(state => state.toUpperCase()))
    expect(store.getState().str).toBe('FOO')
  })

  test("Calling create(actionType).apply on a leaf", () => {
    store.dispatch(actions.bool.create('TOGGLE_BOOLEAN').apply(state => !state))
    expect(store.getState().bool).toBe(true)
  })

  test("Calling create.apply on a branch", () => {
    store.dispatch(actions.create.apply(state => ({
      num: state.num, arr: state.arr
    })))
    expect(store.getState()).toEqual({ num: 2, arr: [1, 2, 3] })
  })

  test("Calling create.apply with two arguments", () => {
    store.dispatch(actions.arr.create.apply((leafState, treeState) => leafState.map(element => element * treeState.num)))
    expect(store.getState()).toEqual({ num: 2, arr: [2, 4, 6] })
  })
})