import { createStore } from "redux";
import reduxLeaves from '../../src';

describe("leaf.create.do(callback): returns an action that, when dispatched, updates the leaf's state to the return value of callback(state, entireState)", () => {
  interface State {
    bool: boolean,
    num: number,
    str: string,
    arr: number[],
    obj: {
      num?: number,
      arr?: number[]
    }
  }

  const initialState: State = {
    bool: false,
    num: 2,
    str: 'foo',
    arr: [1, 2, 3],
    obj: {}
  }

  const [reducer, actions] = reduxLeaves(initialState)
  const store = createStore(reducer)

  test("Calling create.do on a leaf", () => {
    const doToString = actions.str.create.do
    store.dispatch(doToString((state) => state.toUpperCase()))
    expect(store.getState().str).toBe('FOO')
  })

  test("Calling create(actionType).do on a leaf", () => {
    const doToBoolean = actions.bool.create('APPLY_TO_BOOLEAN').do
    store.dispatch(doToBoolean(state => !state))
    expect(store.getState().bool).toBe(true)
  })

  test("Calling create.do on a branch", () => {
    const doToState = actions.obj.create.do
    store.dispatch(doToState((_, treeState) => ({ num: treeState.num, arr: treeState.arr })))
    expect(store.getState().obj).toEqual({ num: 2, arr: [1, 2, 3] })
  })

  test("Calling create.do with two arguments", () => {
    const doToArray = actions.arr.create.do
    store.dispatch(doToArray(
      (leafState, treeState) => leafState.map(element => element * treeState.num)
    ))
    expect(store.getState().arr).toEqual([2, 4, 6])
  })
})