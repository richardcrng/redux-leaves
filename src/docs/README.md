# Core API

## `reduxLeaves(initialState, [customLogic = {}])`

Returns a reducer function and an object.

### Parameters
- `initialState` *(object)*: the state shape and initial values for your redux store
- `customLogic` *(object)*: the custom logic you want your reducer and action creators to have

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

const [reducer, actions] = reduxLeaves(initialState)  // the key line
const store = createStore(reducer)
```

## The `actions` object

An object with nested action creator functions, following the same shape as the `initialState` passed to `reduxLeaves`.

### Example

First, grab `actions` by destructuring the return value of `reduxLeaves`:

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

For full details of the methods available, please see the [`create` API](https://github.com/richardcrng/redux-leaves/tree/master/src/docs/create).

## Initialising with custom logic

The [`create` API](https://github.com/richardcrng/redux-leaves/tree/master/src/docs/create) comes with several action creators, which our initialised `reducer` already knows how to respond to.

However, perhaps we want to initialise with a custom action creator and reducer logic.

This is what the `customLogic` object is for.

### Example 1: custom action creator with no arguments

Let's start with the shape of our app state.

```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  foo: 3,
  bar: 4
}
```

Suppose we want to implement a custom action:
- `double`: doubles the value of state at a leaf

To do this, we need to define some custom reducer logic to pass to `reduxLeaves`:

```js
const customLogic = {
  square: {
    reducer: leafState => leafState ** 2 // ES6 exponentiation
  }
}
```
We then pass this into `reduxLeaves`:
```js
const [reducer, actions] = reduxLeaves(initialState, customLogic)
const store = createStore(reducer)
```
And now we can access the `square` action creator through the `create.custom` API:
```js
console.log(typeof actions.foo.create.custom.square)  // function
console.log(typeof actions.bar.create.custom.square)  // function
```
Dispatching to the store triggers our custom reducer logic:
```js
store.dispatch(actions.foo.create.custom.square())
console.log(store.getState().foo) // 9

store.dispatch(actions.bar.create.custom.square())
console.log(store.getState().bar) // 16
```

### Example 2: custom action creator with arguments

```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  foo: 2,
  bar: [1, 2, 3, 4, 5]
}
```

Suppose we want to implement two custom actions:
- `exponentiate`: raises the value of state at a leaf to an exponent received as an argument
- `remove`: removes values from an array, taking an arbitrary number of arguments

To do this, we need to define some custom reducer logic to pass to `reduxLeaves`.

```js
const customLogic = {
  exponentiate: {
    reducer: (leafState, { payload }) => leafState ** payload
  },
  remove: {
    argsToPayload: (...values) => values,
    reducer: (leafState, { payload }) => leafState.filter(e => !payload.includes(e))
  }
}

const [reducer, actions] = reduxLeaves(initialState, customLogic)
const store = createStore(reducer)
```

This creates action creators available through the `create.custom` API:

```js
console.log(typeof actions.foo.create.custom.exponentiate)  // function
console.log(typeof actions.bar.create.custom.remove)        // function
```

The default behaviour of our custom action creators is to accept an arbitrary number of arguments and pass *only the first one* as the action's payload.

```js
const expWithOneArg = actions.foo.create.custom.exponentiate(2)
const expWithTwoArgs = actions.foo.create.custom.exponentiate(3, 4)

console.log(expWithOneArg.payload)    // 2
console.log(expWithTwoArgs.payload)   // 3 (4 has been discarded)

store.dispatch(expWithTwoArgs)
console.log(store.getState().foo)   // 8
```

However, we can override this behaviour of our action creators by specifying an `argsToPayload` function, as we did for `remove`:

```js
const removeWithOneArg = actions.bar.create.custom.remove(2)
const removeWithTwoArgs = actions.bar.create.custom.remove(3, 4)

console.log(removeWithOneArg.payload)    // [2]
console.log(removeWithTwoArgs.payload)   // [3, 4]

store.dispatch(removeWithTwoArgs)
console.log(store.getState().bar)   // [1, 2, 5]
```