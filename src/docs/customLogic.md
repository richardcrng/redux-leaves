# Custom action creators

The [`create` API](https://github.com/richardcrng/redux-leaves/tree/master/src/docs/create) comes with several action creators, which our initialised `reducer` already knows how to respond to.

However, perhaps we want to initialise with a custom action creator and reducer logic.

This is what the `customLogic` object is for.

## Shape of `customLogic`

`customLogic` is an object

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
  square: leafState => leafState ** 2 // ES6 exponentiation
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

## Example 2: custom action creator using `payload` and `wholeState`

When we define custom reducer logic to pass to `reduxLeaves`, by default the custom action creators accept one argument, which becomes the action payload.

```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  foo: 2,
  bar: [2, 4, 6, 8, 10]
}
```

Suppose we want to implement two custom actions:
- `exponentiate`: raises the value of state at a leaf to an exponent received as an argument
- `remove`: removes values from the value of state at a leaf based on a value elsewhere, as indicated by an argument

```js
const customLogic = {
  exponentiate: (leafState, { payload }) => leafState ** payload,
  remove: (leafState, { payload }, wholeState) => leafState.filter(e => e != wholeState[payload])
}

const [reducer, actions] = reduxLeaves(initialState, customLogic)
const store = createStore(reducer)

// Testing that the action creators take only the first argument to be the payload:

const expWithOneArg = actions.foo.create.custom.exponentiate(2)
const expWithTwoArgs = actions.foo.create.custom.exponentiate(3, 4)

console.log(expWithOneArg.payload)    // 2
console.log(expWithTwoArgs.payload)   // 3 (4 has been discarded)

store.dispatch(expWithTwoArgs)
console.log(store.getState().foo)   // 8

store.dispatch(actions.barr.create.custom.remove("foo"))
console.log(store.getState().bar)   // [2, 4, 6, 10] <- state.foo, 8, removed
```

## Example 3: more detailed customisation with `argsToPayload`

Suppose we want to implement a custom `remove` action creator such that it takes an arbitrary number of arguments and, when dispatched, removes all of them from the leaf state.

```js
import { createStore } from 'redux'
import reduxLeaves from 'reduxLeaves'

const initialState = {
  foo: [2, 4, 6, 8, 10]
}
const customLogic = {
  remove: {
    argsToPayload: (...values) => values,
    reducer: (leafState, { payload }) => leafState.filter(e => !payload.includes(e))
  }
}

const [reducer, actions] = reduxLeaves(initialState, customLogic)
const store = createStore(reducer)
```

Here, instead of passing in `remove` as a function, we have passed it in as an object with the following properties:

- `argsToPayload`: this function receives all the arguments passed to the action creator, and its return value becomes the action `payload`;
- `reducer`: the reducer logic, invoked with arguments `leafState`, `{ payload }` and `wholeState` as before.

```js
const removeWithOneArg = actions.foo.create.custom.remove(4)
const removeWithTwoArgs = actions.foo.create.custom.remove(4, 8)

console.log(removeWithOneArg.payload)   // [4]
console.log(removeWithTwoArgs.payload)  // [4, 8]

store.dispatch(removeWithTwoArgs)
console.log(store.getState().foo)   // [2, 6, 10]
```