import { reduxLeaves } from './reduxLeaves';
import { createStore, Store } from "redux";

describe("API: reduxLeaves(initialState)", () => {

  describe("GIVEN nested initialState with non-null values for shape { counter, foo, nested: { deep: {}, state: { manageable } } }", () => {
    interface State {
      counter: number
      foo: any[]
      nested: {
        deep: {}
        state: {
          manageable: string
        }
      }
    }

    const initialState: State = {
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

      test("AND actions.counter is an object with a create property", () => {
        expect(typeof actions.counter).toBe("object")
        expect(typeof actions.counter.create).toBe('function')
      })

      test("AND actions.foo is an object", () => {
        expect(typeof actions.foo).toBe("object")
      })

      test("AND actions.nested is an object with a create property", () => {
        expect(typeof actions.nested).toBe("object")
        expect(typeof actions.nested.create).toBe('function')
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
        let store: Store
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