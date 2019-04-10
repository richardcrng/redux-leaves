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

  describe("GIVEN a dictionary of nested reducers", () => {
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