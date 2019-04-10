import { makeLeafActions } from ".";

describe("**Feature**: it returns an object with properties corresponding to expected standard actions", () => {
  
  describe("GIVEN a prefix of 'app/prefix/dummy'", () => {
    const prefix = "app/prefix/dummy"

    describe("WHEN it is called with that prefix", () => {
      const leafActions = makeLeafActions(prefix)

      test("THEN it returns a function", () => {
        expect(typeof leafActions).toBe("function")
      })

      describe("AND it is executed with one argument, 'leaf'", () => {
        const result = leafActions("leaf")

        test("THEN it returns an object", () => {
          expect(typeof result).toBe("object")
        })

        test("AND its 'apply' property is an action creator of type 'app/prefix/dummy/leaf/APPLY'", () => {
          const { apply } = result;
          expect(apply).toBeDefined
          expect(typeof apply).toBe("function")
          expect(apply.type).toBe("app/prefix/dummy/leaf/APPLY")
        })

        test("AND its 'clear' property is an action creator of type 'app/prefix/dummy/leaf/CLEAR'", () => {
          const { clear } = result;
          expect(clear).toBeDefined
          expect(typeof clear).toBe("function")
          expect(clear.type).toBe("app/prefix/dummy/leaf/CLEAR")
        })

        test("AND its 'increment' property is an action creator of type 'app/prefix/dummy/leaf/INCREMENT'", () => {
          const { increment } = result;
          expect(increment).toBeDefined
          expect(typeof increment).toBe("function")
          expect(increment.type).toBe("app/prefix/dummy/leaf/INCREMENT")
        })

        test("AND its 'off' property is an action creator of type 'app/prefix/dummy/leaf/OFF'", () => {
          const { off } = result;
          expect(off).toBeDefined
          expect(typeof off).toBe("function")
          expect(off.type).toBe("app/prefix/dummy/leaf/OFF")
        })

        test("AND its 'on' property is an action creator of type 'app/prefix/dummy/leaf/ON'", () => {
          const { on } = result;
          expect(on).toBeDefined
          expect(typeof on).toBe("function")
          expect(on.type).toBe("app/prefix/dummy/leaf/ON")
        })

        test("AND its 'push' property is an action creator of type 'app/prefix/dummy/leaf/PUSH'", () => {
          const { push } = result;
          expect(push).toBeDefined
          expect(typeof push).toBe("function")
          expect(push.type).toBe("app/prefix/dummy/leaf/PUSH")
        })

        test("AND its 'reset' property is an action creator of type 'app/prefix/dummy/leaf/RESET'", () => {
          const { reset } = result;
          expect(reset).toBeDefined
          expect(typeof reset).toBe("function")
          expect(reset.type).toBe("app/prefix/dummy/leaf/RESET")
        })

        test("AND its 'set' property is an action creator of type 'app/prefix/dummy/leaf/SET'", () => {
          const { set } = result;
          expect(set).toBeDefined
          expect(typeof set).toBe("function")
          expect(set.type).toBe("app/prefix/dummy/leaf/SET")
        })

        test("AND its 'update' property is an action creator of type 'app/prefix/dummy/leaf/SET'", () => {
          const { update } = result;
          expect(update).toBeDefined
          expect(typeof update).toBe("function")
          expect(update.type).toBe("app/prefix/dummy/leaf/SET")
        })

        test("AND its 'toggle' property is an action creator of type 'app/prefix/dummy/leaf/TOGGLE'", () => {
          const { toggle } = result;
          expect(toggle).toBeDefined
          expect(typeof toggle).toBe("function")
          expect(toggle.type).toBe("app/prefix/dummy/leaf/TOGGLE")
        })
      })
    })
  })
})