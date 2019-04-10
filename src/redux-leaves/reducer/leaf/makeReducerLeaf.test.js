import { makeReducerLeaf } from './';
import { createStore } from 'redux';

describe("**Feature**: returns a reducer leaf function that looks at the relevant property in supplied initialState shape, optional prefix and invoked route", () => {
  describe("GIVEN initialState = { bool: true, counter: 10, foo: 'bar', is: { nested: false } }", () => {
    const initialState = { bool: true, counter: 10, foo: 'bar', is: { nested: false } }

    describe("AND prefix = 'app/prefix'", () => {
      const prefix = "app/prefix"

      describe("WHEN reducerLeaf = makeReducerLeaf(initialState, prefix)", () => {
        const reducerLeaf = makeReducerLeaf(initialState, prefix)

        test("THEN reducerLeaf is a function", () => {
          expect(typeof reducerLeaf).toBe("function")
        })

        describe("AND reducer = reducerLeaf('bool')", () => {
          const reducer = reducerLeaf('bool')

          test("THEN reducer is a function", () => {
            expect(typeof reducer).toBe("function")
          })

          test("AND reducer has an 'off' property that is a function", () => {
            expect(reducer.off).toBeDefined()
            expect(typeof reducer.off).toBe("function")
          })

          test("AND reducer.off.type is 'app/prefix/bool/OFF'", () => {
            expect(reducer.off.type).toBe("app/prefix/bool/OFF")
          })

          describe("AND store = createStore(reducer)", () => {
            let store
            beforeEach(() => store = createStore(reducer))

            test("THEN the store has a state of true", () => {
              expect(store.getState()).toBe(true)
            })

            describe("AND store is dispatched reducer.off()", () => {
              beforeEach(() => store.dispatch(reducer.off()))

              test("THEN the store has a state of false", () => {
                expect(store.getState()).toBe(false)
              })
            })
          })
        })

        describe("AND reducer = reducerLeaf('counter')", () => {
          const reducer = reducerLeaf('counter')

          test("THEN reducer is a function", () => {
            expect(typeof reducer).toBe("function")
          })

          test("AND reducer has an 'increment' property that is a function", () => {
            expect(reducer.increment).toBeDefined()
            expect(typeof reducer.increment).toBe("function")
          })

          test("AND reducer.increment.type is 'app/prefix/counter/INCREMENT'", () => {
            expect(reducer.increment.type).toBe("app/prefix/counter/INCREMENT")
          })

          describe("AND store = createStore(reducer)", () => {
            let store
            beforeEach(() => store = createStore(reducer))

            test("THEN the store has a state of 10", () => {
              expect(store.getState()).toBe(10)
            })

            describe("AND store is dispatched reducer.increment(5)", () => {
              beforeEach(() => store.dispatch(reducer.increment(5)))

              test("THEN the store has a state of 15", () => {
                expect(store.getState()).toBe(15)
              })
            })
          })
        })

        describe("AND reducer = reducerLeaf('foo')", () => {
          const reducer = reducerLeaf('foo')

          test("THEN reducer is a function", () => {
            expect(typeof reducer).toBe("function")
          })

          test("AND reducer has an 'update' property that is a function", () => {
            expect(reducer.update).toBeDefined()
            expect(typeof reducer.update).toBe("function")
          })

          test("AND reducer.update.type is 'app/prefix/foo/SET'", () => {
            expect(reducer.update.type).toBe("app/prefix/foo/SET")
          })

          describe("AND store = createStore(reducer)", () => {
            let store
            beforeEach(() => store = createStore(reducer))

            test("THEN the store has a state of 'bar'", () => {
              expect(store.getState()).toBe('bar')
            })

            describe("AND store is dispatched reducer.update('foobar')", () => {
              beforeEach(() => store.dispatch(reducer.update('foobar')))

              test("THEN the store has a state of 'foobar'", () => {
                expect(store.getState()).toBe('foobar')
              })
            })
          })
        })

        describe("AND reducer = reducerLeaf('is', 'nested')", () => {
          const reducer = reducerLeaf('is', 'nested')

          test("THEN reducer is a function", () => {
            expect(typeof reducer).toBe("function")
          })

          test("AND reducer has an 'toggle' property that is a function", () => {
            expect(reducer.toggle).toBeDefined()
            expect(typeof reducer.toggle).toBe("function")
          })

          test("AND reducer.toggle.type is 'app/prefix/is/nested/TOGGLE'", () => {
            expect(reducer.toggle.type).toBe("app/prefix/is/nested/TOGGLE")
          })

          describe("AND store = createStore(reducer)", () => {
            let store
            beforeEach(() => store = createStore(reducer))

            test("THEN the store has a state of false", () => {
              expect(store.getState()).toBe(false)
            })

            describe("AND store is dispatched reducer.toggle()", () => {
              beforeEach(() => store.dispatch(reducer.toggle()))

              test("THEN the store has a state of true", () => {
                expect(store.getState()).toBe(true)
              })
            })
          })
        })
      })
    })

    describe("WHEN reducerLeaf = makeReducerLeaf(initialState)", () => {
      const reducerLeaf = makeReducerLeaf(initialState)

      test("THEN reducerLeaf is a function", () => {
        expect(typeof reducerLeaf).toBe("function")
      })

      describe("AND reducer = reducerLeaf('bool')", () => {
        const reducer = reducerLeaf('bool')

        test("THEN reducer is a function", () => {
          expect(typeof reducer).toBe("function")
        })

        test("AND reducer has an 'off' property that is a function", () => {
          expect(reducer.off).toBeDefined()
          expect(typeof reducer.off).toBe("function")
        })

        test("AND reducer.off.type is 'bool/OFF'", () => {
          expect(reducer.off.type).toBe("bool/OFF")
        })

        describe("AND store = createStore(reducer)", () => {
          let store
          beforeEach(() => store = createStore(reducer))

          test("THEN the store has a state of true", () => {
            expect(store.getState()).toBe(true)
          })

          describe("AND store is dispatched reducer.off()", () => {
            beforeEach(() => store.dispatch(reducer.off()))

            test("THEN the store has a state of false", () => {
              expect(store.getState()).toBe(false)
            })
          })
        })
      })

      describe("AND reducer = reducerLeaf('counter')", () => {
        const reducer = reducerLeaf('counter')

        test("THEN reducer is a function", () => {
          expect(typeof reducer).toBe("function")
        })

        test("AND reducer has an 'increment' property that is a function", () => {
          expect(reducer.increment).toBeDefined()
          expect(typeof reducer.increment).toBe("function")
        })

        test("AND reducer.increment.type is 'counter/INCREMENT'", () => {
          expect(reducer.increment.type).toBe("counter/INCREMENT")
        })

        describe("AND store = createStore(reducer)", () => {
          let store
          beforeEach(() => store = createStore(reducer))

          test("THEN the store has a state of 10", () => {
            expect(store.getState()).toBe(10)
          })

          describe("AND store is dispatched reducer.increment(5)", () => {
            beforeEach(() => store.dispatch(reducer.increment(5)))

            test("THEN the store has a state of 15", () => {
              expect(store.getState()).toBe(15)
            })
          })
        })
      })

      describe("AND reducer = reducerLeaf('foo')", () => {
        const reducer = reducerLeaf('foo')

        test("THEN reducer is a function", () => {
          expect(typeof reducer).toBe("function")
        })

        test("AND reducer has an 'update' property that is a function", () => {
          expect(reducer.update).toBeDefined()
          expect(typeof reducer.update).toBe("function")
        })

        test("AND reducer.update.type is 'foo/SET'", () => {
          expect(reducer.update.type).toBe("foo/SET")
        })

        describe("AND store = createStore(reducer)", () => {
          let store
          beforeEach(() => store = createStore(reducer))

          test("THEN the store has a state of 'bar'", () => {
            expect(store.getState()).toBe('bar')
          })

          describe("AND store is dispatched reducer.update('foobar')", () => {
            beforeEach(() => store.dispatch(reducer.update('foobar')))

            test("THEN the store has a state of 'foobar'", () => {
              expect(store.getState()).toBe('foobar')
            })
          })
        })
      })

      describe("AND reducer = reducerLeaf('is', 'nested')", () => {
        const reducer = reducerLeaf('is', 'nested')

        test("THEN reducer is a function", () => {
          expect(typeof reducer).toBe("function")
        })

        test("AND reducer has an 'toggle' property that is a function", () => {
          expect(reducer.toggle).toBeDefined()
          expect(typeof reducer.toggle).toBe("function")
        })

        test("AND reducer.toggle.type is 'is/nested/TOGGLE'", () => {
          expect(reducer.toggle.type).toBe("is/nested/TOGGLE")
        })

        describe("AND store = createStore(reducer)", () => {
          let store
          beforeEach(() => store = createStore(reducer))

          test("THEN the store has a state of false", () => {
            expect(store.getState()).toBe(false)
          })

          describe("AND store is dispatched reducer.toggle()", () => {
            beforeEach(() => store.dispatch(reducer.toggle()))

            test("THEN the store has a state of true", () => {
              expect(store.getState()).toBe(true)
            })
          })
        })
      })
    })
  })
})
