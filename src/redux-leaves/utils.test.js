import { pathJoin } from "./utils";

describe("pathJoin utility", () => {
  describe("called with one array", () => {
    it("produces an appropriate path when provided an array of simple strings", () => {
      const result = pathJoin(["app", "path", "example"])
      expect(result).toBe("app/path/example")
    })

    it("produces an appropriate path when provided an array of arrays of simple strings", () => {
      const result = pathJoin(["app", ["some", "nested", "path"], "example"])
      expect(result).toBe("app/some/nested/path/example")
    })

    it("cleans up when elements have trailing join characters", () => {
      const result = pathJoin(["/app/", ["some/", "nested/other", "/path"], "example"])
      expect(result).toBe("app/some/nested/other/path/example")
    })
  })


})