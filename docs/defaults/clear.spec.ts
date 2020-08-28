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

  describe('Boolean state', () => {
    const clearBool = actions.bool.create.clear

    it('Clears to false', () => {
      store.dispatch(clearBool())
      expect(store.getState().bool).toBe(false)
    })
  })

  describe('Number state', () => {
    const clearNum = actions.num.create.clear

    it('Clears to 0', () => {
      store.dispatch(clearNum())
      expect(store.getState().num).toBe(0)
    })
  })

  describe('String state', () => {
    const clearStr = actions.str.create.clear

    it("Clears to ''", () => {
      store.dispatch(clearStr())
      expect(store.getState().str).toBe('')
    })
  })

  describe('Array state', () => {
    const clearArr = actions.arr.create.clear

    it("Clears to []", () => {
      store.dispatch(clearArr())
      expect(store.getState().arr).toEqual([])
    })
  })

  describe('Object state', () => {
    const clearState = actions.create.clear

    it("Clears to {}", () => {
      store.dispatch(clearState())
      expect(store.getState()).toEqual({})
    })
  })
})