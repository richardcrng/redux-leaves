export const ACTION_TYPE_TRUE = "ACTION_TYPE_TRUE"
export const ACTION_TYPE_INCREMENT = "ACTION_TYPE_INCREMENT"
export const ACTION_TYPE_FOO = "ACTION_TYPE_FOO"

export const initialState = {
  bool: false,
  counter: 0,
  foo: null,
  payload: null,
  type: "",
}

export const boolReducer = (state = initialState.bool, action) => {
  switch (action.type) {
    case ACTION_TYPE_TRUE: return true
    default: return state
  }
}

export const counterReducer = (state = initialState.counter, action) => {
  switch (action.type) {
    case ACTION_TYPE_INCREMENT: return state + 1
    default: return state
  }
}

export const fooReducer = (state = initialState.foo, action) => {
  switch (action.type) {
    case ACTION_TYPE_FOO: return action.payload
    default: return state
  }
}

export const lastActionPayloadReducer = (state = initialState.payload, action) => {
  switch (action.type) {
    case ACTION_TYPE_INCREMENT:
    case ACTION_TYPE_TRUE:
    case ACTION_TYPE_FOO:
      return action.payload
    default: return state
  }
}

export const lastActionTypeReducer = (state = initialState.type, action) => {
  switch (action.type) {
    case ACTION_TYPE_INCREMENT:
    case ACTION_TYPE_TRUE:
    case ACTION_TYPE_FOO:
      return action.type
    default: return state
  }
}