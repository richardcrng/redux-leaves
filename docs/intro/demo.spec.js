import reduxLeaves from "../../src";
import { createStore } from "redux";

describe("Redux-Leaves. Write once. Reduce anywhere.", () => {
  describe("GIVEN initialState, reducers, reducersDict, actions and initialised redux store", () => {
    const initialState = {
      counter: 1,
      list: ['first'],
      nested: { arbitrarily: { deep: 0 } }
    }

    const reducersDict = {
      double: leafState => leafState * 2,
      splice: {
        argsToPayload: (first, second) => [first, second],
        mutate: true,
        reducer: (leafState, { payload }) => { leafState.splice(...payload) }
      },
      appendToEach: (leafState, action) => leafState.map(str => str.concat(action.payload)),
      countKeys: (leafState, action, wholeState) => Object.keys(wholeState).length
    }

    const [reducer, actions] = reduxLeaves(initialState, reducersDict)

    let store

    beforeEach(() => store = createStore(reducer))

    test("THEN actions has defined action creators for double, appendToEach and countKeys", () => {
      [actions.counter, actions.list, actions.nested, actions.nested.arbitrarily, actions.nested.arbitrarily.deep].forEach(
        leaf => {
          expect(typeof leaf.create.double).toBe("function")
          expect(typeof leaf.create.appendToEach).toBe("function")
          expect(typeof leaf.create.countKeys).toBe("function")
        }
      )
    })

    describe("WHEN we dispatch actions.counter.create.increment() to the store", () => {
      beforeEach(() => {
        store.dispatch(actions.counter.create.increment())
      })

      test("THEN the store's state.counter increments non-mutatively", () => {
        expect(store.getState()).toEqual({
          counter: 2,
          list: ['first'],
          nested: { arbitrarily: { deep: 0 } }
        })
        expect(initialState.counter).toBe(1)
      })

      describe("AND we dispatch actions.counter.create.double() to the store", () => {
        beforeEach(() => {
          store.dispatch(actions.counter.create.double())
        })
        
        test("THEN the store's state.counter doubles non-mutatively", () => {
          expect(store.getState()).toEqual({
            counter: 4,
            list: ['first'],
            nested: { arbitrarily: { deep: 0 } }
          })
          expect(initialState.counter).toBe(1)
        })

        describe("AND we dispatch actions.list.create.push('second') to the store", () => {
          beforeEach(() => {
            store.dispatch(actions.list.create.push('second'))
          })

          test("THEN the store's state.list updates non-mutatively", () => {
            expect(store.getState()).toEqual({
              counter: 4,
              list: ['first', 'second'],
              nested: { arbitrarily: { deep: 0 } }
            })
            expect(initialState.list).toEqual(['first'])
          })

          describe("AND we dispatch actions.list.create.appendToEach(' item') to the store", () => {
            beforeEach(() => {
              store.dispatch(actions.list.create.appendToEach(' item'))
            })

            test("THEN the store's state.list updates non-mutatively", () => {
              expect(store.getState()).toEqual({
                counter: 4,
                list: ['first item', 'second item'],
                nested: { arbitrarily: { deep: 0 } }
              })
              expect(initialState.list).toEqual(['first'])
            })

            describe("AND we dispatch actions.create.assign({ newKey: true })", () => {
              beforeEach(() => {
                store.dispatch(actions.create.assign({ newKey: true }))
              })

              test("THEN the store's state.newKey updates non-mutatively", () => {
                expect(store.getState()).toEqual({
                  counter: 4,
                  list: ['first item', 'second item'],
                  nested: { arbitrarily: { deep: 0 } },
                  newKey: true
                })
                expect(initialState.newKey).not.toBeDefined()
              })

              describe("AND we dispatch actions.nested.arbitrarily.deep.create.countKeys()", () => {
                beforeEach(() => {
                  store.dispatch(actions.nested.arbitrarily.deep.create.countKeys())
                })

                test("THEN the store's state.nested.arbitrarily.deep updates non-mutatively", () => {
                  expect(store.getState()).toEqual({
                    counter: 4,
                    list: ['first item', 'second item'],
                    nested: { arbitrarily: { deep: 4 } },
                    newKey: true
                  })
                  expect(initialState.nested.arbitrarily.deep).toBe(0)
                })

                describe("AND we dispatch actions.list.create.splice(0, 1)", () => {
                  beforeEach(() => {
                    store.dispatch(actions.list.create.splice(0, 1))
                  })

                  test("THEN the store's state.list updates non-mutatively", () => {
                    expect(store.getState()).toEqual({
                      counter: 4,
                      list: ['second item'],
                      nested: { arbitrarily: { deep: 4 } },
                      newKey: true
                    })
                    expect(initialState.list).toEqual(['first'])
                  })
                })
              })
            })
          })
        })
      })
    })
  })
})