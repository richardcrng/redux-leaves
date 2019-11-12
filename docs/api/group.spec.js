import { createStore } from 'redux'
import reduxLeaves, { group } from '../../src';

describe('group groups together actions into a single one', () => {
  describe("Actions array, no type", () => {
    const initialState = {
      counter: 0,
      list: ['a']
    }

    const [reducer, actions] = reduxLeaves(initialState)
    const store = createStore(reducer)

    test('Group bundles actions together into a single update', () => {
      const incrementAndPush = group([
        actions.counter.create.increment(),
        actions.list.create.push('b')
      ])

      store.dispatch(incrementAndPush)
      expect(store.getState()).toEqual({ counter: 1, list: ['a', 'b'] })
    })
  })

  describe("Actions array, type provided", () => {
    const initialState = {
      counter: 0,
      list: ['a']
    }

    const [reducer, actions] = reduxLeaves(initialState)
    const store = createStore(reducer)

    test('Returns an action of appropriate type and effect in reducer', () => {
      const incrementAndPush = group([
        actions.counter.create.increment(),
        actions.list.create.push('b')
      ], 'INCREMENT_AND_PUSH')

      expect(incrementAndPush.type).toBe('INCREMENT_AND_PUSH')

      store.dispatch(incrementAndPush)
      expect(store.getState()).toEqual({ counter: 1, list: ['a', 'b'] })
    })
  })

  describe("Order matters", () => {
    const initialState = {
      counter: 0,
      list: ['a']
    }

    const [reducer, actions] = reduxLeaves(initialState)
    const store = createStore(reducer)

    test('Processes actions in the order passed into the array', () => {
      const pushIncrementedValue = group([
        actions.counter.create.increment(),
        actions.list.create.apply((leafState, treeState) => [...leafState, treeState.counter])
      ])

      store.dispatch(pushIncrementedValue)
      expect(store.getState()).toEqual({ counter: 1, list: ['a', 1] })
    })
  })

  describe("Compound grouping", () => {
    const initialState = {
      counter: 0,
      list: ['a']
    }

    const [reducer, actions] = reduxLeaves(initialState)
    const store = createStore(reducer)

    test('Group bundles actions together into a single update', () => {
      const incrementAndPush = group([
        actions.counter.create.increment(),
        actions.list.create.push('b')
      ])

      const incrementAndPushAndIncrement = group([
        incrementAndPush,
        actions.counter.create.increment()
      ])

      store.dispatch(incrementAndPushAndIncrement)
      expect(store.getState()).toEqual({ counter: 2, list: ['a', 'b'] })
    })
  })
})