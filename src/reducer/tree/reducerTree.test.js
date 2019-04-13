import _ from 'lodash';
import { reducerTree } from "../tree";
import { createStore } from "redux";

describe("API: reduxLeaves(initialState)", () => {

  describe("GIVEN nested initialState with non-null values for shape { bool, counter, foo: { value, nesting: { deep, manageable } } }", () => {
    const initialState = {
      bool: true,
      counter: 0,
      foo: {
        value: "foo",
        nesting: {
          deep: true,
          manageable: false,
        }
      },
      object: {}
    }

    describe("WHEN reducer = reducerTree(initialState)", () => {
      const reducer = reducerTree(initialState)

      test("THEN reducer is a function", () => {
        expect(typeof reducer).toBe("function")
      })

      test("AND reducer.bool is a function", () => {
        expect(typeof reducer.bool).toBe("function")
      })

      test("AND reducer.object is a function", () => {
        expect(typeof reducer.object).toBe("function")
      })

      test("AND reducer.foo is an object", () => {
        expect(typeof reducer.foo).toBe("object")
      })

      test("AND reducer.foo.value is a function", () => {
        expect(typeof reducer.foo.value).toBe("function")
      })

      describe("AND store = createStore(reducer)", () => {
        let store
        beforeEach(() => {
          store = createStore(reducer)
        })

        test("THEN store is initialised with state = initialState", () => {
          expect(store.getState()).toEqual(initialState)
        })
      })
    })
  })
})

describe("API: leaf", () => {

  describe("leaf.apply(callback): returns an action that, when dispatched, updates the leaf's state to the return value of callback(state)", () => {

    describe("GIVEN non-trivially nested API (as in the documentation)", () => {
      const initialState = {
        counter: 1,
        foo: ["bar"],
        nested: {
          deep: {},
          state: {
            manageable: "maybe...?"
          }
        }
      }

      describe("WHEN reducer = reducerTree(initialState)", () => {
        const reducer = reducerTree(initialState)

        test("THEN reducer.counter.apply is a function", () => {
          expect(typeof reducer.counter.apply).toBe("function")
        })

        test("AND reducer.foo.apply is a function", () => {
          expect(typeof reducer.foo.apply).toBe("function")
        })

        test("AND reducer.nested.deep.apply is a function", () => {
          expect(typeof reducer.nested.deep.apply).toBe("function")
        })

        test("AND reducer.nested.state.manageable.apply is a function", () => {
          expect(typeof reducer.nested.state.manageable.apply).toBe("function")
        })


        describe("AND store = createStore(reducer)", () => {
          let store
          beforeEach(() => {
            store = createStore(reducer)
          })

          test("THEN store is initialised with state = initialState", () => {
            expect(store.getState()).toEqual(initialState)
          })

          describe("AND we dispatch reducer.counter.apply(n => n * 7)", () => {
            beforeEach(() => {
              store.dispatch(reducer.counter.apply(n => n * 7))
            })

            test("THEN reducer.counter updates to 7", () => {
              const state = store.getState()
              expect(state.counter).toBe(7)
              expect(state).toEqual({ ...initialState, counter: 7 })
            })
          })

          describe("AND we dispatch reducer.foo.apply(arr => ['foo', ...arr])", () => {
            beforeEach(() => {
              store.dispatch(reducer.foo.apply(arr => ['foo', ...arr]))
            })

            test("THEN reducer.foo updates to ['foo', 'bar']", () => {
              const state = store.getState()
              expect(state.foo).toEqual(['foo', 'bar'])
              expect(state).toEqual({ ...initialState, foo: ['foo', 'bar'] })
            })
          })

          describe("AND we dispatch reducer.nested.deep.apply(obj => ({ ...obj, arbitrarily: true }))", () => {
            beforeEach(() => {
              store.dispatch(reducer.nested.deep.apply(obj => ({ ...obj, arbitrarily: true })))
            })

            test("THEN reducer.nested.deep updates to { arbitrarily: true }", () => {
              const state = store.getState()
              expect(state.nested.deep).toEqual({ arbitrarily: true })
              expect(state).toEqual({
                ...initialState,
                nested: {
                  ...initialState.nested,
                  deep: { arbitrarily: true }
                }
              })
            })
          })

          describe("AND we dispatch reducer.nested.state.manageable.apply(str => str.concat(' DEFINITELY!'))", () => {
            beforeEach(() => {
              store.dispatch(reducer.nested.state.manageable.apply(str => str.concat(' DEFINITELY!')))
            })

            test("THEN reducer.nested.state.manageable updates to 'maybe...? DEFINITELY!'", () => {
              const state = store.getState()
              expect(state.nested.state.manageable).toEqual('maybe...? DEFINITELY!')
              expect(state).toEqual({
                ...initialState,
                nested: {
                  ...initialState.nested,
                  state: {
                    ...initialState.nested.state,
                    manageable: 'maybe...? DEFINITELY!'
                  }
                }
              })
            })
          })

        })
      })
    })
  })

  describe("leaf.clear(): returns an action that, when dispatched, updates the leaf's state to null", () => {

    describe("GIVEN non-trivially nested API (as in the documentation)", () => {
      const initialState = {
        counter: 1,
        foo: ["bar"],
        nested: {
          deep: {},
          state: {
            manageable: "maybe...?"
          }
        }
      }

      describe("WHEN reducer = reducerTree(initialState)", () => {
        const reducer = reducerTree(initialState)

        test("THEN reducer.counter.clear is a function", () => {
          expect(typeof reducer.counter.clear).toBe("function")
        })

        test("AND reducer.foo.clear is a function", () => {
          expect(typeof reducer.foo.clear).toBe("function")
        })

        test("AND reducer.nested.deep.clear is a function", () => {
          expect(typeof reducer.nested.deep.clear).toBe("function")
        })

        test("AND reducer.nested.state.manageable.clear is a function", () => {
          expect(typeof reducer.nested.state.manageable.clear).toBe("function")
        })


        describe("AND store = createStore(reducer)", () => {
          let store
          beforeEach(() => {
            store = createStore(reducer)
          })

          test("THEN store is initialised with state = initialState", () => {
            expect(store.getState()).toEqual(initialState)
          })

          describe("AND we dispatch reducer.counter.clear()", () => {
            beforeEach(() => {
              store.dispatch(reducer.counter.clear())
            })

            test("THEN reducer.counter updates to null", () => {
              const state = store.getState()
              expect(state.counter).toBeNull()
              expect(state).toEqual({ ...initialState, counter: null })
            })
          })

          describe("AND we dispatch reducer.foo.clear()", () => {
            beforeEach(() => {
              store.dispatch(reducer.foo.clear())
            })

            test("THEN reducer.foo updates to null", () => {
              const state = store.getState()
              expect(state.foo).toBeNull()
              expect(state).toEqual({ ...initialState, foo: null })
            })
          })

          describe("AND we dispatch reducer.nested.deep.clear()", () => {
            beforeEach(() => {
              store.dispatch(reducer.nested.deep.clear())
            })

            test("THEN reducer.nested.deep updates to null", () => {
              const state = store.getState()
              expect(state.nested.deep).toBeNull()
              expect(state).toEqual({
                ...initialState,
                nested: {
                  ...initialState.nested,
                  deep: null
                }
              })
            })
          })

          describe("AND we dispatch reducer.nested.state.manageable.clear()", () => {
            beforeEach(() => {
              store.dispatch(reducer.nested.state.manageable.clear())
            })

            test("THEN reducer.nested.state.manageable updates to null", () => {
              const state = store.getState()
              expect(state.nested.state.manageable).toBeNull()
              expect(state).toEqual({
                ...initialState,
                nested: {
                  ...initialState.nested,
                  state: {
                    ...initialState.nested.state,
                    manageable: null
                  }
                }
              })
            })
          })

        })
      })
    })
  })

  describe("leaf.concat(...values): returns an action that, when dispatched, updates the leaf's state by non-mutatively concatenating it with values", () => {

    describe("GIVEN initialState is an object", () => {
      const initialState = {
        empty: [],
        integers: [1, 2, 3]
      }

      describe("WHEN reducer = reducerTree(initialState)", () => {
        const reducer = reducerTree(initialState)

        test("THEN reducer.empty.concat is a function", () => {
          expect(typeof reducer.empty.concat).toBe("function")
        })

        test("AND reducer.integers.concat is a function", () => {
          expect(typeof reducer.integers.concat).toBe("function")
        })

        describe("AND store = createStore(reducer)", () => {
          let store
          beforeEach(() => {
            store = createStore(reducer)
          })

          test("THEN store is initialised with state = initialState", () => {
            expect(store.getState()).toEqual(initialState)
          })

          describe("AND we dispatch reducer.empty.concat(1, 2, 3)", () => {
            beforeEach(() => {
              store.dispatch(reducer.empty.concat(1, 2, 3))
            })

            test("THEN reducer.empty state updates non-mutatively to [1, 2, 3]", () => {
              const state = store.getState()
              expect(state).toEqual({
                ...initialState,
                empty: [1, 2, 3]
              })
              expect(initialState.empty).toEqual([])
            })
          })

          describe("AND we dispatch reducer.empty.concat([1, 2, 3])", () => {
            beforeEach(() => {
              store.dispatch(reducer.empty.concat([1, 2, 3]))
            })

            test("THEN reducer.empty state updates non-mutatively to [1, 2, 3]", () => {
              const state = store.getState()
              expect(state).toEqual({
                ...initialState,
                empty: [1, 2, 3]
              })
              expect(initialState.empty).toEqual([])
            })
          })
        })
      })
    })
  })

  describe("leaf.drop(n = 1): returns an action that, when dispatched, updates the leaf's state by non-mutatively dropping the first n values", () => {

    describe("GIVEN initialState is an object", () => {
      const initialState = {
        empty: [],
        integers: [1, 2, 3]
      }

      describe("WHEN reducer = reducerTree(initialState)", () => {
        const reducer = reducerTree(initialState)

        test("THEN reducer.empty.drop is a function", () => {
          expect(typeof reducer.empty.drop).toBe("function")
        })

        test("AND reducer.integers.drop is a function", () => {
          expect(typeof reducer.integers.drop).toBe("function")
        })

        describe("AND store = createStore(reducer)", () => {
          let store
          beforeEach(() => {
            store = createStore(reducer)
          })

          test("THEN store is initialised with state = initialState", () => {
            expect(store.getState()).toEqual(initialState)
          })

          describe("AND we dispatch reducer.integers.drop()", () => {
            beforeEach(() => {
              store.dispatch(reducer.integers.drop())
            })

            test("THEN reducer.integers state updates non-mutatively to [2, 3]", () => {
              const state = store.getState()
              expect(state).toEqual({
                ...initialState,
                integers: [2, 3]
              })
              expect(initialState.integers).toEqual([1, 2, 3])
            })
          })

          describe("AND we dispatch reducer.integers.drop(2)", () => {
            beforeEach(() => {
              store.dispatch(reducer.integers.drop(2))
            })

            test("THEN reducer.integers state updates non-mutatively to [3]", () => {
              const state = store.getState()
              expect(state).toEqual({
                ...initialState,
                integers: [3]
              })
              expect(initialState.integers).toEqual([1, 2, 3])
            })
          })
        })
      })
    })
  })

  describe("leaf.increment(n = 1): returns an action that, when dispatched, updates the leaf's state by non-mutatively incrementing it by n", () => {

    describe("GIVEN non-trivially nested API (as in the documentation)", () => {
      const initialState = {
        counter: 1,
        foo: ["bar"],
        nested: {
          deep: {},
          state: {
            manageable: "maybe...?"
          }
        }
      }

      describe("WHEN reducer = reducerTree(initialState)", () => {
        const reducer = reducerTree(initialState)

        test("THEN reducer.counter.increment is a function", () => {
          expect(typeof reducer.counter.increment).toBe("function")
        })

        describe("AND store = createStore(reducer)", () => {
          let store
          beforeEach(() => {
            store = createStore(reducer)
          })

          test("THEN store is initialised with state = initialState", () => {
            expect(store.getState()).toEqual(initialState)
          })

          describe("AND we dispatch reducer.counter.increment()", () => {
            beforeEach(() => {
              store.dispatch(reducer.counter.increment())
            })

            test("THEN reducer.counter state non-mutatively updates to 2", () => {
              const state = store.getState()
              expect(state).toEqual({ ...initialState, counter: 2 })
              expect(initialState.counter).toBe(1)
            })
          })

          describe("AND we dispatch reducer.counter.increment(4)", () => {
            beforeEach(() => {
              store.dispatch(reducer.counter.increment(4))
            })

            test("THEN reducer.counter state non-mutatively updates to 5", () => {
              const state = store.getState()
              expect(state).toEqual({ ...initialState, counter: 5 })
              expect(initialState.counter).toBe(1)
            })
          })

          describe("AND we dispatch reducer.counter.increment(-1.5)", () => {
            beforeEach(() => {
              store.dispatch(reducer.counter.increment(-1.5))
            })

            test("THEN reducer.counter state non-mutatively updates to -0.5", () => {
              const state = store.getState()
              expect(state).toEqual({ ...initialState, counter: -0.5 })
              expect(initialState.counter).toBe(1)
            })
          })
        })
      })
    })
  })

  describe("leaf.off(): returns an action that, when dispatched, updates the leaf's state to false", () => {

    describe("GIVEN initialState is an object", () => {
      const initialState = {
        true: true,
        false: false
      }

      describe("WHEN reducer = reducerTree(initialState)", () => {
        const reducer = reducerTree(initialState)

        test("THEN reducer.true.off is a function", () => {
          expect(typeof reducer.true.off).toBe("function")
        })

        test("AND reducer.false.off is a function", () => {
          expect(typeof reducer.false.off).toBe("function")
        })

        describe("AND store = createStore(reducer)", () => {
          let store
          beforeEach(() => {
            store = createStore(reducer)
          })

          test("THEN store is initialised with state = initialState", () => {
            expect(store.getState()).toEqual(initialState)
          })

          describe("AND we dispatch reducer.true.off()", () => {
            beforeEach(() => {
              store.dispatch(reducer.true.off())
            })

            test("THEN reducer.true state updates non-mutatively to false", () => {
              const state = store.getState()
              expect(state).toEqual({
                ...initialState,
                true: false
              })
              expect(initialState.true).toBe(true)
            })
          })

          describe("AND we dispatch reducer.false.off()", () => {
            beforeEach(() => {
              store.dispatch(reducer.false.off())
            })

            test("THEN reducer.false state remains false", () => {
              const state = store.getState()
              expect(state).toEqual({
                ...initialState,
                false: false
              })
              expect(initialState.false).toBe(false)
            })
          })
        })
      })
    })
  })

  describe("leaf.on(): returns an action that, when dispatched, updates the leaf's state to true", () => {

    describe("GIVEN initialState is an object", () => {
      const initialState = {
        true: true,
        false: false
      }

      describe("WHEN reducer = reducerTree(initialState)", () => {
        const reducer = reducerTree(initialState)

        test("THEN reducer.true.on is a function", () => {
          expect(typeof reducer.true.on).toBe("function")
        })

        test("AND reducer.false.on is a function", () => {
          expect(typeof reducer.false.on).toBe("function")
        })

        describe("AND store = createStore(reducer)", () => {
          let store
          beforeEach(() => {
            store = createStore(reducer)
          })

          test("THEN store is initialised with state = initialState", () => {
            expect(store.getState()).toEqual(initialState)
          })

          describe("AND we dispatch reducer.true.on()", () => {
            beforeEach(() => {
              store.dispatch(reducer.true.on())
            })

            test("THEN reducer.true state remains true", () => {
              const state = store.getState()
              expect(state).toEqual({
                ...initialState,
                true: true
              })
              expect(initialState.true).toBe(true)
            })
          })

          describe("AND we dispatch reducer.false.on()", () => {
            beforeEach(() => {
              store.dispatch(reducer.false.on())
            })

            test("THEN reducer.false state updates non-mutatively to true", () => {
              const state = store.getState()
              expect(state).toEqual({
                ...initialState,
                false: true
              })
              expect(initialState.false).toBe(false)
            })
          })
        })
      })
    })
  })
})
