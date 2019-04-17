# Initialising with custom logic

The [`create` API](https://github.com/richardcrng/redux-leaves/tree/master/src/docs/create) comes with several action creators, which our initialised `reducer` already knows how to respond to.

However, perhaps we want to initialise with a custom action creator and reducer logic.

This is what the `customLogic` object is for.

## Example 1: custom action creator with no arguments

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

## Example 2: custom action creator with arguments

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