
import { combineReducerLeaves } from './combineReducerLeaves';
import { createStore } from 'redux';

const ACTION_TYPE_TRUE = "ACTION_TYPE_TRUE"
const ACTION_TYPE_INCREMENT = "ACTION_TYPE_INCREMENT"
const ACTION_TYPE_FOO = "ACTION_TYPE_FOO"

const initialState = {
  bool: false,
  counter: 0,
  foo: null,
  payload: null,
  type: "",
}

const boolReducer = (state = initialState.bool, action) => {
  switch (action.type) {
    case ACTION_TYPE_TRUE: return true
    default: return state
  }
}

const counterReducer = (state = initialState.counter, action) => {
  switch (action.type) {
    case ACTION_TYPE_INCREMENT: return state + 1
    default: return state
  }
}

const fooReducer = (state = initialState.foo, action) => {
  switch (action.type) {
    case ACTION_TYPE_FOO: return action.payload
    default: return state
  }
}

const lastActionPayloadReducer = (state = initialState.payload, action) => {
  switch (action.type) {
    case ACTION_TYPE_INCREMENT:
    case ACTION_TYPE_TRUE:
    case ACTION_TYPE_FOO:
      return action.payload
    default: return state
  }
}

const lastActionTypeReducer = (state = initialState.type, action) => {
  switch (action.type) {
    case ACTION_TYPE_INCREMENT:
    case ACTION_TYPE_TRUE:
    case ACTION_TYPE_FOO:
      return action.type
    default: return state
  }
}

describe("combining just one level of simple functions", () => {
  const combinedReducers = combineReducerLeaves({
    bool: boolReducer,
    counter: counterReducer,
    foo: fooReducer,
    type: lastActionTypeReducer,
    payload: lastActionPayloadReducer
  })

  it("returns a function", () => {
    expect(typeof combinedReducers).toBe("function")
  })

  it("has expected initial state after store creation", () => {
    const store = createStore(combinedReducers)
    expect(store.getState()).toEqual({
      bool: initialState.bool,
      counter: initialState.counter,
      foo: initialState.foo,
      type: initialState.type,
      payload: initialState.payload
    })
  })

  describe("it listens and updates as expected", () => {
    test("only bool, type and payload update from ACTION_TYPE_TRUE", () => {
      const store = createStore(combinedReducers)
      store.dispatch({ type: ACTION_TYPE_TRUE, payload: "only update bool, type and payload" })
      expect(store.getState()).toEqual({
        bool: true,
        counter: initialState.counter,
        foo: initialState.foo,
        type: ACTION_TYPE_TRUE,
        payload: "only update bool, type and payload"
      })
    })

    test("only counter, type and payload update from ACTION_TYPE_INCREMENT", () => {
      const store = createStore(combinedReducers)
      store.dispatch({ type: ACTION_TYPE_INCREMENT, payload: "only update counter, type and payload" })
      expect(store.getState()).toEqual({
        bool: initialState.bool,
        counter: 1,
        foo: initialState.foo,
        type: ACTION_TYPE_INCREMENT,
        payload: "only update counter, type and payload"
      })
    })

    test("only foo, type and payload update from ACTION_TYPE_FOO", () => {
      const store = createStore(combinedReducers)
      store.dispatch({ type: ACTION_TYPE_FOO, payload: "here's my new foo!" })
      expect(store.getState()).toEqual({
        bool: initialState.bool,
        counter: initialState.counter,
        foo: "here's my new foo!",
        type: ACTION_TYPE_FOO,
        payload: "here's my new foo!"
      })
    })
  })
})

describe("with nested reducers", () => {
  const combinedReducers = combineReducerLeaves({
    bool: boolReducer,
    counter: counterReducer,
    foo: {
      value: fooReducer,
      action: {
        type: lastActionTypeReducer,
        payload: lastActionPayloadReducer
      }
    }
  })

  it("returns a function", () => {
    expect(typeof combinedReducers).toBe("function")
  })

  it("has expected initial state after store creation", () => {
    const store = createStore(combinedReducers)
    expect(store.getState()).toEqual({
      bool: initialState.bool,
      counter: initialState.counter,
      foo: {
        value: initialState.foo,
        action: {
          type: initialState.type,
          payload: initialState.payload
        }
      }
    })
  })

  describe("it listens and updates as expected", () => {
    test("only bool, type and payload update from ACTION_TYPE_TRUE", () => {
      const store = createStore(combinedReducers)
      store.dispatch({ type: ACTION_TYPE_TRUE, payload: "only update bool, type and payload" })
      expect(store.getState()).toEqual({
        bool: true,
        counter: initialState.counter,
        foo: {
          value: initialState.foo,
          action: {
            type: ACTION_TYPE_TRUE,
            payload: "only update bool, type and payload"
          }
        }
      })
    })

    test("only foo, type and payload update from ACTION_TYPE_FOO", () => {
      const store = createStore(combinedReducers)
      store.dispatch({ type: ACTION_TYPE_FOO, payload: "here's my new foo!" })
      expect(store.getState()).toEqual({
        bool: initialState.bool,
        counter: initialState.counter,
        foo: {
          value: "here's my new foo!",
          action: {
            type: ACTION_TYPE_FOO,
            payload: "here's my new foo!"
          }
        }
      })
    })
  })
})