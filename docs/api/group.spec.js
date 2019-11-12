import { createStore } from 'redux'
import reduxLeaves, { group } from '../../src';

describe('group groups together actions into a single one', () => {
  const initialState = {
    counter: 0,
    list: ['a']
  }

  const [reducer, actions] = reduxLeaves(initialState)
  const store = createStore(reducer)

  test('Example 1', () => {
    const incrementAndPush = group([
      actions.counter.create.increment(),
      actions.list.create.push('b')
    ])

    store.dispatch(incrementAndPush)
    expect(store.getState()).toEqual({ counter: 1, list: ['a', 'b'] })
  })
})