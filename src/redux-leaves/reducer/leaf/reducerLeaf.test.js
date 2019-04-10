import { reducerLeaf } from './reducerLeaf';
import { createStore } from 'redux';

describe("**Feature**: a reducer leaf can increment a created store with reducer.increment()", () => {
  describe("GIVEN reducer = reducerLeaf({ prefix: 'app/prefix', route: ['some', 'route'], initialState: 0 })", () => {
    const reducer = reducerLeaf({ prefix: "app/prefix", route: ["some", "route"], initialState: 0 })

    describe("AND a store that is created from the reducer with no preloaded state", () => {
      let store
      beforeEach(() => {
        store = createStore(reducer)
      })

      describe("WHEN the store is dispatched reducer.increment()", () => {
        beforeEach(() => {
          store.dispatch(reducer.increment())
        })

        test("THEN the store has state of 1", () => {
          expect(store.getState()).toBe(1)
        })
      })
    })
  })
})