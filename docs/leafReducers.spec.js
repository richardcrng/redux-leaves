import { createStore } from "redux";
import reduxLeaves from '../src';

describe("Function shorthand", () => {

  describe("Example 1: custom action creator with no arguments", () => {
    describe("GIVEN initialState and customReducers", () => {
      const initialState = {
        foo: 3,
        bar: 4
      }

      const customReducers = {
        squareNumber: leafState => leafState ** 2
      }

      describe("WHEN we pass initialState and customReducers to reduxLeaves", () => {
        const [reducer, actions] = reduxLeaves(initialState, customReducers)
        let store

        beforeEach(() => store = createStore(reducer))

        test("THEN store initialises with initialState", () => {
          expect(store.getState()).toEqual(initialState)
        })

        test("AND create.squareNumber is defined for actions.foo and actions.bar", () => {
          expect(typeof actions.foo.create.squareNumber).toBe("function")
          expect(typeof actions.bar.create.squareNumber).toBe("function")
        })

        describe("AND we create an actionToSquareFoo and actionToSquareBar", () => {
          const actionToSquareFoo = actions.foo.create.squareNumber()
          const actionToSquareBar = actions.bar.create.squareNumber()

          test("THEN the type of actionToSquareFoo is 'foo/SQUARE_NUMBER'", () => {
            expect(actionToSquareFoo.type).toBe("foo/SQUARE_NUMBER")
          })

          test("AND the type of actionToSquareBar is 'bar/SQUARE_NUMBER'", () => {
            expect(actionToSquareBar.type).toBe("bar/SQUARE_NUMBER")
          })

          describe("AND we dispatch actionToSquareFoo to the store", () => {
            beforeEach(() => {
              store.dispatch(actionToSquareFoo)
            })

            test("THEN foo has squared, but not bar", () => {
              expect(store.getState()).toEqual({ foo: 9, bar: 4 })
            })

            describe("AND we dispatch actionToSquareBar to the store", () => {
              beforeEach(() => {
                store.dispatch(actionToSquareBar)
              })

              test("THEN bar has also squared now", () => {
                expect(store.getState()).toEqual({ foo: 9, bar: 16 })
              })
            })
          })
        })
      })
    })
  })

  describe("Example 2: custom action creator using payload and wholeState", () => {
    describe("GIVEN initialState and customReducers", () => {
      const initialState = {
        foo: 2,
        bar: [2, 4, 6, 8, 10]
      }

      const customReducers = {
        exponentiate: (leafState, { payload }) => leafState ** payload,
        remove: (leafState, { payload }, wholeState) => leafState.filter(e => e != wholeState[payload])
      }

      describe("WHEN we pass initialState and customReducers to reduxLeaves", () => {
        const [reducer, actions] = reduxLeaves(initialState, customReducers)
        let store

        beforeEach(() => store = createStore(reducer))

        test("THEN store initialises with initialState", () => {
          expect(store.getState()).toEqual(initialState)
        })

        test("AND create.custom.exponentiate is defined for actions.foo", () => {
          expect(typeof actions.foo.create.custom.exponentiate).toBe("function")
        })

        test("AND create.custom is defined for actions.bar", () => {
          expect(typeof actions.bar.create.custom.remove).toBe("function")
        })

        describe("AND we pass arguments to custom.exponentiate before dispatching", () => {
          const expWithOneArg = actions.foo.create.custom.exponentiate(2)
          const expWithTwoArgs = actions.foo.create.custom.exponentiate(3, 4)

          beforeEach(() => {
            store.dispatch(expWithTwoArgs)
          })

          test("THEN custom.exponentiate sets payload to be the first argument", () => {
            expect(expWithOneArg.payload).toBe(2)
            expect(expWithTwoArgs.payload).toBe(3)
          })

          test("AND the store state updates as expected", () => {
            expect(store.getState()).toEqual({ ...initialState, foo: 8 })
          })

          describe("AND we pass an argument to custom.remove before dispatching", () => {
            const removeUsingFoo = actions.bar.create.custom.remove("foo")

            beforeEach(() => {
              store.dispatch(removeUsingFoo)
            })

            test("THEN custom.remove sets payload to be the first argument", () => {
              expect(removeUsingFoo.payload).toEqual("foo")
            })

            test("AND the store state updates as expected", () => {
              expect(store.getState()).toEqual({ foo: 8, bar: [2, 4, 6, 10] })
            })
          })
        })
      })
    })
  })

  describe("Example 3: more detailed customisation with argsToPayload", () => {
    describe("GIVEN initialState and customReducers", () => {
      const initialState = {
        foo: [2, 4, 6, 8, 10]
      }

      const customReducers = {
        remove: {
          argsToPayload: (...values) => values,
          reducer: (leafState, { payload }) => leafState.filter(e => !payload.includes(e)),
          type: '!!! HEY THERE, I DID A THING !!!'
        }
      }

      describe("WHEN we pass initialState and customReducers to reduxLeaves", () => {
        const [reducer, actions] = reduxLeaves(initialState, customReducers)
        let store

        beforeEach(() => store = createStore(reducer))

        test("THEN store initialises with initialState", () => {
          expect(store.getState()).toEqual(initialState)
        })

        test("AND create.custom.remove is defined for actions.foo", () => {
          expect(typeof actions.foo.create.custom.remove).toBe("function")
        })
        
        describe("AND we pass arguments to custom.remove before dispatching", () => {
          const removeWithOneArg = actions.foo.create.custom.remove(4)
          const removeWithTwoArgs = actions.foo.create.custom.remove(4, 8)

          beforeEach(() => {
            store.dispatch(removeWithTwoArgs)
          })

          test("THEN custom.remove sets payload to be the first argument", () => {
            expect(removeWithOneArg.payload).toEqual([4])
            expect(removeWithTwoArgs.payload).toEqual([4, 8])
          })

          test("AND actions have the passed in type", () => {
            expect(removeWithOneArg.type).toBe('!!! HEY THERE, I DID A THING !!!')
            expect(removeWithTwoArgs.type).toBe('!!! HEY THERE, I DID A THING !!!')
          })

          test("AND the store state updates as expected", () => {
            expect(store.getState().foo).toEqual([2, 6, 10])
          })
        })
      })
    })
  })
})

describe("Object longhand", () => {
  describe("mutate key", () => {
    describe("GIVEN the leaf reducer setPropTrue", () => {
      const setPropTrue = {
        reducer: (leafState, { payload }) => {
          leafState[payload] = true
        },
        mutate: true
      }

      describe("WHEN we initialise reduxLeaves with empty state and setPropTrue in the dictionary", () => {
        const [reducer, actions] = reduxLeaves({}, { setPropTrue })
        let store
        beforeEach(() => {
          store = createStore(reducer)
        })

        test("THEN the store's state is {}", () => {
          expect(store.getState()).toEqual({})
        })

        describe("AND we dispatch actions.create.setPropTrue('foobar')", () => {
          beforeEach(() => {
            store.dispatch(actions.create.setPropTrue('foobar'))
          })

          test("THEN the store's state is { foobar: true }", () => {
            expect(store.getState()).toEqual({ foobar: true })
          })
        })
      })
    })
  })
})