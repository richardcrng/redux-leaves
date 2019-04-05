import { vanillaReducerLeaf } from ".";

describe("GIVEN a defined prefix, route and initialState", () => {
  const prefix = "app/prefix/"
  const route = ["here", "is", "a", "route"]
  const initialState = false

  describe("WHEN vanillaReducerLeaf is called with prefix, route and initialState", () => {
    const reducer = vanillaReducerLeaf({ prefix, route, initialState })

    test("THEN it returns a function", () => {
      expect(typeof reducer).toBe("function")
    })

    
  })
})