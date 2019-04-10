import { findActionRouteAndModifier } from './makeReducerLeaf';
import { makeReducerLeaf } from '.';
import * as utils from '../test.utils'

describe("makeReducerLeaf", () => {
  it("returns a function", () => {
    const result = makeReducerLeaf("app", null)
    expect(typeof result).toBe("function")
  })
})
