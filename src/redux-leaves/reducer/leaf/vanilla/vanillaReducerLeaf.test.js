import { vanillaReducerLeaf } from ".";
import { createStore } from "redux";

describe("GIVEN a prefix of 'app/prefix'", () => {
  const prefix = "app/prefix/"
  
  describe("AND a defined route of ['some', 'route']", () => {
    const route = ["some", "route"]
    
    describe("AND an initial state of false", () => {
      const initialState = false

      describe("WHEN vanillaReducerLeaf is called with prefix, route and initialState", () => {
        const reducer = vanillaReducerLeaf({ prefix, route, initialState })
        const store = createStore(reducer)
        let prevState = store.getState()

        test("THEN it returns a function", () => {
          expect(typeof reducer).toBe("function")
        })

        test("AND it has initial state is as passed in", () => {
          expect(store.getState()).toBe(initialState)
        })

        describe("AND an action with type 'app/prefix/some/route/ON is dispatched", () => {
          beforeAll(() => {
            store.dispatch({ type: "app/prefix/some/route/ON" })
          })

          test("THEN the store has state of true", () => {
            expect(store.getState()).toBe(true)
          })

          describe("AND an action with type 'app/prefix/RESET' is dispatched", () => {
            beforeAll(() => {
              store.dispatch({ type: "app/prefix/RESET" })
            })

            test("THEN the store has state of false", () => {
              expect(store.getState()).toBe(false)
            })
          })

          describe("AND an action with type 'app/prefix/some/route/TOGGLE' is dispatched", () => {
            beforeAll(() => {
              let prevState = store.getState()
              store.dispatch({ type: "app/prefix/some/route/TOGGLE" })
            })

            test("THEN the store returns !prevState", () => {
              expect(store.getState()).toBe(!prevState)
            })
          })

          describe("AND an action with type 'app/CLEAR is dispatched", () => {
            beforeAll(() => {
              store.dispatch({ type: "app/CLEAR" })
            })

            test("THEN the store has state of null", () => {
              expect(store.getState()).toBeNull()
            })
          })
        })

      })

      describe("WHEN vanillaReducerLeaf is called with prefix and initialState but no route", () => {
        const reducer = vanillaReducerLeaf({ prefix, initialState })
        const store = createStore(reducer)
        let prevState = store.getState()

        test("THEN it returns a function", () => {
          expect(typeof reducer).toBe("function")
        })

        test("AND it has initial state is as passed in", () => {
          expect(store.getState()).toBe(initialState)
        })

        describe("AND an action with type 'app/prefix/some/route/ON is dispatched", () => {
          beforeAll(() => {
            store.dispatch({ type: "app/prefix/some/route/ON" })
          })

          test("THEN the store still has state of false", () => {
            expect(store.getState()).toBe(false)
          })
        })

        describe("AND an action with type 'app/prefix/ON is dispatched", () => {
          beforeAll(() => {
            store.dispatch({ type: "app/prefix/ON" })
          })

          test("THEN the store has state of true", () => {
            expect(store.getState()).toBe(true)
          })

          describe("AND an action with type 'app/CLEAR is dispatched", () => {
            beforeAll(() => {
              store.dispatch({ type: "app/CLEAR" })
            })

            test("THEN the store has state of null", () => {
              expect(store.getState()).toBeNull()
            })
          })
        })
      })
    })

    describe("AND an initial state of 0", () => {
      const initialState = 0

      describe("WHEN vanillaReducerLeaf is called with prefix, route and initialState", () => {
        const reducer = vanillaReducerLeaf({ prefix, route, initialState })
        const store = createStore(reducer)
        let prevState = store.getState()

        test("THEN it returns a function", () => {
          expect(typeof reducer).toBe("function")
        })

        test("AND it has initial state is as passed in", () => {
          expect(store.getState()).toBe(initialState)
        })

        describe("AND an action with type 'app/prefix/other/route/INCREMENT' is dispatched with payload -2", () => {
          beforeAll(() => {
            prevState = store.getState()
            store.dispatch({ type: "app/prefix/other/route/INCREMENT", payload: -2 })
          })

          test("THEN the store returns its previous state", () => {
            // Reducer should ignore it as it's the wrong type
            expect(store.getState()).toBe(prevState)
            expect(store.getState()).toBe(0)
          })
        })

        describe("AND an action with type 'app/prefix/some/route/INCREMENT' is dispatched with no payload", () => {
          beforeAll(() => {
            store.dispatch({ type: "app/prefix/some/route/INCREMENT" })
          })

          test("THEN the store has state of 1", () => {
            expect(store.getState()).toBe(1)
          })

          describe("AND an action with type 'app/prefix/some/route/INCREMENT' is dispatched with payload 2", () => {
            beforeAll(() => {
              store.dispatch({ type: "app/prefix/some/route/INCREMENT", payload: 2 })
            })

            test("THEN the store has state of 3", () => {
              expect(store.getState()).toBe(3)
            })
          })

          describe("AND an action with type 'app/RESET is dispatched", () => {
            beforeAll(() => {
              store.dispatch({ type: "app/RESET" })
            })

            test("THEN the store has state of 0", () => {
              expect(store.getState()).toBe(0)
            })
          })
        })

        describe("AND an action with type 'app/prefix/some/route/INCREMENT' is dispatched with payload -2", () => {
          beforeAll(() => {
            store.dispatch({ type: "app/prefix/some/route/INCREMENT", payload: -2 })
          })

          test("THEN the store has state of -2", () => {
            expect(store.getState()).toBe(-2)
          })

          describe("AND an action with type 'app/prefix/other/route/INCREMENT' is dispatched with payload -2", () => {
            beforeAll(() => {
              prevState = store.getState()
              store.dispatch({ type: "app/prefix/other/route/INCREMENT", payload: -2 })
            })

            test("THEN the store returns its previous state", () => {
              // Reducer should ignore it as it's the wrong type
              expect(store.getState()).toBe(prevState)
            })
          })
        })
      })
    })
  })

})