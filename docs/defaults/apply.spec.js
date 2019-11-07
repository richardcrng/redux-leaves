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
    const applyToString = actions.str.create.apply
    store.dispatch(applyToString(state => state.toUpperCase()))
    expect(store.getState().str).toBe('FOO')
  })

  test("Calling create(actionType).apply on a leaf", () => {
    const applyToBoolean = actions.bool.create('APPLY_TO_BOOLEAN').apply
    store.dispatch(applyToBoolean(state => !state))
    expect(store.getState().bool).toBe(true)
  })

  test("Calling create.apply on a branch", () => {
    const applyToState = actions.create.apply
    store.dispatch(applyToState(state => ({ num: state.num, arr: state.arr })))
    expect(store.getState()).toEqual({ num: 2, arr: [1, 2, 3] })
  })

  test("Calling create.apply with two arguments", () => {
    const applyToArray = actions.arr.create.apply
    store.dispatch(applyToArray(
      (leafState, treeState) => leafState.map(element => element * treeState.num)
    ))
    expect(store.getState()).toEqual({ num: 2, arr: [2, 4, 6] })
  })
})