import { findActionRouteAndModifier } from './makeReducerLeaf';
import { makeReducerLeaf } from '.';

describe("makeReducerLeaf", () => {
  it("returns a function", () => {
    const result = makeReducerLeaf("app", null)
    expect(typeof result).toBe("function")
  })
})

describe("findPathAndModifier helper function", () => {
  describe("one argument provided", () => {
    it("returns an object with route and modifier properties", () => {
      expect(findActionRouteAndModifier("app/with/some/ACTION")).toEqual({
        route: ["app", "with", "some"],
        modifier: "ACTION"
      })
    })
  })

  describe("two arguments provided", () => {
    it("returns an object with route appended by the meta path", () => {
      expect(findActionRouteAndModifier("app/with/some/ACTION", "meta/path/and")).toEqual({
        route: ["app", "with", "some", "meta", "path", "and"],
        modifier: "ACTION"
      })
    })

    it("deals with excessive separators", () => {
      expect(findActionRouteAndModifier("/app/with/some/ACTION/", "/meta/path/and/")).toEqual({
        route: ["app", "with", "some", "meta", "path", "and"],
        modifier: "ACTION"
      })
    })
  })
})