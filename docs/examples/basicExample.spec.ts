import { createStore } from 'redux';
import reduxLeaves from '../../src';


describe('Basic example', () => {
  const initialState = {
    counterOne: 0,
    counterTwo: 0
  }

  const [reducer, actions] = reduxLeaves(initialState)
  const store = createStore(reducer)

  test("Store initialises with the provided initialState", () => {
    expect(store.getState()).toEqual({ counterOne: 0, counterTwo: 0 })
  })

  test("We can increment counterOne by 3", () => {
    const actionToIncrementCounterOneByThree = actions.counterOne.create.increment(3)
    store.dispatch(actionToIncrementCounterOneByThree)
    expect(store.getState()).toEqual({ counterOne: 3, counterTwo: 0 })
  })

  test("We can increment counterTwo by 10", () => {
    store.dispatch(actions.counterTwo.create.increment(10))
    expect(store.getState()).toEqual({ counterOne: 3, counterTwo: 10 })
  })
})