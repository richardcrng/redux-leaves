
import { combineReducerLeaves } from './combineReducerLeaves';
import { createStore } from 'redux';

import * as utils from '../test.utils'

describe("combining just one level of simple functions", () => {
  const combinedReducers = combineReducerLeaves({
    bool: utils.reducers.bool,
    counter: utils.reducers.counter,
    foo: utils.reducers.foo,
    type: utils.reducers.type,
    payload: utils.reducers.payload
  })

  it("returns a function", () => {
    expect(typeof combinedReducers).toBe("function")
  })

  it("has expected initial state after store creation", () => {
    const store = createStore(combinedReducers)
    expect(store.getState()).toEqual({
      bool: utils.initialState.bool,
      counter: utils.initialState.counter,
      foo: utils.initialState.foo,
      type: utils.initialState.type,
      payload: utils.initialState.payload
    })
  })

  describe("it listens and updates as expected", () => {
    test("only bool, type and payload update from ACTION_TYPE_TRUE", () => {
      const store = createStore(combinedReducers)
      store.dispatch({ type: utils.ACTION_TYPE_TRUE, payload: "only update bool, type and payload" })
      expect(store.getState()).toEqual({
        bool: true,
        counter: utils.initialState.counter,
        foo: utils.initialState.foo,
        type: utils.ACTION_TYPE_TRUE,
        payload: "only update bool, type and payload"
      })
    })

    test("only counter, type and payload update from ACTION_TYPE_INCREMENT", () => {
      const store = createStore(combinedReducers)
      store.dispatch({ type: utils.ACTION_TYPE_INCREMENT, payload: "only update counter, type and payload" })
      expect(store.getState()).toEqual({
        bool: utils.initialState.bool,
        counter: 1,
        foo: utils.initialState.foo,
        type: utils.ACTION_TYPE_INCREMENT,
        payload: "only update counter, type and payload"
      })
    })

    test("only foo, type and payload update from ACTION_TYPE_FOO", () => {
      const store = createStore(combinedReducers)
      store.dispatch({ type: utils.ACTION_TYPE_FOO, payload: "here's my new foo!" })
      expect(store.getState()).toEqual({
        bool: utils.initialState.bool,
        counter: utils.initialState.counter,
        foo: "here's my new foo!",
        type: utils.ACTION_TYPE_FOO,
        payload: "here's my new foo!"
      })
    })
  })
})

describe("with nested reducers", () => {
  const combinedReducers = combineReducerLeaves({
    bool: utils.reducers.bool,
    counter: utils.reducers.counter,
    foo: {
      value: utils.reducers.foo,
      action: {
        type: utils.reducers.type,
        payload: utils.reducers.payload
      }
    }
  })

  it("returns a function", () => {
    expect(typeof combinedReducers).toBe("function")
  })

  it("has expected initial state after store creation", () => {
    const store = createStore(combinedReducers)
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

  describe("it listens and updates as expected", () => {
    test("only bool, type and payload update from ACTION_TYPE_TRUE", () => {
      const store = createStore(combinedReducers)
      store.dispatch({ type: utils.ACTION_TYPE_TRUE, payload: "only update bool, type and payload" })
      expect(store.getState()).toEqual({
        bool: true,
        counter: utils.initialState.counter,
        foo: {
          value: utils.initialState.foo,
          action: {
            type: utils.ACTION_TYPE_TRUE,
            payload: "only update bool, type and payload"
          }
        }
      })
    })

    test("only foo, type and payload update from ACTION_TYPE_FOO", () => {
      const store = createStore(combinedReducers)
      store.dispatch({ type: utils.ACTION_TYPE_FOO, payload: "here's my new foo!" })
      expect(store.getState()).toEqual({
        bool: utils.initialState.bool,
        counter: utils.initialState.counter,
        foo: {
          value: "here's my new foo!",
          action: {
            type: utils.ACTION_TYPE_FOO,
            payload: "here's my new foo!"
          }
        }
      })
    })
  })
})