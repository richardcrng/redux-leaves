import { createStore } from 'redux';
import riduce from '../../../src';

describe('Basic example', () => {
  const initialState = {
    counterOne: 0,
    counterTwo: 0
  }

  const [reducer, actions] = riduce(initialState)
  const { dispatch, getState } = createStore(reducer)

  test("Store initialises with the provided initialState", () => {
    expect(getState()).toEqual({ counterOne: 0, counterTwo: 0 })
  })

  test("We can increment counterOne by 3", () => {
    const actionToIncrementCounterOneByThree = actions.counterOne.create.increment(3)
    dispatch(actionToIncrementCounterOneByThree)
    expect(getState()).toEqual({ counterOne: 3, counterTwo: 0 })
  })

  test("We can increment counterTwo by 10", () => {
    dispatch(actions.counterTwo.create.increment(10))
    expect(getState()).toEqual({ counterOne: 3, counterTwo: 10 })
  })
})