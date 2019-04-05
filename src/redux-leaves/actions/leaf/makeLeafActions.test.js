import { makeLeafActions } from ".";
import { makeActionCreator } from "../creator";

const PREFIX_DUMMY = "app/prefix/dummy/"
const LEAF_DUMMY = "leaf"

it("returns a leafActions function", () => {
  const leafActions = makeLeafActions(PREFIX_DUMMY)
  expect(typeof leafActions).toBe("function")
})

describe("returned function", () => {
  const leafActions = makeLeafActions(PREFIX_DUMMY)

  describe("executed with one argument", () => {
    const actions = leafActions(LEAF_DUMMY)

    it("has a CLEAR function attached", () => {
      const { clear } = actions;
      expect(typeof clear).toBe("function")
      expect(clear.type).toBe("app/prefix/dummy/leaf/CLEAR")
    })
  })
})