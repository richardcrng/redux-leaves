import { createStore } from "redux";
import reduxLeaves from '../../src';

describe("leaf.create.update(value): returns an action that, when dispatched, updates the leaf's state to value", () => {

  describe("Documentation example 1", () => {
    describe("GIVEN setup of initialState and store as documented", () => {
      const initialState = {
        bool: false,
        num: 2,
        str: 'foo',
        arr: [1, 2, 3]
      }

      const [reducer, actions] = reduxLeaves(initialState)
      let store

      beforeEach(() => {
        store = createStore(reducer)
      })

      describe("WHEN we execute store.dispatch(actions.str.create.update('I can put anything here'))", () => {
        beforeEach(() => {
          store.dispatch(actions.str.create.update('I can put anything here'))
        })

        test("THEN the store's state.str is 'I can put anything here'", () => {
          expect(store.getState().str).toBe('I can put anything here')
        })

        describe("AND we execute store.dispatch(actions.create.update({ any: { properties: true } }))", () => {
          beforeEach(() => {
            store.dispatch(actions.create.update({ any: { properties: true } }))
          })

          test("THEN the store's state is { any: { properties: { true }} }", () => {
            expect(store.getState()).toEqual({
              any: { properties: true }
            })
          })
        })
      })

      describe("WHEN we create an action with actions.str.create('DID_AN_UPDATE').update('I can put anything here')", () => {
        const action = actions.str.create('DID_AN_UPDATE').update('I can put anything here')

        test("THEN the action's type is 'DID_AN_UPDATE'", () => {
          expect(action.type).toBe('DID_AN_UPDATE')
        })

        describe('WHEN we dispatch that action to the store', () => {
          beforeEach(() => {
            store.dispatch(actions.str.create('DID_AN_UPDATE').update('I can put anything here'))
          })

          test("THEN the store's state.str is 'I can put anything here'", () => {
            expect(store.getState().str).toBe('I can put anything here')
          })
        })
      })
    })


  })

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