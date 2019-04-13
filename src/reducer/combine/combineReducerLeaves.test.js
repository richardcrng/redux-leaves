import { combineReducerLeaves } from './combineReducerLeaves';
import { createStore } from 'redux';

import * as utils from '../test.utils'

describe("**Feature**: it can combine a dictionary of simple reducers", () => {

  describe("GIVEN a dictionary of simple reducers", () => {
    const dict = {
      bool: utils.reducers.bool,
      counter: utils.reducers.counter,
      foo: utils.reducers.foo,
      type: utils.reducers.type,
      payload: utils.reducers.payload
    }

    describe("WHEN it is called with that dictionary", () => {
      const combinedReducers = combineReducerLeaves(dict)

      test("THEN it returns a function", () => {
        expect(typeof combinedReducers).toBe("function")
      })

      describe("AND the result is passed to redux's createStore", () => {
        let store
        beforeEach(() => {
          store = createStore(combinedReducers)
        })

        test("THEN the initialised store has expected initial state", () => {
          expect(store.getState()).toEqual({
            bool: utils.initialState.bool,
            counter: utils.initialState.counter,
            foo: utils.initialState.foo,
            type: utils.initialState.type,
            payload: utils.initialState.payload
          })
        })

        describe("AND an action to update only bool, type and payload slices of state is dispatched", () => {
          beforeEach(() => {
            store.dispatch({ type: utils.ACTION_TYPE_TRUE, payload: "update only bool, type and payload" })
          })

          test("THEN only bool, type and payload are updated in the store's state", () => {
            expect(store.getState()).toEqual({
              bool: true,
              counter: utils.initialState.counter,
              foo: utils.initialState.foo,
              type: utils.ACTION_TYPE_TRUE,
              payload: "update only bool, type and payload"
            })
          })
        })

        describe("AND an action to update only counter, type and payload slices of state is dispatched", () => {
          beforeEach(() => {
            store.dispatch({ type: utils.ACTION_TYPE_INCREMENT, payload: "update only counter, type and payload" })
          })

          test("THEN only counter, type and payload are updated in the store's state", () => {
            expect(store.getState()).toEqual({
              bool: utils.initialState.bool,
              counter: 1,
              foo: utils.initialState.foo,
              type: utils.ACTION_TYPE_INCREMENT,
              payload: "update only counter, type and payload"
            })
          })
        })

        describe("AND an action to update only foo, type and payload slices of state is dispatched", () => {
          beforeEach(() => {
            store.dispatch({ type: utils.ACTION_TYPE_FOO, payload: "update only foo, type and payload" })
          })

          test("THEN only foo, type and payload are updated in the store's state", () => {
            expect(store.getState()).toEqual({
              bool: utils.initialState.bool,
              counter: utils.initialState.counter,
              foo: "update only foo, type and payload",
              type: utils.ACTION_TYPE_FOO,
              payload: "update only foo, type and payload"
            })
          })
        })
      })
    })
  })
})

describe("**Feature**: it can combine a dictionary of nested reducers", () => {

  describe("GIVEN a dictionary of nested reducers of structure { bool, counter, foo: { value, action: { type, payload } } }", () => {
    const dict = {
      bool: utils.reducers.bool,
      counter: utils.reducers.counter,
      foo: {
        value: utils.reducers.foo,
        action: {
          type: utils.reducers.type,
          payload: utils.reducers.payload
        }
      }
    }

    describe("WHEN it is called with that dictionary", () => {
      const combinedReducers = combineReducerLeaves(dict)

      test("THEN it returns a function", () => {
        expect(typeof combinedReducers).toBe("function")
      })

      describe("AND the result is passed to redux's createStore", () => {
        let store
        beforeEach(() => {
          store = createStore(combinedReducers)
        })

        test("THEN the initialised store has expected initial state", () => {
          expect(store.getState()).toEqual({
            bool: utils.initialState.bool,
            counter: utils.initialState.counter,
            foo: {
              value: utils.initialState.foo,
              action: {
                type: utils.initialState.type,
                payload: utils.initialState.payload
              }
            }
          })
        })

        describe("AND an action to update only bool, type and payload slices of state is dispatched", () => {
          beforeEach(() => {
            store.dispatch({ type: utils.ACTION_TYPE_TRUE, payload: "update only bool, type and payload" })
          })

          test("THEN only bool, type and payload are updated in the store's state", () => {
            expect(store.getState()).toEqual({
              bool: true,
              counter: utils.initialState.counter,
              foo: {
                value: utils.initialState.foo,
                action: {
                  type: utils.ACTION_TYPE_TRUE,
                  payload: "update only bool, type and payload"
                }
              }
            })
          })
        })

        describe("AND an action to update only counter, type and payload slices of state is dispatched", () => {
          beforeEach(() => {
            store.dispatch({ type: utils.ACTION_TYPE_INCREMENT, payload: "update only counter, type and payload" })
          })

          test("THEN only counter, type and payload are updated in the store's state", () => {
            expect(store.getState()).toEqual({
              bool: utils.initialState.bool,
              counter: 1,
              foo: {
                value: utils.initialState.foo,
                action: {
                  type: utils.ACTION_TYPE_INCREMENT,
                  payload: "update only counter, type and payload"
                }
              }
            })
          })
        })

        describe("AND an action to update only foo, type and payload slices of state is dispatched", () => {
          beforeEach(() => {
            store.dispatch({ type: utils.ACTION_TYPE_FOO, payload: "update only foo, type and payload" })
          })

          test("THEN only foo, type and payload are updated in the store's state", () => {
            expect(store.getState()).toEqual({
              bool: utils.initialState.bool,
              counter: utils.initialState.counter,
              foo: {
                value: "update only foo, type and payload",
                action: {
                  type: utils.ACTION_TYPE_FOO,
                  payload: "update only foo, type and payload"
                }
              }
            })
          })
        })
      })
    })
  })
})

describe("**Feature**: child reducers can be accessed through the 'children' property", () => {

  describe("GIVEN a dictionary of nested reducers of structure: { bool, counter, foo: { value, action: { type, payload } } }", () => {
    const dict = {
      bool: utils.reducers.bool,
      counter: utils.reducers.counter,
      foo: {
        value: utils.reducers.foo,
        action: {
          type: utils.reducers.type,
          payload: utils.reducers.payload
        }
      }
    }

    describe("WHEN it is called with that dictionary", () => {
      const combinedReducers = combineReducerLeaves(dict)

      test("THEN the function has a 'children' property", () => {
        expect(combinedReducers.children).toBeDefined()
      })

      test("AND children has defined properties for the top-level of the dictionary (bool, counter, foo)", () => {
        expect(combinedReducers.children.bool).toBeDefined()
        expect(combinedReducers.children.counter).toBeDefined()
        expect(combinedReducers.children.foo).toBeDefined()
      })

      test("AND children does not have defined properties for nested properties (value, action, type, payload)", () => {
        expect(combinedReducers.children.value).toBeUndefined()
        expect(combinedReducers.children.action).toBeUndefined()
        expect(combinedReducers.children.type).toBeUndefined()
        expect(combinedReducers.children.payload).toBeUndefined()
      })

      test("AND child properties with children (foo) have defined properties for their own children (value, action)", () => {
        expect(combinedReducers.children.foo.value).toBeDefined()
        expect(combinedReducers.children.foo.action).toBeDefined()
      })

      test("AND grandchild properties with children (action) have defined properties for their own children (type, payload)", () => {
        expect(combinedReducers.children.foo.action.type).toBeDefined()
        expect(combinedReducers.children.foo.action.payload).toBeDefined()
      })

      test("AND the ultimate reducer leaves (bool, counter, foo.value, type, payload) are all functions", () => {
        expect(typeof combinedReducers.children.bool).toBe("function")
        expect(typeof combinedReducers.children.counter).toBe("function")
        expect(typeof combinedReducers.children.foo.value).toBe("function")
        expect(typeof combinedReducers.children.foo.action.payload).toBe("function")
        expect(typeof combinedReducers.children.foo.action.type).toBe("function")
      })

      test("AND the reducer branches (foo, action) are all objects", () => {
        expect(typeof combinedReducers.children.foo).toBe("object")
        expect(typeof combinedReducers.children.foo.action).toBe("object")
      })
    })
  })
})

describe("**Feature**: when third argument (augment) is true, it has access to action creators", () => {

  describe("GIVEN a dictionary of nested reducers of structure { bool, counter, foo: { value, action: { type, payload } } }", () => {
    const dict = {
      bool: utils.reducers.bool,
      counter: utils.reducers.counter,
      foo: {
        value: utils.reducers.foo,
        action: {
          type: utils.reducers.type,
          payload: utils.reducers.payload
        }
      }
    }

    describe("AND prefix = 'app/prefix", () => {
      const prefix = "app/prefix"

      describe("WHEN it is called with that dictionary and prefix, and augment = true", () => {
        const reducer = combineReducerLeaves(dict, { prefix }, true)

        test("THEN it returns a function", () => {
          expect(typeof reducer).toBe("function")
        })

        test("AND it has a defined 'clear' property", () => {
          expect(reducer.clear).toBeDefined()
          expect(reducer.clear().type).toBe("app/prefix/CLEAR")
        })

        test("AND it has a defined 'children.foo.clear' property", () => {
          expect(reducer.children.foo.clear).toBeDefined()
          expect(reducer.children.foo.clear().type).toBe("app/prefix/foo/CLEAR")
        })

        test("AND it has a defined 'children.foo.action.clear' property", () => {
          expect(reducer.children.foo.action.clear).toBeDefined()
          expect(reducer.children.foo.action.clear().type).toBe("app/prefix/foo/action/CLEAR")
        })
      })
    })
  })
})