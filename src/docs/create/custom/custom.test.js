import _ from 'lodash';
import { createStore } from "redux";
import reduxLeaves from '../../../..';

describe("API: reduxLeaves(initialState, [customLogic = {}])", () => {

  describe("Example 1: custom action creator with no arguments", () => {
    describe("GIVEN initialState and customLogic", () => {
      const initialState = {
        foo: 3,
        bar: 4
      }

      const customLogic = {
        square: {
          reducer: leafState => leafState ** 2
        }
      }

      describe("WHEN we pass initialState and customLogic to reduxLeaves", () => {
        const [reducer, actions] = reduxLeaves(initialState, customLogic)
        let store

        beforeEach(() => store = createStore(reducer))

        test("THEN store initialises with initialState", () => {
          expect(store.getState()).toEqual(initialState)
        })

        test("AND create.custom.square is defined for actions.foo and actions.bar", () => {
          expect(typeof actions.foo.create.custom.square).toBe("function")
          expect(typeof actions.bar.create.custom.square).toBe("function")
        })

        describe("AND we dispatch actions.foo.create.custom.square()", () => {
          beforeEach(() => {
            store.dispatch(actions.foo.create.custom.square())
          })

          test("THEN foo has squared, but not bar", () => {
            expect(store.getState()).toEqual({ foo: 9, bar: 4 })
          })

          describe("AND we dispatch actions.bar.create.custom.square()", () => {
            beforeEach(() => {
              store.dispatch(actions.bar.create.custom.square())
            })

            test("THEN bar has also squared now", () => {
              expect(store.getState()).toEqual({ foo: 9, bar: 16 })
            })
          })
        })
      })
    })

    describe.skip("AND some specified customLogic", () => {
      const customLogic = {
        double: {
          reducer: leafState => leafState * 2
        },
        compact: {
          argsToPayload: (...values) => values,
          reducer: (leafState, { payload }) => leafState.filter(e => !payload.includes(e))
        }
      }

      describe("WHEN [reducer, actions] = reduxLeaves(initialState, customLogic)", () => {
        const [reducer, actions] = reduxLeaves(initialState, customLogic)

        test("THEN actions.create.custom is an object", () => {
          expect(typeof actions.create.custom).toBe("object")
        })
      })
    })
  })
})