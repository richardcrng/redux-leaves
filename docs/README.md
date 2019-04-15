# API

## `reduxLeaves(initialState)`

Returns a reducer function and an object.

### Parameters
- `initialState` *(object)*: the state shape and initial values for your redux store

### Returns
`array`, with two elements:
- 0th: `reducer` *(function)*: a reducer function to pass to redux's `createStore`
- 1st: `actions` *(object)*: an object with same shape as `initialState`

### Example
```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  counter: 1,
  foo: ['bar']
  nested: {
    deep: {}
    state: {
      manageable: 'maybe...?'
    }
  }
}

const [reducer, actions] = reduxLeaves(initialState)  // 
const store = createStore(reducer)
```

## actions

An object with nested action creator functions, following the same shape as the `initialState` passed to `reduxLeaves`.

### Example

First, grab `actions` by destructuring the return value of `reduxLeaves`:

```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  counter: 1,                     // leaf
  foo: ['bar']                    // leaf
  nested: {                       // branch
    deep: {}                      // leaf (empty object)
    state: {                      // branch
      manageable: 'maybe...?'     // leaf
    }
  }
}

const [reducer, actions] = reduxLeaves(initialState)
const store = createStore(reducer)
```

`actions` is an object with the same shape as `initialState`, with corresponding branches and leaves.

Every action branch and leaf is an object, regardless of the initial data type:

```js
console.log(typeof actions.counter)                       // 'object'
console.log(typeof actions.nested.deep)                   // 'object'
console.log(typeof actions.nested.state.manageable)       // 'object'
```

Every action branch and leaf also has an additional property, `create`, that is an object:

```js
console.log(typeof actions.counter.create)                  // 'object'
console.log(typeof actions.nested.deep.create)              // 'object'
console.log(typeof actions.nested.state.manageable.create)  // 'object'
```

This `create` property is the API through which you can access action creators.

For example, suppose I want to dispatch an action that will increment my `counter` state by 2.

```js
// We can destructure to access the 'increment' method from the create API
const { increment } = actions.counter.create

// Increment is an action creator function which takes one argument
const action = increment(2)

// Dispatch the action to the store
store.dispatch(action)

// The store's state changes as expected!
console.log(store.getState())
/*
*  {
*    counter: 3,  <--------------- incremented by 2!
*    foo: ['bar'],
*    nested: {
*      deep: {},
*      manageable: 'maybe...?'
*    }
*  }
*/
```
This API allows for concise but descriptive dispatching of actions.
```js
// Push 'FOO' to the 'foo' (array) slice of state
//    by creating and dispatching an action
store.dispatch(actions.foo.create.push('FOO'))
```

For full details of the methods available, please see the `create` API.