import { createStore } from 'redux'
import reduxLeaves from '../../src';

describe('create has action creators keyed by default and custom creatorKeys', () => {
  const initialState = {
    counter: 0,
    arbitrary: {
      nested: {
        path: ['hi!']
      }
    },
    str: 'hello world'
  }

  const reducersDict = {
    convertToFoobar: (_: string) => 'foobar'
  }

  const [reducer, actions] = reduxLeaves(initialState, reducersDict)

  test('All creates have default creatorKeys like update, set and push', () => {
    expect(typeof actions.counter.create.update).toBe('function')
    expect(typeof actions.arbitrary.nested.create.set).toBe('function')
    expect(typeof actions.arbitrary.nested.path.create.push).toBe('function')
  })

  test('All creates also have supplied custom creatorKeys', () => {
    expect(typeof actions.str.create.convertToFoobar).toBe('function')
    expect(typeof actions.arbitrary.nested.path[0].create.convertToFoobar).toBe('function')
  })

  const store = createStore(reducer)

  test("Executing an action creator returns an action to dispatch to the Redux store", () => {
    const updateCounter = actions.counter.create.update

    store.dispatch(updateCounter(5))
    expect(store.getState().counter).toBe(5)

    store.dispatch(updateCounter(3))
    expect(store.getState().counter).toBe(3)
  })

  describe('create can take a string argument as actionType', () => {
    test('If given this argument, it still has properties corresponding to default and custom provided creators', () => {
      expect(typeof actions.counter.create('UPDATE_COUNTER').update).toBe('function')
      expect(typeof actions.str.create('CONVERT_TO_FOOBAR').convertToFoobar).toBe('function')
    })

    test('The created actions have the supplied actionType as type', () => {
      const createNamedIncrement = actions.counter.create('NAMED_INCREMENT').increment
      const namedIncrement = createNamedIncrement()

      expect(namedIncrement.type).toBe('NAMED_INCREMENT')
      const currVal = store.getState().counter
      store.dispatch(namedIncrement)
      expect(store.getState().counter).toBe(currVal + 1)
    })
  })
})