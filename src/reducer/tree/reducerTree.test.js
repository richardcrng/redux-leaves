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

  describe("leaf.clear(toNull = false): returns an action that, when dispatched, clear's the leaf's state", () => {

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


        describe("AND store = createStore(reducer, otherState)", () => {
          let store
          const otherState = {
            counter: 5,
            foo: ["FOOBAR"],
            nested: {
              deep: {
                props: true
              },
              state: {
                manageable: "let's find out"
              }
            }
          }
          beforeEach(() => {
            store = createStore(reducer, otherState)
          })

          test("THEN store is initialised with state = otherState", () => {
            expect(store.getState()).toEqual(otherState)
          })

          describe("AND we dispatch reducer.counter.clear()", () => {
            beforeEach(() => {
              store.dispatch(reducer.counter.clear())
            })

            test("THEN reducer.counter updates to 0", () => {
              const state = store.getState()
              expect(state.counter).toBe(0)
              expect(state).toEqual({ ...otherState, counter: 0 })
            })
          })

          describe("AND we dispatch reducer.counter.clear(true)", () => {
            beforeEach(() => {
              store.dispatch(reducer.counter.clear(true))
            })

            test("THEN reducer.counter updates to null", () => {
              const state = store.getState()
              expect(state.counter).toBeNull()
              expect(state).toEqual({ ...otherState, counter: null })
            })
          })

          describe("AND we dispatch reducer.foo.clear()", () => {
            beforeEach(() => {
              store.dispatch(reducer.foo.clear())
            })

            test("THEN reducer.foo updates to []", () => {
              const state = store.getState()
              expect(state.foo).toEqual([])
              expect(state).toEqual({ ...otherState, foo: [] })
            })
          })

          describe("AND we dispatch reducer.foo.clear(true)", () => {
            beforeEach(() => {
              store.dispatch(reducer.foo.clear(true))
            })

            test("THEN reducer.foo updates to null", () => {
              const state = store.getState()
              expect(state.foo).toBeNull()
              expect(state).toEqual({ ...otherState, foo: null })
            })
          })

          describe("AND we dispatch reducer.nested.deep.clear()", () => {
            beforeEach(() => {
              store.dispatch(reducer.nested.deep.clear())
            })

            test("THEN reducer.nested.deep updates to {}", () => {
              const state = store.getState()
              expect(state.nested.deep).toEqual({})
              expect(state).toEqual({
                ...otherState,
                nested: {
                  ...otherState.nested,
                  deep: {}
                }
              })
            })
          })

          describe("AND we dispatch reducer.nested.deep.clear(true)", () => {
            beforeEach(() => {
              store.dispatch(reducer.nested.deep.clear(true))
            })

            test("THEN reducer.nested.deep updates to null", () => {
              const state = store.getState()
              expect(state.nested.deep).toBeNull()
              expect(state).toEqual({
                ...otherState,
                nested: {
                  ...otherState.nested,
                  deep: null
                }
              })
            })
          })

          describe("AND we dispatch reducer.nested.state.manageable.clear()", () => {
            beforeEach(() => {
              store.dispatch(reducer.nested.state.manageable.clear())
            })

            test("THEN reducer.nested.state.manageable updates to ''", () => {
              const state = store.getState()
              expect(state.nested.state.manageable).toBe('')
              expect(state).toEqual({
                ...otherState,
                nested: {
                  ...otherState.nested,
                  state: {
                    ...otherState.nested.state,
                    manageable: ''
                  }
                }
              })
            })
          })

          describe("AND we dispatch reducer.nested.state.manageable.clear(true)", () => {
            beforeEach(() => {
              store.dispatch(reducer.nested.state.manageable.clear(true))
            })

            test("THEN reducer.nested.state.manageable updates to null", () => {
              const state = store.getState()
              expect(state.nested.state.manageable).toBeNull()
              expect(state).toEqual({
                ...otherState,
                nested: {
                  ...otherState.nested,
                  state: {
                    ...otherState.nested.state,
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

  describe("leaf.push(element, [index = -1], [replace = false]): returns an action that, when dispatched, updates the leaf's state by non-mutatively pushing element into leaf's state at index. If replace === true, then element replaces the existing element with that index.", () => {

    describe("GIVEN initialState is an object", () => {
      const initialState = {
        foo: [1, 2, 3],
        bar: [1, 2, 3],
        foobar: [1, 2, 3]
      }

      describe("WHEN reducer = reducerTree(initialState)", () => {
        const reducer = reducerTree(initialState)

        test("THEN reducer.foo.push is a function", () => {
          expect(typeof reducer.foo.push).toBe("function")
        })

        test("AND reducer.bar.push is a function", () => {
          expect(typeof reducer.bar.push).toBe("function")
        })

        test("AND reducer.foobar.push is a function", () => {
          expect(typeof reducer.foobar.push).toBe("function")
        })

        describe("AND store = createStore(reducer)", () => {
          let store
          beforeEach(() => {
            store = createStore(reducer)
          })

          test("THEN store is initialised with state = initialState", () => {
            expect(store.getState()).toEqual(initialState)
          })

          describe("AND we dispatch reducer.foo.push(4)", () => {
            beforeEach(() => {
              store.dispatch(reducer.foo.push(4))
            })

            test("THEN reducer.foo state updates non-mutatively to [1, 2, 3, 4]", () => {
              const state = store.getState()
              expect(state).toEqual({
                ...initialState,
                foo: [1, 2, 3, 4]
              })
              expect(initialState.foo).toEqual([1, 2, 3])
            })
          })

          describe("AND we dispatch reducer.foo.push([4, 5])", () => {
            beforeEach(() => {
              store.dispatch(reducer.foo.push([4, 5]))
            })

            test("THEN reducer.foo state updates non-mutatively to [1, 2, 3, [4, 5]]", () => {
              const state = store.getState()
              expect(state).toEqual({
                ...initialState,
                foo: [1, 2, 3, [4, 5]]
              })
              expect(initialState.foo).toEqual([1, 2, 3])
            })
          })

          describe("AND we dispatch reducer.bar.push(4, 0)", () => {
            beforeEach(() => {
              store.dispatch(reducer.bar.push(4, 0))
            })

            test("THEN reducer.bar state updates non-mutatively to [4, 1, 2, 3]", () => {
              const state = store.getState()
              expect(state).toEqual({
                ...initialState,
                bar: [4, 1, 2, 3]
              })
              expect(initialState.bar).toEqual([1, 2, 3])
            })
          })

          describe("AND we dispatch reducer.foobar.push(4, 0, true)", () => {
            beforeEach(() => {
              store.dispatch(reducer.foobar.push(4, 0, true))
            })

            test("THEN reducer.foobar state updates non-mutatively to [4, 2, 3]", () => {
              const state = store.getState()
              expect(state).toEqual({
                ...initialState,
                foobar: [4, 2, 3]
              })
              expect(initialState.foobar).toEqual([1, 2, 3])
            })
          })
        })
      })
    })
  })

  describe("leaf.reset(): returns an action that, when dispatched, updates the leaf's state to the reducer's initialised state", () => {

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

        test("THEN reducer.counter.reset is a function", () => {
          expect(typeof reducer.counter.reset).toBe("function")
        })

        test("AND reducer.foo.reset is a function", () => {
          expect(typeof reducer.foo.reset).toBe("function")
        })

        test("AND reducer.nested.deep.reset is a function", () => {
          expect(typeof reducer.nested.deep.reset).toBe("function")
        })

        test("AND reducer.nested.state.manageable.reset is a function", () => {
          expect(typeof reducer.nested.state.manageable.reset).toBe("function")
        })


        describe("AND store = createStore(reducer, otherState)", () => {
          let store
          const otherState = {
            counter: 5,
            foo: ["FOOBAR"],
            nested: {
              deep: {
                props: true
              },
              state: {
                manageable: "let's find out"
              }
            }
          }
          beforeEach(() => {
            store = createStore(reducer, otherState)
          })

          test("THEN store is initialised with state = otherState", () => {
            expect(store.getState()).toEqual(otherState)
          })

          describe("AND we dispatch reducer.counter.reset()", () => {
            beforeEach(() => {
              store.dispatch(reducer.counter.reset())
            })

            test("THEN reducer.counter resets to 1", () => {
              const state = store.getState()
              expect(state.counter).toBe(1)
              expect(state).toEqual({ ...otherState, counter: 1 })
            })
          })

          describe("AND we dispatch reducer.foo.reset()", () => {
            beforeEach(() => {
              store.dispatch(reducer.foo.reset())
            })

            test("THEN reducer.foo resets to ['bar']", () => {
              const state = store.getState()
              expect(state.foo).toEqual(['bar'])
              expect(state).toEqual({ ...otherState, foo: ['bar'] })
            })
          })

          describe("AND we dispatch reducer.nested.deep.reset()", () => {
            beforeEach(() => {
              store.dispatch(reducer.nested.deep.reset())
            })

            test("THEN reducer.nested.deep resets to {}", () => {
              const state = store.getState()
              expect(state.nested.deep).toEqual({})
              expect(state).toEqual({
                ...otherState,
                nested: {
                  ...otherState.nested,
                  deep: {}
                }
              })
            })
          })

          describe("AND we dispatch reducer.nested.state.manageable.reset()", () => {
            beforeEach(() => {
              store.dispatch(reducer.nested.state.manageable.reset())
            })

            test("THEN reducer.nested.state.manageable resets to 'maybe...?'", () => {
              const state = store.getState()
              expect(state.nested.state.manageable).toEqual('maybe...?')
              expect(state).toEqual({
                ...otherState,
                nested: {
                  ...otherState.nested,
                  state: {
                    ...otherState.nested.state,
                    manageable: 'maybe...?'
                  }
                }
              })
            })
          })

        })
      })
    })
  })

  describe("leaf.set(path, value): returns an action that, when dispatched, updates the leaf's state by non-mutatively setting value at state object's path", () => {

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

        test("THEN reducer.nested.deep.set is a function", () => {
          expect(typeof reducer.nested.deep.set).toBe("function")
        })

        describe("AND store = createStore(reducer)", () => {
          let store
          beforeEach(() => {
            store = createStore(reducer)
          })

          test("THEN store is initialised with state = initialState", () => {
            expect(store.getState()).toEqual(initialState)
          })

          describe("AND we dispatch reducer.nested.deep.set('arbitrarily', true)", () => {
            beforeEach(() => {
              store.dispatch(reducer.nested.deep.set('arbitrarily', true))
            })

            test("THEN reducer.counter state non-mutatively updates to { arbitrarily: true }", () => {
              const state = store.getState()
              expect(state).toEqual({
                ...initialState,
                nested: {
                  ...initialState.nested,
                  deep: { arbitrarily: true }
                }
              })
              expect(initialState.nested.deep).toEqual({})
            })
          })

          describe("AND we dispatch reducer.nested.deep.set('arbitrarily.so', true)", () => {
            beforeEach(() => {
              store.dispatch(reducer.nested.deep.set('arbitrarily.so', true))
            })

            test("THEN reducer.counter state non-mutatively updates to { arbitrarily: { so: true } }", () => {
              const state = store.getState()
              expect(state).toEqual({
                ...initialState,
                nested: {
                  ...initialState.nested,
                  deep: { arbitrarily: { so: true } }
                }
              })
              expect(initialState.nested.deep).toEqual({})
            })
          })
        })
      })
    })
  })

  describe("leaf.toggle(): returns an action that, when dispatched, updates the leaf's state to !state", () => {

    describe("GIVEN initialState is an object", () => {
      const initialState = {
        true: true,
        false: false
      }

      describe("WHEN reducer = reducerTree(initialState)", () => {
        const reducer = reducerTree(initialState)

        test("THEN reducer.true.toggle is a function", () => {
          expect(typeof reducer.true.toggle).toBe("function")
        })

        test("AND reducer.false.toggle is a function", () => {
          expect(typeof reducer.false.toggle).toBe("function")
        })

        describe("AND store = createStore(reducer)", () => {
          let store
          beforeEach(() => {
            store = createStore(reducer)
          })

          test("THEN store is initialised with state = initialState", () => {
            expect(store.getState()).toEqual(initialState)
          })

          describe("AND we dispatch reducer.true.toggle()", () => {
            beforeEach(() => {
              store.dispatch(reducer.true.toggle())
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

          describe("AND we dispatch reducer.false.toggle()", () => {
            beforeEach(() => {
              store.dispatch(reducer.false.toggle())
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

  describe("leaf.update(value): returns an action that, when dispatched, updates the leaf's state to value", () => {

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

        test("THEN reducer.counter.update is a function", () => {
          expect(typeof reducer.counter.update).toBe("function")
        })

        test("AND reducer.foo.update is a function", () => {
          expect(typeof reducer.foo.update).toBe("function")
        })

        test("AND reducer.nested.deep.update is a function", () => {
          expect(typeof reducer.nested.deep.update).toBe("function")
        })

        test("AND reducer.nested.state.manageable.update is a function", () => {
          expect(typeof reducer.nested.state.manageable.update).toBe("function")
        })


        describe("AND store = createStore(reducer)", () => {
          let store
          beforeEach(() => {
            store = createStore(reducer)
          })

          test("THEN store is initialised with state = initialState", () => {
            expect(store.getState()).toEqual(initialState)
          })

          describe("AND we dispatch reducer.counter.update(9)", () => {
            beforeEach(() => {
              store.dispatch(reducer.counter.update(9))
            })

            test("THEN reducer.counter state updates non-mutatively to 9", () => {
              const state = store.getState()
              expect(state).toEqual({ ...initialState, counter: 9 })
              expect(initialState.counter).toBe(1)
            })
          })

          describe("AND we dispatch reducer.foo.update(['f', 'o', 'o'])", () => {
            beforeEach(() => {
              store.dispatch(reducer.foo.update(['f', 'o', 'o']))
            })

            test("THEN reducer.foo state updates non-mutatively to ['f', 'o', 'o']", () => {
              const state = store.getState()
              expect(state).toEqual({ ...initialState, foo: ['f', 'o', 'o'] })
              expect(initialState.foo).toEqual(['bar'])
            })
          })

          describe("AND we dispatch reducer.nested.deep.update({ here: true })", () => {
            beforeEach(() => {
              store.dispatch(reducer.nested.deep.update({ here: true }))
            })

            test("THEN reducer.nested.deep updates to { here: true }", () => {
              const state = store.getState()
              expect(state).toEqual({
                ...initialState,
                nested: {
                  ...initialState.nested,
                  deep: { here: true }
                }
              })
              expect(initialState.nested.deep).toEqual({})
            })
          })

          describe("AND we dispatch reducer.nested.state.manageable.update('thanks to redux-leaves!')", () => {
            beforeEach(() => {
              store.dispatch(reducer.nested.state.manageable.update('thanks to redux-leaves!'))
            })

            test("THEN reducer.nested.state.manageable updates to 'thanks to redux-leaves!'", () => {
              const state = store.getState()
              expect(state).toEqual({
                ...initialState,
                nested: {
                  ...initialState.nested,
                  state: {
                    ...initialState.nested.state,
                    manageable: 'thanks to redux-leaves!'
                  }
                }
              })
              expect(initialState.nested.state.manageable).toBe("maybe...?")
            })
          })

        })
      })
    })
  })
})
