import { makeActionCreator } from ".";

const ACTION_TYPE_CONSTANT = "ACTION_TYPE_CONSTANT"
const PAYLOAD_DUMMY_STRING = "PAYLOAD_DUMMY_STRING"
const META_DUMMY_STRING = "META_DUMMY_STRING"

it('returns a function with the given type', () => {
  const result = makeActionCreator(ACTION_TYPE_CONSTANT)
  expect(typeof result).toBe("function")
  expect(result.type).toBe(ACTION_TYPE_CONSTANT)
})

describe("returned action creator function", () => {
  const actionCreator = makeActionCreator(ACTION_TYPE_CONSTANT)

  describe("executed with one argument", () => {
    const action = actionCreator(PAYLOAD_DUMMY_STRING)

    it("returns an action object with given type and argument as payload", () => {
      expect(action).toEqual({
        type: ACTION_TYPE_CONSTANT,
        payload: PAYLOAD_DUMMY_STRING
      })
    })
  })

  describe("executed with two arguments", () => {
    const action = actionCreator(PAYLOAD_DUMMY_STRING, META_DUMMY_STRING)

    it("returns an action object with given type, payload from first argument and meta from second argument", () => {
      expect(action).toEqual({
        type: ACTION_TYPE_CONSTANT,
        payload: PAYLOAD_DUMMY_STRING,
        meta: META_DUMMY_STRING
      })
    })
  })
})