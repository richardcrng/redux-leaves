import { createStore } from "redux";
import reduxLeaves from '../../src';

describe.skip("leaf.filter(callback): returns an action that, when dispatched, updates the leaf's state by filtering it with the callback", () => {
  const initialState = {
    foo: [1, 2, 3, 4, 5],
    bar: ['cat', 'dog', 'bat']
  }

  const [reducer, actions] = reduxLeaves(initialState)
  const store = createStore(reducer)

  test('Calling create.filter', () => {
    const filterFoo = actions.foo.create.filter
    store.dispatch(filterFoo<number>(e => !(e % 2)))
    expect(store.getState().foo).toEqual([2, 4])
  })

  test('Calling create(actionType).filter', () => {
    const filterBar = actions.bar.create('FILTER_BAR').filter
    store.dispatch(filterBar<string>(e => e.includes('at')))
    expect(store.getState().bar).toEqual(['cat', 'bat'])
  })

  
})