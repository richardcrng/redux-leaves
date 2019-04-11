import { pathJoin } from "./utils";

describe("pathJoin", () => {

  describe("**Feature**: when called with one flat array, returns a string joining them with /'s", () => {

    describe("GIVEN an array of ['app', 'path', 'example']", () => {
      const path = ["app", "path", "example"]

      describe("WHEN pathJoin is executed", () => {
        const result = pathJoin(path)

        test("THEN it returns 'app/path/example'", () => {
          expect(result).toBe("app/path/example")
        })
      })
    })
  })

  describe("**Feature**: when called with a nested array, returns a string joining the ultimate elemnts with /'s", () => {

    describe("GIVEN an array of ['app', ['path', 'example']]", () => {
      const path = ["app", ["path", "example"]]

      describe("WHEN pathJoin is executed", () => {
        const result = pathJoin(path)

        test("THEN it returns 'app/path/example'", () => {
          expect(result).toBe("app/path/example")
        })
      })
    })

    describe("GIVEN an array of ['app', ['path', 'example']]", () => {
      const path = ["app", ["path", "example"]]

      describe("WHEN pathJoin is executed", () => {
        const result = pathJoin(path)

        test("THEN it returns 'app/path/example'", () => {
          expect(result).toBe("app/path/example")
        })
      })
    })

    describe("GIVEN an array of [['app'], 'path', 'example']", () => {
      const path = [["app"], "path", "example"]

      describe("WHEN pathJoin is executed", () => {
        const result = pathJoin(path)

        test("THEN it returns 'app/path/example'", () => {
          expect(result).toBe("app/path/example")
        })
      })
    })

    describe("GIVEN an array of [[['app'], 'nested'], 'path', 'example']", () => {
      const path = [[["app"], 'nested'], "path", "example"]

      describe("WHEN pathJoin is executed", () => {
        const result = pathJoin(path)

        test("THEN it returns 'app/nested/path/example'", () => {
          expect(result).toBe("app/nested/path/example")
        })
      })
    })
  })

  describe("**Feature**: it cleans up trailing separators in the array provided", () => {

    describe("GIVEN an array of ['app/', '/path', '/example/']", () => {
      const path = ["app/", "/path", "/example/"]

      describe("WHEN pathJoin is executed", () => {
        const result = pathJoin(path)

        test("THEN it returns 'app/path/example'", () => {
          expect(result).toBe("app/path/example")
        })
      })
    })

    describe("GIVEN an array of ['app/', '/path', '/nested/example/']", () => {
      const path = ["app/", "/path", "/nested/example/"]

      describe("WHEN pathJoin is executed", () => {
        const result = pathJoin(path)

        test("THEN it returns 'app/path/nested/example'", () => {
          expect(result).toBe("app/path/nested/example")
        })
      })
    })
  })
})