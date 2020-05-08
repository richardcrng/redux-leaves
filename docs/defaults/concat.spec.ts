import { createStore } from "redux";
import reduxLeaves from '../../src';

describe("leaf.create.concat(array): returns an action that, when dispatched, updates the leaf's state by non-mutatively concatenating it with array", () => {
  const initialState = {
    arr: [1, 2, 3],
    str: 'foo'
  }

  const [reducer, actions] = reduxLeaves(initialState)
  const store = createStore(reducer)
  
  test('Concatenating an array', () => {
    const concatToArr = actions.arr.create.concat
    store.dispatch(concatToArr(['a', 'b', 'c']))
    expect(store.getState().arr).toEqual([1, 2, 3, 'a', 'b', 'c'])
  })

  test('Concatenating a string', () => {
    const concatToStr = actions.str.create.concat
    store.dispatch(concatToStr('bar'))
    expect(store.getState().str).toBe('foobar')
  })
})