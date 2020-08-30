import { createStore } from "redux";
import riduce from '../../../src';

describe("leaf.create.update(value): returns an action that, when dispatched, updates the leaf's state to value", () => {

  const initialState = {
    bool: false,
    num: 2,
    str: 'foo',
    arr: [{ number: 4 }, { number: 2 }, { number: 7 }]
  }

  const [reducer, actions] = riduce(initialState)
  const store = createStore(reducer)

  test('Calling create.update on a leaf', () => {
    const updateStr = actions.str.create.update
    store.dispatch(updateStr("I can put anything here"))
    expect(store.getState().str).toBe('I can put anything here')
  })

  test('Calling create.update on an array element', () => {
    const updateFirstElementOfArr = actions.arr[0].create.update
    store.dispatch(updateFirstElementOfArr({ number: 1 }))
    expect(store.getState().arr).toEqual([{ number: 1 }, { number: 2 }, { number: 7 }])
  })

  test('Calling create.update within an array element', () => {
    // @ts-ignore
    const updateSecondElementNumberProp = actions.arr[1].number.create.update
    store.dispatch(updateSecondElementNumberProp(1337))
    expect(store.getState().arr).toEqual([{ number: 1 }, { number: 1337 }, { number: 7 }])
  })

  test('Calling create.update on a branch', () => {
    const updateState = actions.create.update
    // @ts-ignore
    store.dispatch(updateState({ any: { properties: true } }))
    expect(store.getState()).toEqual({ any: { properties: true } })
  })
})