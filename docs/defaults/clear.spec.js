import { createStore } from "redux";
import reduxLeaves from '../../src';

describe("leaf.create.clear(toNull = false): returns an action that, when dispatched, clear's the leaf's state", () => {
  const initialState = {
    bool: true,
    num: 2,
    str: 'foo',
    arr: [1, 2, 3]
  }

  const [reducer, actions] = reduxLeaves(initialState)
  const store = createStore(reducer)

  describe('Boolean', () => {
    const clearBool = actions.bool.create.clear

    it('Clears to false', () => {
      store.dispatch(clearBool())
      expect(store.getState().bool).toBe(false)
    })

    it('Clears to null if passed true', () => {
      store.dispatch(clearBool(true))
      expect(store.getState().bool).toBe(null)
    })
  })
})