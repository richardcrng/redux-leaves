import _ from 'lodash';
import { reduxLeaves } from './reduxLeaves';
import { createStore } from "redux";

describe("API: reduxLeaves(initialState)", () => {

  describe("GIVEN nested initialState with non-null values for shape { counter, foo, nested: { deep: {}, state: { manageable } } }", () => {
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

    describe("WHEN [reducer, actions] = reduxLeaves(initialState)", () => {
      const [reducer, actions] = reduxLeaves(initialState)

      test("THEN reducer is a function", () => {
        expect(typeof reducer).toBe("function")
      })

      test("AND actions.counter is an object", () => {
        expect(typeof actions.counter).toBe("object")
      })

      test("AND actions.foo is an object", () => {
        expect(typeof actions.foo).toBe("object")
      })

      test("AND actions.nested is an object", () => {
        expect(typeof actions.nested).toBe("object")
      })

      test("AND actions.nested.deep is an object", () => {
        expect(typeof actions.nested.deep).toBe("object")
      })

      test("AND actions.nested.state is an object", () => {
        expect(typeof actions.nested.state).toBe("object")
      })

      test("AND actions.nested.state.manageable is an object", () => {
        expect(typeof actions.nested.state.manageable).toBe("object")
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

  describe("leaf.create.apply(callback): returns an action that, when dispatched, updates the leaf's state to the return value of callback(state)", () => {

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

      describe("WHEN [reducer, actions] = reduxLeaves(initialState)", () => {
        const [reducer, actions] = reduxLeaves(initialState)

        test("THEN actions.counter.create.apply is a function", () => {
          expect(typeof actions.counter.create.apply).toBe("function")
        })

        test("AND actions.foo.create.apply is a function", () => {
          expect(typeof actions.foo.create.apply).toBe("function")
        })

        test("AND actions.nested.deep.create.apply is a function", () => {
          expect(typeof actions.nested.deep.create.apply).toBe("function")
        })

        test("AND actions.nested.state.manageable.create.apply is a function", () => {
          expect(typeof actions.nested.state.manageable.create.apply).toBe("function")
        })


        describe("AND store = createStore(reducer)", () => {
          let store
          beforeEach(() => {
            store = createStore(reducer)
          })

          test("THEN store is initialised with state = initialState", () => {
            expect(store.getState()).toEqual(initialState)
          })

          describe("AND we dispatch actions.counter.create.apply(n => n * 7)", () => {
            beforeEach(() => {
              store.dispatch(actions.counter.create.apply(n => n * 7))
            })

            test("THEN actions.counter updates to 7", () => {
              const state = store.getState()
              expect(state.counter).toBe(7)
              expect(state).toEqual({ ...initialState, counter: 7 })
            })
          })

          describe("AND we dispatch actions.foo.create.apply(arr => ['foo', ...arr])", () => {
            beforeEach(() => {
              store.dispatch(actions.foo.create.apply(arr => ['foo', ...arr]))
            })

            test("THEN actions.foo updates to ['foo', 'bar']", () => {
              const state = store.getState()
              expect(state.foo).toEqual(['foo', 'bar'])
              expect(state).toEqual({ ...initialState, foo: ['foo', 'bar'] })
            })
          })

          describe("AND we dispatch actions.nested.deep.create.apply(obj => ({ ...obj, arbitrarily: true }))", () => {
            beforeEach(() => {
              store.dispatch(actions.nested.deep.create.apply(obj => ({ ...obj, arbitrarily: true })))
            })

            test("THEN actions.nested.deep updates to { arbitrarily: true }", () => {
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

          describe("AND we dispatch actions.nested.state.manageable.create.apply(str => str.concat(' DEFINITELY!'))", () => {
            beforeEach(() => {
              store.dispatch(actions.nested.state.manageable.create.apply(str => str.concat(' DEFINITELY!')))
            })

            test("THEN actions.nested.state.manageable updates to 'maybe...? DEFINITELY!'", () => {
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

  describe("leaf.create.clear(toNull = false): returns an action that, when dispatched, clear's the leaf's state", () => {

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

      describe("WHEN [reducer, actions] = reduxLeaves(initialState)", () => {
        const [reducer, actions] = reduxLeaves(initialState)

        test("THEN actions.counter.create.clear is a function", () => {
          expect(typeof actions.counter.create.clear).toBe("function")
        })

        test("AND actions.foo.create.clear is a function", () => {
          expect(typeof actions.foo.create.clear).toBe("function")
        })

        test("AND actions.nested.deep.create.clear is a function", () => {
          expect(typeof actions.nested.deep.create.clear).toBe("function")
        })

        test("AND actions.nested.state.manageable.create.clear is a function", () => {
          expect(typeof actions.nested.state.manageable.create.clear).toBe("function")
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

          describe("AND we dispatch actions.counter.create.clear()", () => {
            beforeEach(() => {
              store.dispatch(actions.counter.create.clear())
            })

            test("THEN actions.counter updates to 0", () => {
              const state = store.getState()
              expect(state.counter).toBe(0)
              expect(state).toEqual({ ...otherState, counter: 0 })
            })
          })

          describe("AND we dispatch actions.counter.create.clear(true)", () => {
            beforeEach(() => {
              store.dispatch(actions.counter.create.clear(true))
            })

            test("THEN actions.counter updates to null", () => {
              const state = store.getState()
              expect(state.counter).toBeNull()
              expect(state).toEqual({ ...otherState, counter: null })
            })
          })

          describe("AND we dispatch actions.foo.create.clear()", () => {
            beforeEach(() => {
              store.dispatch(actions.foo.create.clear())
            })

            test("THEN actions.foo updates to []", () => {
              const state = store.getState()
              expect(state.foo).toEqual([])
              expect(state).toEqual({ ...otherState, foo: [] })
            })
          })

          describe("AND we dispatch actions.foo.create.clear(true)", () => {
            beforeEach(() => {
              store.dispatch(actions.foo.create.clear(true))
            })

            test("THEN actions.foo updates to null", () => {
              const state = store.getState()
              expect(state.foo).toBeNull()
              expect(state).toEqual({ ...otherState, foo: null })
            })
          })

          describe("AND we dispatch actions.nested.deep.create.clear()", () => {
            beforeEach(() => {
              store.dispatch(actions.nested.deep.create.clear())
            })

            test("THEN actions.nested.deep updates to {}", () => {
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

          describe("AND we dispatch actions.nested.deep.create.clear(true)", () => {
            beforeEach(() => {
              store.dispatch(actions.nested.deep.create.clear(true))
            })

            test("THEN actions.nested.deep updates to null", () => {
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

          describe("AND we dispatch actions.nested.state.manageable.create.clear()", () => {
            beforeEach(() => {
              store.dispatch(actions.nested.state.manageable.create.clear())
            })

            test("THEN actions.nested.state.manageable updates to ''", () => {
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

          describe("AND we dispatch actions.nested.state.manageable.create.clear(true)", () => {
            beforeEach(() => {
              store.dispatch(actions.nested.state.manageable.create.clear(true))
            })

            test("THEN actions.nested.state.manageable updates to null", () => {
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

  describe("leaf.create.concat(array): returns an action that, when dispatched, updates the leaf's state by non-mutatively concatenating it with array", () => {

    describe("GIVEN initialState is an object", () => {
      const initialState = {
        empty: [],
        integers: [1, 2, 3]
      }

      describe("WHEN [reducer, actions] = reduxLeaves(initialState)", () => {
        const [reducer, actions] = reduxLeaves(initialState)

        test("THEN actions.empty.create.concat is a function", () => {
          expect(typeof actions.empty.create.concat).toBe("function")
        })

        test("AND actions.integers.create.concat is a function", () => {
          expect(typeof actions.integers.create.concat).toBe("function")
        })

        describe("AND store = createStore(reducer)", () => {
          let store
          beforeEach(() => {
            store = createStore(reducer)
          })

          test("THEN store is initialised with state = initialState", () => {
            expect(store.getState()).toEqual(initialState)
          })

          describe("AND we dispatch actions.empty.create.concat([1, 2, 3])", () => {
            beforeEach(() => {
              store.dispatch(actions.empty.create.concat([1, 2, 3]))
            })

            test("THEN actions.empty state updates non-mutatively to [1, 2, 3]", () => {
              const state = store.getState()
              expect(state).toEqual({
                ...initialState,
                empty: [1, 2, 3]
              })
              expect(initialState.empty).toEqual([])
            })
          })

          describe("AND we dispatch actions.integers.create.concat([4, 5, 6])", () => {
            beforeEach(() => {
              store.dispatch(actions.integers.create.concat([4, 5, 6]))
            })

            test("THEN actions.integers state updates non-mutatively to [1, 2, 3,4, 5, 6]", () => {
              const state = store.getState()
              expect(state).toEqual({
                ...initialState,
                integers: [1, 2, 3, 4, 5, 6]
              })
              expect(initialState.integers).toEqual([1, 2, 3])
            })
          })
        })
      })
    })
  })

  describe("leaf.create.drop(n = 1): returns an action that, when dispatched, updates the leaf's state by non-mutatively dropping the first n values", () => {

    describe("GIVEN initialState is an object", () => {
      const initialState = {
        empty: [],
        integers: [1, 2, 3]
      }

      describe("WHEN [reducer, actions] = reduxLeaves(initialState)", () => {
        const [reducer, actions] = reduxLeaves(initialState)

        test("THEN actions.empty.create.drop is a function", () => {
          expect(typeof actions.empty.create.drop).toBe("function")
        })

        test("AND actions.integers.create.drop is a function", () => {
          expect(typeof actions.integers.create.drop).toBe("function")
        })

        describe("AND store = createStore(reducer)", () => {
          let store
          beforeEach(() => {
            store = createStore(reducer)
          })

          test("THEN store is initialised with state = initialState", () => {
            expect(store.getState()).toEqual(initialState)
          })

          describe("AND we dispatch actions.integers.create.drop()", () => {
            beforeEach(() => {
              store.dispatch(actions.integers.create.drop())
            })

            test("THEN actions.integers state updates non-mutatively to [2, 3]", () => {
              const state = store.getState()
              expect(state).toEqual({
                ...initialState,
                integers: [2, 3]
              })
              expect(initialState.integers).toEqual([1, 2, 3])
            })
          })

          describe("AND we dispatch actions.integers.create.drop(2)", () => {
            beforeEach(() => {
              store.dispatch(actions.integers.create.drop(2))
            })

            test("THEN actions.integers state updates non-mutatively to [3]", () => {
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

  describe("leaf.create.increment(n = 1): returns an action that, when dispatched, updates the leaf's state by non-mutatively incrementing it by n", () => {

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

      describe("WHEN [reducer, actions] = reduxLeaves(initialState)", () => {
        const [reducer, actions] = reduxLeaves(initialState)

        test("THEN actions.counter.create.increment is a function", () => {
          expect(typeof actions.counter.create.increment).toBe("function")
        })

        describe("AND store = createStore(reducer)", () => {
          let store
          beforeEach(() => {
            store = createStore(reducer)
          })

          test("THEN store is initialised with state = initialState", () => {
            expect(store.getState()).toEqual(initialState)
          })

          describe("AND we dispatch actions.counter.create.increment()", () => {
            beforeEach(() => {
              store.dispatch(actions.counter.create.increment())
            })

            test("THEN actions.counter state non-mutatively updates to 2", () => {
              const state = store.getState()
              expect(state).toEqual({ ...initialState, counter: 2 })
              expect(initialState.counter).toBe(1)
            })
          })

          describe("AND we dispatch actions.counter.create.increment(4)", () => {
            beforeEach(() => {
              store.dispatch(actions.counter.create.increment(4))
            })

            test("THEN actions.counter state non-mutatively updates to 5", () => {
              const state = store.getState()
              expect(state).toEqual({ ...initialState, counter: 5 })
              expect(initialState.counter).toBe(1)
            })
          })

          describe("AND we dispatch actions.counter.create.increment(-1.5)", () => {
            beforeEach(() => {
              store.dispatch(actions.counter.create.increment(-1.5))
            })

            test("THEN actions.counter state non-mutatively updates to -0.5", () => {
              const state = store.getState()
              expect(state).toEqual({ ...initialState, counter: -0.5 })
              expect(initialState.counter).toBe(1)
            })
          })
        })
      })
    })
  })

  describe("leaf.create.off(): returns an action that, when dispatched, updates the leaf's state to false", () => {

    describe("GIVEN initialState is an object", () => {
      const initialState = {
        true: true,
        false: false
      }

      describe("WHEN [reducer, actions] = reduxLeaves(initialState)", () => {
        const [reducer, actions] = reduxLeaves(initialState)

        test("THEN actions.true.create.off is a function", () => {
          expect(typeof actions.true.create.off).toBe("function")
        })

        test("AND actions.false.create.off is a function", () => {
          expect(typeof actions.false.create.off).toBe("function")
        })

        describe("AND store = createStore(reducer)", () => {
          let store
          beforeEach(() => {
            store = createStore(reducer)
          })

          test("THEN store is initialised with state = initialState", () => {
            expect(store.getState()).toEqual(initialState)
          })

          describe("AND we dispatch actions.true.create.off()", () => {
            beforeEach(() => {
              store.dispatch(actions.true.create.off())
            })

            test("THEN actions.true state updates non-mutatively to false", () => {
              const state = store.getState()
              expect(state).toEqual({
                ...initialState,
                true: false
              })
              expect(initialState.true).toBe(true)
            })
          })

          describe("AND we dispatch actions.false.create.off()", () => {
            beforeEach(() => {
              store.dispatch(actions.false.create.off())
            })

            test("THEN actions.false state remains false", () => {
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

  describe("leaf.create.on(): returns an action that, when dispatched, updates the leaf's state to true", () => {

    describe("GIVEN initialState is an object", () => {
      const initialState = {
        true: true,
        false: false
      }

      describe("WHEN [reducer, actions] = reduxLeaves(initialState)", () => {
        const [reducer, actions] = reduxLeaves(initialState)

        test("THEN actions.true.create.on is a function", () => {
          expect(typeof actions.true.create.on).toBe("function")
        })

        test("AND actions.false.create.on is a function", () => {
          expect(typeof actions.false.create.on).toBe("function")
        })

        describe("AND store = createStore(reducer)", () => {
          let store
          beforeEach(() => {
            store = createStore(reducer)
          })

          test("THEN store is initialised with state = initialState", () => {
            expect(store.getState()).toEqual(initialState)
          })

          describe("AND we dispatch actions.true.create.on()", () => {
            beforeEach(() => {
              store.dispatch(actions.true.create.on())
            })

            test("THEN actions.true state remains true", () => {
              const state = store.getState()
              expect(state).toEqual({
                ...initialState,
                true: true
              })
              expect(initialState.true).toBe(true)
            })
          })

          describe("AND we dispatch actions.false.create.on()", () => {
            beforeEach(() => {
              store.dispatch(actions.false.create.on())
            })

            test("THEN actions.false state updates non-mutatively to true", () => {
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

  describe("leaf.create.push(element, [index = -1], [replace = false]): returns an action that, when dispatched, updates the leaf's state by non-mutatively pushing element into leaf's state at index. If replace === true, then element replaces the existing element with that index.", () => {

    describe("GIVEN initialState is an object", () => {
      const initialState = {
        foo: [1, 2, 3],
        bar: [1, 2, 3],
        foobar: [1, 2, 3]
      }

      describe("WHEN [reducer, actions] = reduxLeaves(initialState)", () => {
        const [reducer, actions] = reduxLeaves(initialState)

        test("THEN actions.foo.create.push is a function", () => {
          expect(typeof actions.foo.create.push).toBe("function")
        })

        test("AND actions.bar.create.push is a function", () => {
          expect(typeof actions.bar.create.push).toBe("function")
        })

        test("AND actions.foobar.create.push is a function", () => {
          expect(typeof actions.foobar.create.push).toBe("function")
        })

        describe("AND store = createStore(reducer)", () => {
          let store
          beforeEach(() => {
            store = createStore(reducer)
          })

          test("THEN store is initialised with state = initialState", () => {
            expect(store.getState()).toEqual(initialState)
          })

          describe("AND we dispatch actions.foo.create.push(4)", () => {
            beforeEach(() => {
              store.dispatch(actions.foo.create.push(4))
            })

            test("THEN actions.foo state updates non-mutatively to [1, 2, 3, 4]", () => {
              const state = store.getState()
              expect(state).toEqual({
                ...initialState,
                foo: [1, 2, 3, 4]
              })
              expect(initialState.foo).toEqual([1, 2, 3])
            })
          })

          describe("AND we dispatch actions.foo.create.push([4, 5])", () => {
            beforeEach(() => {
              store.dispatch(actions.foo.create.push([4, 5]))
            })

            test("THEN actions.foo state updates non-mutatively to [1, 2, 3, [4, 5]]", () => {
              const state = store.getState()
              expect(state).toEqual({
                ...initialState,
                foo: [1, 2, 3, [4, 5]]
              })
              expect(initialState.foo).toEqual([1, 2, 3])
            })
          })

          describe("AND we dispatch actions.bar.create.push(4, 0)", () => {
            beforeEach(() => {
              store.dispatch(actions.bar.create.push(4, 0))
            })

            test("THEN actions.bar state updates non-mutatively to [4, 1, 2, 3]", () => {
              const state = store.getState()
              expect(state).toEqual({
                ...initialState,
                bar: [4, 1, 2, 3]
              })
              expect(initialState.bar).toEqual([1, 2, 3])
            })
          })

          describe("AND we dispatch actions.foobar.create.push(4, 0, true)", () => {
            beforeEach(() => {
              store.dispatch(actions.foobar.create.push(4, 0, true))
            })

            test("THEN actions.foobar state updates non-mutatively to [4, 2, 3]", () => {
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

  describe("leaf.create.reset(): returns an action that, when dispatched, updates the leaf's state to the reducer's initialised state", () => {

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

      describe("WHEN [reducer, actions] = reduxLeaves(initialState)", () => {
        const [reducer, actions] = reduxLeaves(initialState)

        test("THEN actions.counter.create.reset is a function", () => {
          expect(typeof actions.counter.create.reset).toBe("function")
        })

        test("AND actions.foo.create.reset is a function", () => {
          expect(typeof actions.foo.create.reset).toBe("function")
        })

        test("AND actions.nested.deep.create.reset is a function", () => {
          expect(typeof actions.nested.deep.create.reset).toBe("function")
        })

        test("AND actions.nested.state.manageable.create.reset is a function", () => {
          expect(typeof actions.nested.state.manageable.create.reset).toBe("function")
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

          describe("AND we dispatch actions.counter.create.reset()", () => {
            beforeEach(() => {
              store.dispatch(actions.counter.create.reset())
            })

            test("THEN actions.counter resets to 1", () => {
              const state = store.getState()
              expect(state.counter).toBe(1)
              expect(state).toEqual({ ...otherState, counter: 1 })
            })
          })

          describe("AND we dispatch actions.foo.create.reset()", () => {
            beforeEach(() => {
              store.dispatch(actions.foo.create.reset())
            })

            test("THEN actions.foo resets to ['bar']", () => {
              const state = store.getState()
              expect(state.foo).toEqual(['bar'])
              expect(state).toEqual({ ...otherState, foo: ['bar'] })
            })
          })

          describe("AND we dispatch actions.nested.deep.create.reset()", () => {
            beforeEach(() => {
              store.dispatch(actions.nested.deep.create.reset())
            })

            test("THEN actions.nested.deep resets to {}", () => {
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

          describe("AND we dispatch actions.nested.state.manageable.create.reset()", () => {
            beforeEach(() => {
              store.dispatch(actions.nested.state.manageable.create.reset())
            })

            test("THEN actions.nested.state.manageable resets to 'maybe...?'", () => {
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

  describe("leaf.create.set(path, value): returns an action that, when dispatched, updates the leaf's state by non-mutatively setting value at state object's path", () => {

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

      describe("WHEN [reducer, actions] = reduxLeaves(initialState)", () => {
        const [reducer, actions] = reduxLeaves(initialState)

        test("THEN actions.nested.deep.create.set is a function", () => {
          expect(typeof actions.nested.deep.create.set).toBe("function")
        })

        describe("AND store = createStore(reducer)", () => {
          let store
          beforeEach(() => {
            store = createStore(reducer)
          })

          test("THEN store is initialised with state = initialState", () => {
            expect(store.getState()).toEqual(initialState)
          })

          describe("AND we dispatch actions.nested.deep.create.set('arbitrarily', true)", () => {
            beforeEach(() => {
              store.dispatch(actions.nested.deep.create.set('arbitrarily', true))
            })

            test("THEN actions.counter state non-mutatively updates to { arbitrarily: true }", () => {
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

          describe("AND we dispatch actions.nested.deep.create.set('arbitrarily.so', true)", () => {
            beforeEach(() => {
              store.dispatch(actions.nested.deep.create.set('arbitrarily.so', true))
            })

            test("THEN actions.counter state non-mutatively updates to { arbitrarily: { so: true } }", () => {
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

  describe("leaf.create.toggle(): returns an action that, when dispatched, updates the leaf's state to !state", () => {

    describe("GIVEN initialState is an object", () => {
      const initialState = {
        true: true,
        false: false
      }

      describe("WHEN [reducer, actions] = reduxLeaves(initialState)", () => {
        const [reducer, actions] = reduxLeaves(initialState)

        test("THEN actions.true.create.toggle is a function", () => {
          expect(typeof actions.true.create.toggle).toBe("function")
        })

        test("AND actions.false.create.toggle is a function", () => {
          expect(typeof actions.false.create.toggle).toBe("function")
        })

        describe("AND store = createStore(reducer)", () => {
          let store
          beforeEach(() => {
            store = createStore(reducer)
          })

          test("THEN store is initialised with state = initialState", () => {
            expect(store.getState()).toEqual(initialState)
          })

          describe("AND we dispatch actions.true.create.toggle()", () => {
            beforeEach(() => {
              store.dispatch(actions.true.create.toggle())
            })

            test("THEN actions.true state updates non-mutatively to false", () => {
              const state = store.getState()
              expect(state).toEqual({
                ...initialState,
                true: false
              })
              expect(initialState.true).toBe(true)
            })
          })

          describe("AND we dispatch actions.false.create.toggle()", () => {
            beforeEach(() => {
              store.dispatch(actions.false.create.toggle())
            })

            test("THEN actions.false state updates non-mutatively to true", () => {
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

  describe("leaf.create.update(value): returns an action that, when dispatched, updates the leaf's state to value", () => {

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

      describe("WHEN [reducer, actions] = reduxLeaves(initialState)", () => {
        const [reducer, actions] = reduxLeaves(initialState)

        test("THEN actions.counter.create.update is a function", () => {
          expect(typeof actions.counter.create.update).toBe("function")
        })

        test("AND actions.foo.create.update is a function", () => {
          expect(typeof actions.foo.create.update).toBe("function")
        })

        test("AND actions.nested.deep.create.update is a function", () => {
          expect(typeof actions.nested.deep.create.update).toBe("function")
        })

        test("AND actions.nested.state.manageable.create.update is a function", () => {
          expect(typeof actions.nested.state.manageable.create.update).toBe("function")
        })


        describe("AND store = createStore(reducer)", () => {
          let store
          beforeEach(() => {
            store = createStore(reducer)
          })

          test("THEN store is initialised with state = initialState", () => {
            expect(store.getState()).toEqual(initialState)
          })

          describe("AND we dispatch actions.counter.create.update(9)", () => {
            beforeEach(() => {
              store.dispatch(actions.counter.create.update(9))
            })

            test("THEN actions.counter state updates non-mutatively to 9", () => {
              const state = store.getState()
              expect(state).toEqual({ ...initialState, counter: 9 })
              expect(initialState.counter).toBe(1)
            })
          })

          describe("AND we dispatch actions.foo.create.update(['f', 'o', 'o'])", () => {
            beforeEach(() => {
              store.dispatch(actions.foo.create.update(['f', 'o', 'o']))
            })

            test("THEN actions.foo state updates non-mutatively to ['f', 'o', 'o']", () => {
              const state = store.getState()
              expect(state).toEqual({ ...initialState, foo: ['f', 'o', 'o'] })
              expect(initialState.foo).toEqual(['bar'])
            })
          })

          describe("AND we dispatch actions.nested.deep.create.update({ here: true })", () => {
            beforeEach(() => {
              store.dispatch(actions.nested.deep.create.update({ here: true }))
            })

            test("THEN actions.nested.deep updates to { here: true }", () => {
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

          describe("AND we dispatch actions.nested.state.manageabl.createe.update('thanks to redux-leaves!')", () => {
            beforeEach(() => {
              store.dispatch(actions.nested.state.manageable.create.update('thanks to redux-leaves!'))
            })

            test("THEN actions.nested.state.manageable updates to 'thanks to redux-leaves!'", () => {
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
