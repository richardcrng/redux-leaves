import { findActionRouteAndModifier } from './makeReducerLeaf';
import { makeReducerLeaf } from '.';
import * as utils from '../test.utils'

describe("makeReducerLeaf", () => {
  it("returns a function", () => {
    const result = makeReducerLeaf("app", null)
    expect(typeof result).toBe("function")
  })
})

// describe("**Feature** A vanilla reducer leaf can access action creator functions needed to update its own store", () => {

//   describe("GIVEN reducer = vanillaReducerLeaf({ prefix: 'app/prefix', route: ['some', 'route'], initialState: 0 })", () => {
//     const reducer = vanillaReducerLeaf({ prefix: "app/prefix", route: ["some", "route"], initialState: 0 })

//     describe("AND a store that is created from the reducer with no preloaded state", () => {
//       let store
//       beforeEach(() => {
//         store = createStore(reducer)
//       })

//       describe("WHEN the store is dispatched reducer.increment()", () => {
//         beforeEach(() => {
//           store.dispatch(reducer.increment())
//         })

//         test("THEN the store has state of 1", () => {
//           expect(store.getState()).toBe(1)
//         })
//       })
//     })
//   })
// })