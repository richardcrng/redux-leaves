import { findActionRouteAndModifier } from './makeReducerLeaf';

describe("findPathAndModifier helper function", () => {
  
  describe("one argument provided", () => {
    it("returns an object with route and modifier properties", () => {
      expect(findActionRouteAndModifier("app/with/some/ACTION")).toEqual({
        route: ["app", "with", "some"],
        modifier: "ACTION"
      })
    })

  })
})