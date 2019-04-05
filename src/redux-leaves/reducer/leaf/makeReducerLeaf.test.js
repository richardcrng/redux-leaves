import { findActionRouteAndModifier } from './makeReducerLeaf';

describe("findPathAndModifier helper function", () => {
  
  describe("one argument provided", () => {

    it("returns an object with path and modifier properties", () => {
      expect(findActionRouteAndModifier("app/with/ACTION")).toEqual({
        path: ""
      })
    })

  })
})