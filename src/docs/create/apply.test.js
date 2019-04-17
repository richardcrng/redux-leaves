import _ from 'lodash';
import { createStore } from "redux";
import reduxLeaves from '../../..';

describe("leaf.create.apply(callback): returns an action that, when dispatched, updates the leaf's state to the return value of callback(state, entireState)", () => {

  describe("Documentation example 1", () => {
    describe("GIVEN setup of initialState and store as documented", () => {
      const initialState = {
        bool: false,
        num: 2,
        str: 'foo',
        arr: [1, 2, 3],
        obj: {}
      }

      const [reducer, actions] = reduxLeaves(initialState)
      let store

      beforeEach(() => {
        store = createStore(reducer)
      })

      describe("WHEN we execute store.dispatch(actions.str.create.apply(state => state.toUpperCase()))", () => {
        beforeEach(() => {
          store.dispatch(actions.str.create.apply(state => state.toUpperCase()))
        })

        test("THEN the store's state.str is 'FOO'", () => {
          expect(store.getState().str).toBe('FOO')
        })

        describe("AND we execute store.dispatch(actions.create.apply(state => ({ num: state.num, arr: state.arr })))", () => {
          beforeEach(() => {
            store.dispatch(actions.create.apply(state => ({ num: state.num, arr: state.arr })))
          })

          test("THEN the store's state is { num: 2, arr: [1, 2, 3] }", () => {
            expect(store.getState()).toEqual({
              num: 2,
              arr: [1, 2, 3]
            })
          })

          describe("AND we execute store.dispatch(actions.arr.create.apply((leafState, entireState) => (leafState.map(element => element * entireState.num))))))", () => {
            beforeEach(() => {
              store.dispatch(actions.arr.create.apply((leafState, entireState) => (
                leafState.map(element => element * entireState.num)
              )))
            })

            test("THEN the store's state is { num: 2, arr: [2, 4, 6] }", () => {
              expect(store.getState()).toEqual({
                num: 2,
                arr: [2, 4, 6]
              })
            })
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