import { createStore, Store } from "redux";
import riduce from '../../../src';

describe("Function shorthand", () => {

  describe("Example 1: custom action creator with no arguments", () => {
    describe("GIVEN initialState and customReducers", () => {
      const initialState = {
        foo: 3,
        bar: 4
      }

      const customReducers = {
        squareNumber: (leafState: number) => leafState ** 2
      }

      describe("WHEN we pass initialState and customReducers to riduce", () => {
        const [reducer, actions] = riduce(initialState, customReducers)
        let store: Store

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
        exponentiate: (leafState: number, { payload }: { payload: number }) => leafState ** payload,
        remove: (leafState: number[], { payload }: { payload: keyof typeof initialState }, wholeState: typeof initialState) => leafState.filter(e => e !== wholeState[payload])
      }

      describe("WHEN we pass initialState and customReducers to riduce", () => {
        const [reducer, actions] = riduce(initialState, customReducers)
        let store: Store

        beforeEach(() => store = createStore(reducer))

        test("THEN store initialises with initialState", () => {
          expect(store.getState()).toEqual(initialState)
        })

        test("AND create.exponentiate is defined for actions.foo", () => {
          expect(typeof actions.foo.create.exponentiate).toBe("function")
        })

        test("AND create.remove is defined for actions.bar", () => {
          expect(typeof actions.bar.create.remove).toBe("function")
        })

        describe("AND we pass arguments to custom.exponentiate before dispatching", () => {
          const expWithOneArg = actions.foo.create.exponentiate(2)
          // @ts-ignore
          const expWithTwoArgs = actions.foo.create.exponentiate(3, 4)

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
            const removeUsingFoo = actions.bar.create.remove("foo")

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
          argsToPayload: (...values: any[]) => values,
          reducer: (leafState: any, { payload }: { payload: any }) => leafState.filter((e: any) => !payload.includes(e)),
          type: '!!! HEY THERE, I DID A THING !!!'
        }
      }

      describe("WHEN we pass initialState and customReducers to riduce", () => {
        const [reducer, actions] = riduce(initialState, customReducers)
        let store: Store

        beforeEach(() => store = createStore(reducer))

        test("THEN store initialises with initialState", () => {
          expect(store.getState()).toEqual(initialState)
        })

        test("AND create.remove is defined for actions.foo", () => {
          expect(typeof actions.foo.create.remove).toBe("function")
        })
        
        describe("AND we pass arguments to custom.remove before dispatching", () => {
          const removeWithOneArg = actions.foo.create.remove(4)
          const removeWithTwoArgs = actions.foo.create.remove(4, 8)

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
  describe("argsToPayload", () => {
    describe("GIVEN no argsToPayload defined in identity config object", () => {
      const identity = (leafState: any) => leafState

      describe("WHEN we initialise riduce with empty state and identity in the dictionary", () => {
        const [reducer, actions] = riduce({}, { identity })
        let store: Store
        beforeEach(() => {
          store = createStore(reducer)
        })

        test("THEN the store's state is {}", () => {
          expect(store.getState()).toEqual({})
        })

        describe("AND we create action = actions.create.identity(1, 2, 3, 4, 5, 6, 7)", () => {
          // @ts-ignore
          const action = actions.create.identity(1, 2, 3, 4, 5, 6, 7)

          test("THEN action.payload is 1", () => {
            expect(action.payload).toBe(1)
          })
        })
      })
    })

    describe("GIVEN argsToPayload = (..args) => args.slice(0, 5) in the identity config object", () => {
      const identity = {
        reducer: (leafState: any) => leafState,
        argsToPayload: (...args: any[]) => args.slice(0, 5)
      }

      describe("WHEN we initialise riduce with empty state and identity in the dictionary", () => {
        const [reducer, actions] = riduce({}, { identity })
        let store: Store
        beforeEach(() => {
          store = createStore(reducer)
        })

        test("THEN the store's state is {}", () => {
          expect(store.getState()).toEqual({})
        })

        describe("AND we create action = actions.create.identity(1, 2, 3, 4, 5, 6, 7)", () => {
          const action = actions.create.identity(1, 2, 3, 4, 5, 6, 7)

          test("THEN action.payload is [1, 2, 3, 4, 5]", () => {
            expect(action.payload).toEqual([1, 2, 3, 4, 5])
          })
        })
      })
    })

    describe("GIVEN argsToPayload = (first, second, ...rest) => ({ first, second, rest }) in the identity config object", () => {
      const identity = {
        reducer: (leafState: any) => leafState,
        argsToPayload: (first: any, second: any, ...rest: any[]) => ({  first, second, rest })
      }

      describe("WHEN we initialise riduce with empty state and identity in the dictionary", () => {
        const [reducer, actions] = riduce({}, { identity })
        let store: Store
        beforeEach(() => {
          store = createStore(reducer)
        })

        test("THEN the store's state is {}", () => {
          expect(store.getState()).toEqual({})
        })

        describe("AND we create action = actions.create.identity(1, 2, 3, 4, 5, 6, 7)", () => {
          const action = actions.create.identity(1, 2, 3, 4, 5, 6, 7)

          test("THEN action.payload is { first: 1, second: 2, rest: [3, 4, 5, 6, 7] }", () => {
            expect(action.payload).toEqual({ first: 1, second: 2, rest: [3, 4, 5, 6, 7] })
          })
        })
      })
    })
  })
})