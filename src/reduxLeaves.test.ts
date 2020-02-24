import reduxLeaves, { LeafReducer, LeafStandardAction } from './';
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

    type Definitions = {
      capitalise: string,
      exponentiate: LeafReducer.IDefinition<number, [number], number>
    }

    const reducersDict: LeafReducer.Definitions<Definitions, State> = {
      capitalise: (leafState, action) => leafState.concat(action.payload),
      exponentiate: {
        reducer: (leafState, action) => Math.pow(leafState, action.payload),
        argsToPayload: (index: number) => index
      }
    }

    describe("WHEN [reducer, actions] = reduxLeaves(initialState)", () => {
      const [reducer, actions] = reduxLeaves(initialState, reducersDict)

      test("THEN reducer is a function", () => {
        expect(typeof reducer).toBe("function")
      })

      test("AND actions.counter is an object with a number create API", () => {
        expect(typeof actions.counter).toBe("object")
        expect(actions.counter.create).toBeDefined()
        expect(typeof actions.counter.create.increment).toBe('function')
        expect(typeof actions.counter.create.capitalise).toBe('function')
      })

      test("AND actions.foo is an object with an array create API", () => {
        expect(typeof actions.foo).toBe("object")
        expect(actions.foo.create).toBeDefined()
        expect(typeof actions.foo.create.push).toBe('function')
      })

      test("AND actions.nested is an object with an object create API", () => {
        expect(typeof actions.nested).toBe("object")
        expect(actions.nested.create).toBeDefined()
        expect(typeof actions.nested.create.set).toBe('function')
      })

      test("AND actions.nested.deep is an object with an object create API", () => {
        expect(typeof actions.nested.deep).toBe("object")
        expect(actions.nested.deep.create).toBeDefined()
        expect(typeof actions.nested.deep.create.set).toBe('function')
      })


      test("AND actions.nested.state.manageable is an object with a string create API", () => {
        expect(typeof actions.nested.state).toBe("object")
        expect(actions.nested.state.manageable.create).toBeDefined()
        expect(typeof actions.nested.state.manageable.create.concat).toBe('function')
        expect(typeof actions.nested.state.manageable.create.capitalise).toBe('function')
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