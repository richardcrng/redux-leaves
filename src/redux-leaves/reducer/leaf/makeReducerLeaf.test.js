import { makeReducerLeaf } from './';
import { createStore } from 'redux';

describe("**Feature**: returns a reducer leaf function that looks at the relevant property in supplied initialState shape, optional prefix and optional invoked route", () => {
  describe("GIVEN initialState = { bool: true, counter: 10, foo: 'bar' }", () => {
    const initialState = { bool: true, counter: 10, foo: 'bar' }

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

          test("THEN reducer has an 'off' property that is a function", () => {
            expect(reducer.off).toBeDefined()
            expect(typeof reducer.off).toBe("function")
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

          test("THEN reducer has an 'increment' property that is a function", () => {
            expect(reducer.increment).toBeDefined()
            expect(typeof reducer.increment).toBe("function")
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

          test("THEN reducer has an 'update' property that is a function", () => {
            expect(reducer.update).toBeDefined()
            expect(typeof reducer.update).toBe("function")
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
      })
    })
  })
})